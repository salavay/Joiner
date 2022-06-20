const {Router} = require("express");
const {Storage} = require('@google-cloud/storage');
const Multer = require('multer');
const config = require('config')
const Meet = require("../model/Meet");


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

// A bucket is a container for objects (files).
const bucket = storage.bucket(config.get('GCLOUD_STORAGE_BUCKET'));

const router = Router();

router.post('/loadImage', multer.single('image'), loadImage);
router.post('/create', multer.any(), createMeet);

async function loadImage(req, res, next) {
    console.log('FILE:', req.file)
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    res.status(200).send(JSON.stringify('Good'));

    // const blob = bucket.file(req.file.originalname);
    // const blobStream = blob.createWriteStream();
    //
    // blobStream.on('error', err => {
    //     next(err);
    // });
    //
    // blobStream.on('finish', () => {
    //     // The public URL can be used to directly access the file via HTTP.
    //     const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    //     res.status(200).send(JSON.stringify(publicUrl));
    // });
    //
    // blobStream.end(req.file.buffer);
}

async function createMeet(req, res, next) {
    const form = JSON.parse(req.body.form);
    const {
        name,
        date,
        segment,
        capacity,
        price,
        description,
        isOffline,
        latitudeCoordinate,
        longitudeCoordinate
    } = form;

    const image = req.files[0];

    let meet = new Meet({
        name,
        date,
        segment: segment.value,
        capacity,
        price,
        description,
        isOffline,
        latitudeCoordinate, longitudeCoordinate
    });
    await meet.save((err, meetFromDB) => {
        meet = meetFromDB
    });

    console.log('FILE:', )
    console.log('form:', form)

    const imageName = `mainImage${meet.id}.jpg`;

    const blob = bucket.file(imageName);
    await blob.save(image.buffer);

    const publicImageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    await Meet.updateOne({id: meet.id}, {$set:{photoUrl:publicImageUrl}});

    res.status(200).send(JSON.stringify("UPLOADED"));
}

module.exports = router;


// {
//     name,
//         date,
//         segment,
//         capacity,
//         price,
//         photoUrl,
//         description,
//         isOffline,
//         latitudeCoordinate,
//         longitudeCoordinate
// }