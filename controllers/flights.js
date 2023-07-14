const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    index,
    create
}

function newFlight(req, res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate });
}

async function create(req, res) {
    try {
        await Flight.create(req.body)
        res.redirect('/flights')
    } catch (err) {
        res.render('flights/new', {errorMsg: err.message})
    }
}

async function index(req, res) {
    const flights = await Flight.find ({})

    flights.sort((a, b) => a.departs - b.departs)
    
    const currentDate = new Date()

    flights.forEach(flight => {
        if (new Date(flight.departs) < currentDate) {
            flight.valid = false
        } else {
            flight.valid = true
        }
    })
    console.log(flights)
    res.render('flights/index', { flights })
}