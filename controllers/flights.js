const Flight = require('../models/flight')

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
    // Format the date for the value attribute of the input
    // attatch "YYYY-MM"
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    // ("YYYY-MM") + "-DDTHH:MM"
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    console.log(departsDate)
    res.render('flights/new', { departsDate, title: "Add Flight" });
}

async function create(req, res) {
    try {
        await Flight.create(req.body)
        res.redirect('/flights')
    } catch (err) {
        res.render('flights/new', { errorMsg: err.message, title: "Add Flight"} )
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
        const flight = await Flight.find({ flightNo: req.params.id })
        const dt = flight[0].departs
        flight[0].destinations.sort((a, b) => a.arrival - b.arrival)
        let disabledOptions = []
        disabledOptions.push(flight[0].airport)
        flight[0].destinations.forEach(d => {
            disabledOptions.push(d.airport)
        })


        let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
        // ("YYYY-MM") + "-DDTHH:MM"
        departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
        
        res.render('flights/show', { flight: flight[0], departsDate, disabledOptions, title: "Flight Details" });
    } catch (err) {
        console.log(err)
    }
}