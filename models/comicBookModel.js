const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const comicBookSchema=new mongoose.Schema({
    bookName:{
        type:String,
        required: true
    },
    authorName:{
        type:String,
        required: true
    },
    yearOfPublication:{
        type:Number,
        required: true
    },
    price:{
        type:Number,
        required: true

    },
    discount:{
        type:Number,
        default: 0
    },
    numberOfPages:{
        type:Number,
        required: true
    },
    condition:{
        type:String,
        required: true
    },
    description:{
        type:String,
        default: ''
    },
    genre: {
        type: String,
        default: 'General'
    },
    inStock: {
        type: Boolean,
        default: true
    }
});

// Add the pagination plugin
comicBookSchema.plugin(mongoosePaginate);

const ComicBook = mongoose.model('comicbook', comicBookSchema);

module.exports = ComicBook;



