const mongoose = require('mongoose')

function StorageException(message) {
    this.message = message;
    this.name = "StorageException";
 }

const statsSchema = mongoose.Schema({
    wins: Number,
    losses: Number
})

statsSchema.methods.serialize = function() {
    return {
        id: this._id,
        wins: this.wins,
        losses: this.losses
    }
}

const Stats = mongoose.model("Stats", statsSchema)

module.exports = {Stats}