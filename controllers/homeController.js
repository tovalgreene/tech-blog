const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Helper function to handle errors
const handleError = (err, res) => {
    console.log(err);
    res.status(500).json(err);
};

// Function to fetch and serialize post data
const fetchAndSerializePosts = async (filter, req, res, template) => {
    try {
        const dbPostData = await Post.findAll({
            where: filter,
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: { model: User, attributes: ['username'] }
                },
                { model: User, attributes: ['username'] }
            ]
        });
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render(template, { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        handleError(err, res);
    }
};

// GET all posts for homepage
router.get('/', (req, res) => {
    fetchAndSerializePosts({}, req, res, 'homepage');
});

// GET login and signup pages
router.get('/login', (req, res) => req.session.loggedIn ? res.redirect('/') : res.render('login'));
router.get('/signup', (req, res) => req.session.loggedIn ? res.redirect('/') : res.render('signup'));

// GET single post
router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: { id: req.params.id },
            // Reuse the same attributes and include logic
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: { model: User, attributes: ['username'] }
                },
                { model: User, attributes: ['username'] }
            ]
        });
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        handleError(err, res);
    }
});

// GET post and comments for dashboard
router.get('/dashboard', withAuth, (req, res) => {
    fetchAndSerializePosts({ user_id: req.session.user_id }, req, res, 'dashboard');
});

module.exports = router;
