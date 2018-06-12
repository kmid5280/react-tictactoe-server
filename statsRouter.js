const express = require('express')
const router = express.Router()
const {Stats} = require('./models')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport')
const jwtAuth = passport.authenticate('jwt', {session: false})

router.get('/', /*jwtAuth,*/ (req, res) => {
    /*Stats.find({
        user: req.user.id
    }).exec()
    .then(stat => {
        res.json(stat)
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({message: 'server error'})
    })*/
    res.json('this is a string')
    
})

router.post('/', jwtAuth, jsonParser, (req, res) => {
    const newStats = {}
    Stats.create({
        wins: 0,
        losses: 0,
        user: req.user.id
    })
    .then(post => res.status(201).json(post.serialize()))
    .catch(err => {
        console.error(err)
        res.status(500).json({message: 'server error'})
    })
})

router.put('/:id', jwtAuth, jsonParser, (req, res) => {
    //update stats for existing user
    const id = req.params.id
    const updateStats = ['wins', 'losses']
    const updateItem = {}
    updateStats.forEach(stat => {
        if (field in req.body) {
            updateStats[field] = req.body[field]
        }
    })

})

module.exports = router

//need jwt auth