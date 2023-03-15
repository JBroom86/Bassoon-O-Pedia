/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/applications`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (All Applications): 
// GET localhost:3000/applications/
router.get('/', (req, res) => {
	db.Fox.find({}, { pastowners: true, _id: false })
        .then(bassoonFox => {
		    // format query results to appear in one array, 
		    // rather than an array of objects containing arrays 
	    	const flatList = []
	    	for (let fox of bassoonFox) {
	        	flatList.push(...fox.pastowners)
	    	}
	    	res.render('pastowners/pastowners-index', {
                pastowners: flatList
            })
		}
	)
});

// New Route: GET localhost:3000/applications/new
router.get('/new/:foxId', (req, res) => {
    db.Fox.findById(req.params.foxId)
        .then(pastowner => {
            res.send('pastowners/pastowners-form', { pastowner: pastowner})
        })
        .catch(() => res.render('404'))
})

// Create Route: POST localhost:3000/applications/
router.post('/create/:foxId', (req, res) => {
    db.Fox.findByIdAndUpdate(
        req.params.petId,
        { $push: { pastowners: req.body } },
        { new: true }
    )
        .then(() => res.redirect('/pastowners'))
});

// Show Route: GET localhost:3000/applications/:id
router.get('/:id', (req, res) => {
    db.Fox.findOne(
        { 'pastowners._id': req.params.id },
        { 'pastowners.$': true, _id: false }
    )
        .then(fox => {
	        // format query results to appear in one object, 
	        // rather than an object containing an array of one object
            res.render('pastowners/pastowners-details', {
                pastowners: fox.pastowners[0]
            })
        })
        .catch(() => res.render('404'))
});

// Destroy Route: DELETE localhost:3000/applications/:id
router.delete('/:id', (req, res) => {
    db.Fox.findOneAndUpdate(
        { 'pastowners._id': req.params.id },
        { $pull: { pastowners: { _id: req.params.id } } },
        { new: true }
    )
        .then(() => res.redirect('/pastowners'))
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
