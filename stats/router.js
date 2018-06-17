const express = require('express')
const router = express.Router();
const {Stats} = require('./models')
const passport = require('passport')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', {session: false})

router.get('/', jwtAuth, (req,res) => {
    Stats.find({user: req.user.id})
    .exec()
    .then(stat => {
        res.json(stat)
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({message: 'stats error'})
    })
})

router.post('/', jwtAuth, jsonParser, (req,res) => {
    const fields = ['wins', 'losses', 'draws']
    Stats.create({
        wins: 0,
        losses: 0,
        draws: 0,
        user: req.user.id
    })
    .then(stat => res.status(201).json(stat.serialize()))
    .catch(err => {
        console.error(err)
        res.status(500).json({message: 'server error'})
    })
})

router.put('/:id', jwtAuth, jsonParser, (req,res) => {
    const updated = {}
    const updateableFields = ['wins', 'losses', 'draws']
    updateableFields.forEach(field => {
        if (field in req.body) {
            updated[field] = req.body[field]
        }
    })
    Stats
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .then(updatedStats => res.status(200).json(updatedStats))
    .catch(err => res.status(500).json({message: "Update error"}))
})

module.exports = {router}