const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    index
}

function newFlight(req, res) {
    res.render('flights/new', {errorMsg: ''})
}

// async function create(req, res) {
//     // convert nowShowing's checkbox of nothing or "on" to boolean
//     req.body.nowShowing = !!req.body.nowShowing
//     // remove any whitespace at start and end of cast
//     req.body.cast = req.body.cast.trim()
//     // split cast into an arra of ot an empty stirng
//     if (req.body.cast) req.body.cast.split(/\s*,\s*/)

//     for (let key in req.body) {
//         if (req.body[key] === '') delete req.body[key]
//     }
    
//     try {
//         await Movie.create(req.body)
//         res.redirect('/movies')
//     } catch (err) {
//         res.render('movies/new', {errorMsg: err.message})
//     }
// }

async function index(req, res) {
    const flights = await Flight.find ({})
    console.log(flights)
    res.render('flights/index', { flights })
}