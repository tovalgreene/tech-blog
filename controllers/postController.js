const router = require('express').Router();
const { post, comment } = require('../models');


router.get('/:id', async (req, res) => {
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
