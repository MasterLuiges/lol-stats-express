const {Schema, model} = require('mongoose');

const schema = new Schema({
    maxNewPlayerLevel: {
        type: Number,
    },
    freeChampionIdsForNewPlayers: {
        type: [Number],
    },
    freeChampionIds: {
        type: [Number],
    },
    // @see https://mongoosejs.com/docs/schematypes.html#arrays
    // arrayOfNumber: {
    //     type: [Number],
    // },
});

module.exports = model('Rotation', schema);
