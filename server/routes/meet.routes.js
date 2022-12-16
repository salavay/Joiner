const {Router} = require("express");
const {Storage} = require('@google-cloud/storage');
const Multer = require('multer');
const config = require('config')
const Meet = require("../model/Meet");
const User = require("../model/User");
const jwt = require('jsonwebtoken')

const keyFileName = './config/googleCloudKey.json';

// Instantiate a storage client
const storage = new Storage({
    keyFilename: keyFileName
});
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});

const router = Router();

router.post('/create', multer.any(), createMeet);
router.get('/getAll', getAll);
router.get('/getGoingById', getGoingById);
router.post('/updateGoingToMeet', updateGoingToMeet);

// A bucket is a container for objects (files).
const bucket = storage.bucket(config.get('GCLOUD_STORAGE_BUCKET'));


async function createMeet(req, res, next) {
    const token = req.body.token
    let ownerId;
    try {
        const result = jwt.verify(token, config.get('jwtSecret'))
        ownerId = result.userId;
    } catch (err) {
        res.status(401);
        return;
    }

    const form = JSON.parse(req.body.form);
    const {
        name,
        date,
        endDate,
        segment,
        capacity,
        price,
        description,
        isOffline,
        latitude,
        longitude
    } = form;
    const image = req.files[0];

    let meet = new Meet({
        name,
        date, endDate,
        segment,
        capacity,
        price,
        description,
        isOffline,
        latitude, longitude,
        owner: ownerId
    });
    await meet.save((err, meetFromDB) => {
        meet = meetFromDB
    });


    const imageName = `mainImage${meet.id}.jpg`;

    const blob = bucket.file(imageName);
    await blob.save(image.buffer);

    const publicImageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    await Meet.findByIdAndUpdate(meet.id, {$set: {photoUrl: publicImageUrl}});
    await User.findByIdAndUpdate(ownerId, {$addToSet: {hostingMeets: meet.id}});

    res.status(200).send(JSON.stringify("UPLOADED"));
}


async function getAll(req, res) {
    const meets = await Meet.find().populate('owner');
    res.json(meets)
}

async function getGoingById(req, res) {
    const id = req.query.id;
    const meet = await Meet.findById(id).populate('goingUsers');
    res.json(meet.goingUsers);
}

async function updateGoingToMeet(req, res) {
    const {userId, meetId} = req.body;
    const meet = await Meet.findById(meetId);
    let isUserGoingTo = false;
    if (!meet.goingUsers.includes(userId)) {
        await User.findByIdAndUpdate(userId, {$addToSet: {goingToMeets: meetId}});
        await Meet.findByIdAndUpdate(meetId, {$addToSet: {goingUsers: userId}});
        isUserGoingTo = true;
    } else {
        await User.findByIdAndUpdate(userId, {$pull: {goingToMeets: meetId}});
        await Meet.findByIdAndUpdate(meetId, {$pull: {goingUsers: userId}});
    }
    res.status(200).json(isUserGoingTo);
}

module.exports = router;