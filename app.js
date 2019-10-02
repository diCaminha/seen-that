const express = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post  = require('./backend/models/post');

mongoose.connect('mongodb://bala:dega0201@ds229088.mlab.com:29088/seenthat').then(() => {
    console.log('connected to db');
}).catch(() => {
    console.error('error connecting to db');
});

express.use(bodyParser.json());
express.use(bodyParser.urlencoded({extended: false}));

express.use((req,res,next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, DELETE, PUT');
    next();

});

express.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({message: 'Post created with success', post: post});
});

express.get('/api/posts',(req, res, next) => {

    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched',
            posts: documents
        });
    });
});

express.delete('/api/posts/:id', (req, res, next) => {
    console.log('ddddddd');
    Post.deleteOne({_id: req.params.id}).then(() => {
        res.status(200).json({message: 'Post deleted!'});
    });
});

module.exports = express;