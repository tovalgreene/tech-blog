const router = require('express').Router();
const { post, comment } = require('../models');
const isAuthenticated = require('../utils/auth');

router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const postID = req.params.id;
        const post = await this.post.findByPk(postID, {
            include: [{ model: comment, include: user}],
        });

        if(!post) {
            return res.status(404).json(err);
        }

        res.render('post', { post });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
