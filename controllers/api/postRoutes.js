const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Error handling helper function
const handleErrors = (err, res) => {
    console.log(err);
    res.status(500).json(err);
};

// GET all users - Exclude password from the selected attributes
router.get('/', (req, res) => {
    User.findAll({ attributes: { exclude: ['password'] } })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => handleErrors(err, res));
});

// GET a single user by ID - Exclude password and include related Posts and Comments
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
            { model: Post, attributes: ['id', 'title', 'content', 'created_at'] },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: { model: Post, attributes: ['title'] }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => handleErrors(err, res));
});

// POST a new user
router.post('/', (req, res) => {
    User.create({ username: req.body.username, password: req.body.password })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => handleErrors(err, res));
});

// PUT to update a user by ID
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, { individualHooks: true, where: { id: req.params.id } })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => handleErrors(err, res));
});

// DELETE a user by ID
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({ where: { id: req.params.id } })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => handleErrors(err, res));
});

module.exports = router;
