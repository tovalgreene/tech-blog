const router = require('express').Router();

const homeRoutes = require('./controllers/homeController');
const postRoutes = require('./controllers/postController');
const userRoutes = require('./controllers/userController');

router.use('/', homeRoutes);
router.use('/post', postRoutes);
router.use('/user', userRoutes);

module.exports = router;