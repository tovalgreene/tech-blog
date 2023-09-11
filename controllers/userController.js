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
        res.status(201).json({ message: 'You have logged in' });
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
