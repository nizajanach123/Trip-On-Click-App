const mongoose = require('mongoose');


// let currentDate = new Date();
// let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
// console.log(time);


const attractionSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,   
    Name : String,
    Address : {
        Street : String,
        Number : Number,
        City : String
        
    },
    Area : String,
    Category: String,
    DestiPopulation : Number,
    Image: String,
    HoursNum: Number,
    OpeningHours : String,
    ClosingHours : String,
    Description: String,
    Url: String,
});

module.exports = mongoose.model('Attraction', attractionSchema)