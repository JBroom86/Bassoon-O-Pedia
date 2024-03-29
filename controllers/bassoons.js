/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/bassoons`
---------------------------------------------------------------------------------------
*/


/* Require modules - the router method sets up routes outside of server.js
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all bassoons
router.get('/', function (req, res) {
    db.Fox.find({})
    .then(bassoonFox => {
        res.render('bassoon-index', {
            bassoonFox: bassoonFox
        })
    })
   
})


// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location
router.get('/new', (req, res) => {
    res.render('add-bassoon')
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a bassoon  document using the form data, 
// and redirects the user to the new pet's show page
router.post('/', (req, res) => {
    db.Fox.create(req.body)
        .then(bassoonFox => res.redirect('/bassoons/' + bassoonFox._id))
})

// Show Route (GET/Read): Will display an individual bassoonFox document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Fox.findById(req.params.id)
        .then(bassoonFox => { 
            res.render('bassoon-details', {
                bassoonFox: bassoonFox
            })
        })
        .catch(() => res.render('404'))
})

// Edit Route (GET/Read): This route renders a form
// the user will use to PUT (edit) properties of an existing bassoonFox
router.get('/:id/edit', (req, res) => {
    db.Fox.findById(req.params.id)
        .then(bassoonFox => {
            res.render('edit-bassoon', {
                bassoonFox: bassoonFox
            })
        })
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified pet document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Fox.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(bassoonFox => res.redirect('/bassoons/' + bassoonFox._id))
})

// Destroy Route (DELETE/Delete): This route deletes a pbassoonFoxet document 
// using the URL parameter (which will always be the bassoonFox document's ID)
router.delete('/:id', (req, res) => {
    db.Fox.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/bassoons'))
})







/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
