const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Helper function to handle errors
const handleError = (err, res) => {
    console.log(err);
    res.status(500).json(err);
};

// Function to get post data with necessary attributes and include options
const getPostData = (whereClause) => {
    return {
        where: whereClause,
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: { model: User, attributes: ['username'] }
            },
            { model: User, attributes: ['username'] }
        ]
    };
};

// Serialize and render template
const renderTemplate = (data, template, req, res) => {
    const serializedData = data.map ? data.map(item => item.get({ plain: true })) : data.get({ plain: true });
    res.render(template, { 
        [template === 'homepage' || template === 'dashboard' ? 'posts' : 'post']: serializedData,
        loggedIn: req.session.loggedIn 
    });
};

// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll(getPostData());
        renderTemplate(dbPostData, 'homepage', req, res);
    } catch (err) {
        handleError(err, res);
    }
});

// GET login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// GET signup page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// GET single post
router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne(getPostData({ id: req.params.id }));
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        renderTemplate(dbPostData, 'single-post', req, res);
    } catch (err) {
        handleError(err, res);
    }
});

// GET post and comments for dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll(getPostData({ user_id: req.session.user_id }));
        renderTemplate(dbPostData, 'dashboard', req, res);
    } catch (err) {
        handleError(err, res);
    }
});

module.exports = router;
