const {Router} = require("express");
const router = Router();
const {Client} = require("@googlemaps/google-maps-services-js");
const config = require('config')

const client = new Client({});
const GOOGLE_MAPS_API_KEY = config.get('GOOGLE_MAPS_API_KEY');

const example = {
    "address_components": [
        {
            "long_name": "8",
            "short_name": "8",
            "types": [
                "street_number"
            ]
        },
        {
            "long_name": "улица Подковырова",
            "short_name": "ул. Подковырова",
            "types": [
                "route"
            ]
        },
        {
            "long_name": "Санкт-Петербург",
            "short_name": "СПБ",
            "types": [
                "locality",
                "political"
            ]
        },
        {
            "long_name": "Петроградский",
            "short_name": "Петроградский",
            "types": [
                "administrative_area_level_3",
                "political"
            ]
        },
        {
            "long_name": "Россия",
            "short_name": "RU",
            "types": [
                "country",
                "political"
            ]
        },
        {
            "long_name": "197136",
            "short_name": "197136",
            "types": [
                "postal_code"
            ]
        }
    ],
    "formatted_address": "ул. Подковырова, 8, Санкт-Петербург, Россия, 197136",
    "geometry": {
        "bounds": {
            "northeast": {
                "lat": 59.96315929999999,
                "lng": 30.3055067
            },
            "southwest": {
                "lat": 59.962916,
                "lng": 30.3050963
            }
        },
        "location": {
            "lat": 59.96303879999999,
            "lng": 30.3053612
        },
        "location_type": "ROOFTOP",
        "viewport": {
            "northeast": {
                "lat": 59.9643866302915,
                "lng": 30.3066504802915
            },
            "southwest": {
                "lat": 59.96168866970849,
                "lng": 30.3039525197085
            }
        }
    },
    "place_id": "ChIJFSptC0UxlkYRoHWApaFiGwQ",
    "types": [
        "premise"
    ]
}


router.get('/getAddress', getAddressHandler)
function getAddressHandler(req, res) {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    res.status(200).json(example);

    // client.reverseGeocode({
    //     params: {
    //         key: GOOGLE_MAPS_API_KEY,
    //         latlng: {
    //             latitude,
    //             longitude
    //         },
    //         language: 'ru'
    //     },
    //     timeout: 10000
    // }).then(r => {
    //     res.status(200).json(r.data.results[0]);
    //     console.log(r.data.results[0]);
    // }).catch(e => {
    //     console.log(e)
    // })
}
module.exports = router;

