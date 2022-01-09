const mongoose = require('mongoose');
const User = require('./users');

const Comment = new mongoose.Schema({ comment: String, username: String, time: String});

const ArticleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: false
    },

    body: {
        type: String,
        required: true
    },    

    comments: {
        type: [Comment],
        required: true
    },

    article_url: {
        type: String,
        required: true
    },

    image_url: {
        type: String,
        required: false
    }
});

const Article = module.exports = mongoose.model('Article', ArticleSchema);