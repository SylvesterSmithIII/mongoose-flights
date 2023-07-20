const Flight = require('../models/flight')
const Ticket = require('../models/ticket')

module.exports = {
    new: newFlight,
    index,
    create,
    show
}

function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    const dt2 = new Date()
    // Format the date for the value attribute of the input
    // attatch "YYYY-MM"
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    // ("YYYY-MM") + "-DDTHH:MM"
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;

    let minDate = `${dt2.getFullYear()}-${(dt2.getMonth() + 1).toString().padStart(2, '0')}`;
    // ("YYYY-MM") + "-DDTHH:MM"
    minDate += `-${dt2.getDate().toString().padStart(2, '0')}T${dt2.toTimeString().slice(0, 5)}`;


    console.log(departsDate)
    res.render('flights/new', { departsDate, title: "Add Flight", errMsg: "", minDate });
}

async function create(req, res) {
    const flights = await Flight.find({})
    flights.forEach(flight => {
        if (req.body.flightNo === flight.flightNo) {
            return res.render('flights/new', { errMsg: "Flight Number Taken!", title: "Add Flight"} )
        }
    })
    try {
        await Flight.create(req.body)
        res.redirect('/flights')
    } catch (err) {
        res.render('flights/new', { errMsg: err.message, title: "Add Flight"} )
    }
}

async function index(req, res) {
    const flights = await Flight.find ({})

    flights.sort((a, b) => a.departs - b.departs)

    const currentDate = new Date()

    flights.forEach(flight => {
        if (flight.departs < currentDate) {
            flight.valid = false
        } else {
            flight.valid = true
        }
    })
    console.log(flights)
    res.render('flights/index', { flights, title: "All Flights" })
}

async function show(req, res) {
    try {
        const flight = await Flight.findOne({ flightNo: req.params.id })
        const dt = flight.departs
        flight.destinations.sort((a, b) => a.arrival - b.arrival)
        let disabledOptions = []
        disabledOptions.push(flight.airport)
        flight.destinations.forEach(d => {
            disabledOptions.push(d.airport)
        })
        let tickets
        try {
            tickets = await Ticket.find({ flight: flight._id})
        } catch (error) {
            console.log(error)
        }

        let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
        // ("YYYY-MM") + "-DDTHH:MM"
        departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
        
        res.render('flights/show', { 
            flight: flight, 
            departsDate, 
            disabledOptions, 
            title: "Flight Details",
            tickets
        });
    } catch (err) {
        console.log(err)
    }
}