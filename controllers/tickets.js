const Flight = require('../models/flight');
const Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create
};

async function create(req, res) {
    try {
    const flight = await Flight.findOne({ flightNo: req.params.id });
    const tickets = await Ticket.find({ flight: flight._id })
    
    // req.body.arrival = new Date(req.body.arrival)
    let filledSeats = []
    tickets.forEach(seat => {
        filledSeats.push(seat.seat) 
    })
    if (filledSeats.includes(req.body.seat)) {
        return res.render('tickets/new', { flight: flight, errMsg: "That seat is already taken. Choose a new seat."})
    }
    req.body.flight = flight._id
    await Ticket.create(req.body)
  // We can push (or unshift) subdocs into Mongoose arrays
 
    // Save any changes made to the movie doc
    res.redirect(`/flights/${flight.flightNo}`);
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  
}

async function newTicket(req, res) {

    const flight = await Flight.findOne({ flightNo: req.params.id })

    res.render('tickets/new', { flight: flight, errMsg: "" });
}