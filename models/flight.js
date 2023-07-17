const mongoose = require('mongoose')

const Schema = mongoose.Schema

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    arrival: Date
})

const ticketSchema = new Schema({
    seat: { type: String, match: /[A-F][1-9]\d?/ },
    price: { type: Number, min: 0 },
    flight: { type: Schema.Types.ObjectId, ref: 'Flight'}
})

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function() {
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
            let pacificTime = oneYearFromNow.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })

            return pacificTime
        }
    },
    destinations: [destinationSchema],
    tickets: [ticketSchema]
});

// Compile scheme into a model and export it
module.exports = mongoose.model('Flight', flightSchema)