let mongoose = require('mongoose');

let menuSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: 'Menu',
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Menu', menuSchema);
