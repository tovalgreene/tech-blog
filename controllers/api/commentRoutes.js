const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Helper function to handle errors
const handleError = (err, res) => {
    console.log(err);
    res.status(500).json(err);
};

// GET all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => handleError(err, res));
});

// GET a single comment by id
router.get('/:id', (req, res) => {
    Comment.findOne({ where: { id: req.params.id } })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => handleError(err, res));
});

// POST a new comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// PUT to update a comment
router.put('/:id', withAuth, (req, res) => {
    Comment.update({ comment_text: req.body.comment_text }, { where: { id: req.params.id } })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => handleError(err, res));
});

// DELETE a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
18            }
            res.json(dbCommentData);
        })
        .catch(err => handleError(err, res));
});

module.exports = router;
