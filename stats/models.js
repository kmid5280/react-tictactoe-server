'use strict';


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const statsSchema = mongoose.Schema({
    wins: {
        type: Number
    },
    losses: {
        type: Number
    },
    draws: {
        type: Number
    }
})

statsSchema.methods.serialize = function() {
    return {
        user: this.user,
        id: this._id,
        wins: this.wins,
        losses: this.losses,
        draws: this.draws
    }
}



const Stats = mongoose.model('Stats', statsSchema);

module.exports = {Stats}