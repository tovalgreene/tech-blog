const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Helper function to handle errors
const handleError = (err, res) => {
    console.log(err);
    res.status(500).json(err);
};

// GET all users, excluding passwords from the response
router.get('/', (req, res) => {
    User.findAll({ attributes: { exclude: ['password'] } })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => handleError(err, res));
});

// GET a single user by ID, excluding password and including related Posts and Comments
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
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
        .catch(err => handleError(err, res));
});

// POST a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => handleError(err, res));
});

// POST for user login
router.post('/login', (req, res) => {
    User.findOne({
        where: { username: req.body.username }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user with that username!' });
                return;
            }

            const validPassword = dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        })
        .catch(err => handleError(err, res));
});

// POST for user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// PUT to update a user by ID
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => handleError(err, res));
});

// DELETE a user by ID
router.delete('/:id', (req, res) => {
    User.destroy({ where: { id: req.params.id } })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => handleError(err, res));
});

module.exports = router;
