const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
//const User = require('user.model')
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        rating : {type: Number, min: 1, max: 5, default: 1, required: true},
        comment: {type: String, required: true},
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

    }
);

const bookSchema = new Schema(
    {
        title : {type: String, required: true},
        author: {type: String, required: true},
        image: {type: String},
        year: {type: Number},
        price: {type: Currency},
        bestSaller: {type: Boolean, default: false},
        comments : [commentSchema]
    },
    {timestamps: true}
);

const Books = mongoose.model('Book', bookSchema);

module.exports = Books;