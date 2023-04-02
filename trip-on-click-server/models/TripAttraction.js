const mongoose = require('mongoose');
const Attraction = require('./Attraction');

const tripAttractionSchema = mongoose.Schema({
    trip : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip"
    },
    attraction : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attraction"
    },
    time : Date
});

module.exports = mongoose.model('TripAttraction', tripAttractionSchema)
