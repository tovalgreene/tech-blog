const router = require('express').Router();
const bcrypt = requre('bcrypt');
const { user } = require('../models');


router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await user.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await user.findOne({ where: { username } });

        if(!user) {
            return res.status(401).json(err);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            return res.status(401).json(err);
        }

        req.session.user = { id: user.id, username: user.username };

        res.status(201).json({ message: 'You have logged in' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/check-auth', (req, res) => {
    if (req.session.user) {
    res.status(201).json({ authenticated: true, user: req.session.user });
    } else {
    res.status(401).json({ authenticated: false });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.status(201).json({ message: 'You have logged out' });
        }
    })
})

module.exports = router;
