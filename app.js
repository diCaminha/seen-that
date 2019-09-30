const express = require('express')();

express.use((req,res,next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, DELETE, PUT');
    next();

});

express.use('/api/notes',(req, res, next) => {

     posts = [
        { id: 'idnumber1',title: 'First note', content: 'this was created auto by code'},
        { id: 'idnumber2',title: 'Sec note', content: 'this was created auto by code'},
        { id: 'idnumber3',title: 'Third note', content: 'this was created auto by code'},
        { id: 'idnumber4',title: 'Fourth note', content: 'this was created auto by code'}

    ];

    res.status(200).json({
        message: 'Posts fetched',
        posts: posts
    });
});

module.exports = express;