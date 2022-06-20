const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true, unique: false},
    date: {type: Date, required: true, unique: false},
    segment: {type: String, required: true, unique: false},
    capacity: {type: Number, required: true, unique: false},
    price: {type: Number, required: true, unique: false},
    duration: {type: Number, required: true, unique: false},
    photoUrl: {type: String, required: false, unique: false},
    description: {type: String, required: true, unique: false},
    isOffline: {type: Boolean, required: true, unique: false},
    latitudeCoordinate: {type: Number, required: false, unique: false},
    longitudeCoordinate: {type: Number, required: false, unique: false}
})

module.exports = model('Meet', schema);