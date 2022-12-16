const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true, unique: false},
    date: {type: Date, required: true, unique: false},
    endDate: {type: Date, required: true, unique: false},
    segment: {type: String, required: true, unique: false},
    capacity: {type: Number, required: true, unique: false},
    price: {type: Number, required: true, unique: false},
    photoUrl: {type: String, required: false, unique: false},
    description: {type: String, required: true, unique: false},
    isOffline: {type: Boolean, required: true, unique: false},
    latitude: {type: Number, required: false, unique: false},
    longitude: {type: Number, required: false, unique: false},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    goingUsers: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = model('Meet', schema);