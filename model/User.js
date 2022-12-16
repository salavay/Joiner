const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    status: {type: String, required: false},
    avatarUrl: {type: String, required: false},
    locationLatitude: {type: Number, required: false, unique: false},
    locationLongitude: {type: Number, required: false, unique: false},
    hostingMeets: [{type: Types.ObjectId, ref: 'Meet'}],
    goingToMeets: [{type: Types.ObjectId, ref: 'Meet'}],
    attendedMeets: [{type: Types.ObjectId, ref: 'Meet'}],
})

module.exports = model('User', schema);