const router = require('express').Router();
const { getAllPosts } = require('../models/post');
const isAuthenticated = require('../utils/auth');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.render('home', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
