const express = require('express');

const Post = require('../models/post');

const router = express.Router();


router.post('', (req, res, next) => {
    console.log('teste post');
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(postSaved => {
        res.status(201).json({
            message: 'Post created with success', 
            postId: postSaved._id
        });
    });
});

router.get('/:id', (req, res, next) => {
    Post.findById({_id: req.params.id}).then(post => {
        res.status(200).json({post});
    });
});

router.put('/:id', (req, res, next) => {
    console.log(req.body);
    const post = new Post({
        _id: req.body.post.id,
        title: req.body.post.title,
        content: req.body.post.content
    });

    Post.updateOne({_id: req.params.id}, post).then(postUpdated => {
        res.status(200).json({
            message: 'Post updated!'
        });
    });

});

router.get('',(req, res, next) => {

    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched',
            posts: documents
        });
    });
});

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(() => {
        res.status(200).json({message: 'Post deleted!'});
    });
});

module.exports = router;