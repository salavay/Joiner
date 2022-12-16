const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')


const User = require('../model/User');
const router = Router();


router.post('/register',
    [
        check('email', 'Email is incorrect').isEmail(),
        check('password', 'Password should be 8 characters at least').isLength({min: 4})
    ],
    register);
router.post('/login',
    [
        check('userNameOrEmail', 'Email is incorrect').exists(),
        check('password', 'Password should be exist').exists()
    ],
    login);
router.post('/getCurrentUser', getCurrentUser)
router.post('/verifyJWT', verifyJWT)

async function register(req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect credentials'
            })
        }

        const {email, password, username, name} = req.body;

        const candidateByName = await User.findOne({username});

        if (candidateByName) {
            return res.status(400).json({message: "This username is already taken"});
        }

        const candidateByEmail = await User.findOne({email});

        if (candidateByEmail) {
            return res.status(400).json({message: "This email is already in use"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({name, username, email, password: hashedPassword});

        await user.save();
        console.log('REGISTERED')

        res.status(201).json({message: 'Created user'});

    } catch (e) {
        res.status(500).json({message: "Server error while register"});
    }
}


async function login(req, res) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect credentials'
            })
        }

        const {userNameOrEmail, password} = req.body;
        const user = await User.findOne().or([{username: userNameOrEmail}, {email: userNameOrEmail}]).exec();

        if (!user) {
            return res.status(400).json({message: "Can't find user"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Invalid login or password'});
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'), {}
        );

        res.json({token,user});

    } catch (e) {
        res.status(500).json({message: "Server error while login"});
    }
}




async function getCurrentUser(req, res) {
    const {token} = req.body;
    try {
        const result = jwt.verify(token, config.get('jwtSecret'));
        const user = await User.findById(result.userId)
            .populate({
                path: "hostingMeets", populate: {
                    path: 'owner'
                }
            })
            .populate({
                    path: "goingToMeets",
                    populate: {
                        path: 'owner'
                    }
                }
            )
            .populate({
                path: "attendedMeets",
                populate: {
                    path: 'owner'
                }
            });
        res.json({
            username: user.username,
            name: user.name,
            email: user.email,
            status: user.status,
            avatarUrl: user.avatarUrl,
            hostingMeets: user.hostingMeets,
            goingToMeets: user.goingToMeets,
            attendedMeets: user.attendedMeets
        })
    } catch
        (err) {
        res.status(401);
    }
}

async function verifyJWT(req, res) {
    const token = req.body.token;
    const userId = req.body.userId;
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
    } catch (err) {
        res.json(false);
        return
    }
    res.json(true);
}


module.exports = router;