const express = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post  = require('./models/post');
const postRouter = require('./routes/post');

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

express.use('/api/posts', postRouter);

module.exports = express;