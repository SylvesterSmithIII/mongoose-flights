const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create
};

async function create(req, res) {
    try {
    const flight = await Flight.find({ flightNo: req.params.id });
    
    // req.body.arrival = new Date(req.body.arrival)
    let filledSeats = []
    flight[0].tickets.forEach(seat => {
        filledSeats.push(seat.seat) 
    })
    if (filledSeats.includes(req.body.seat)) {
        return res.render('tickets/new', { flight: flight[0], errMsg: "That seat is already taken. Choose a new seat."})
    }
    req.body.flight = flight._id
    flight[0].tickets.push(req.body)
  // We can push (or unshift) subdocs into Mongoose arrays
 
    // Save any changes made to the movie doc
    await flight[0].save();
    res.redirect(`/flights/${flight[0].flightNo}`);
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  
}

async function newTicket(req, res) {

    const flight = await Flight.find({ flightNo: req.params.id })

    res.render('tickets/new', { flight: flight[0], errMsg: "" });
}