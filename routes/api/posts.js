const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Post model
const Post = require('../../models/Post');

// Load Profile model
const Profile = require('../../models/Profile');


// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  public
router.get('/test', (req, res) => res.json({ msg: "Posts Works" }));

// @route   GET api/posts
// @desc    Get post
// @access  public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(() => res.status(404).json({ error: 'Could not get posts' }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(() => res.status(404).json({ error: 'No post found with that ID' }));
});

// @route   POST api/posts
// @desc    Create post
// @access  private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
        // if any errors, send 400 with error object
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    // console.log(req.user.id);
    newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(() => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ error: 'NOT authorized' });
                    }

                    // Delete post
                    post.remove().then(() => res.json({ success: true }));
                })
                .catch(() => res.status(404).json({ error: 'No post found' }));
        });
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(() => {
            Post.findById(req.params.id)
                .then(post => {

                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(404).json({ error: 'Already liked' });
                    }

                    // Add the user ID to likes array
                    // NOTE: unshift method adds to the begining of an array, while push just adds and can be in any position...
                    post.likes.unshift({ user: req.user.id });

                    post.save().then(post => res.json(post));
                })
                .catch(() => res.status(404).json({ error: 'No post found' }));
        });
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {

                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(404).json({ error: 'NOT yet liked' });
                    }

                    // Get remove index
                    const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

                    // Splice out of array (i.e remove user with this specific ID from the array)
                    post.likes.splice(removeIndex, 1);

                    post.save().then(post => res.json(post));
                })
                .catch(() => res.status(404).json({ error: 'No post found' }));
        });
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
        // if any errors, send 400 with error object
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            // Add to comment array
            post.comments.unshift(newComment);

            // Save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ error: 'No post found' }));
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Post.findById(req.params.id)
        .then(post => {
            // Check to see if comment exist
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({ error: 'Comment does not exist' })
            }

            // Get remove index
            const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

            // Splice comment out of array
            post.comments.splice(removeIndex, 1);

            // Save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ error: 'Comment does not exist' }));
});

module.exports = router;