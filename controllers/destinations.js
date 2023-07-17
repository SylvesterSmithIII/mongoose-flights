const Flight = require('../models/flight');

module.exports = {
  create
};

async function create(req, res) {
    const flight = await Flight.find({ flightNo: req.params.id });
    console.log(req.body)
    // req.body.arrival = new Date(req.body.arrival)
    flight[0].destinations.push(req.body)
  // We can push (or unshift) subdocs into Mongoose arrays
  try {
    // Save any changes made to the movie doc
    await flight[0].save();
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/flights/${flight[0].flightNo}`);
}