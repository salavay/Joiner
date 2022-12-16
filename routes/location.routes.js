const {Router} = require("express");
const router = Router();
const {Client} = require("@googlemaps/google-maps-services-js");
const config = require('config')

const client = new Client({});
const GOOGLE_MAPS_API_KEY = config.get('GOOGLE_MAPS_API_KEY');


router.get('/getAddress', getAddressHandler)
function getAddressHandler(req, res) {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;

    client.reverseGeocode({
        params: {
            key: GOOGLE_MAPS_API_KEY,
            latlng: {
                latitude,
                longitude
            },
            language: 'ru'
        },
        timeout: 10000
    }).then(r => {
        res.status(200).json(r.data.results[0]);
    }).catch(e => {
        console.error('Failed to get address', e);
    })
}
module.exports = router;

