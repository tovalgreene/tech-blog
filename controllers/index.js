const router = require('express').Router();

const homeRoutes = require('./homeController');
const postRoutes = require('./postController');
const userRoutes = require('./userController');

router.use('/', homeRoutes);
router.use('/posts', postRoutes); 
router.use('/users', userRoutes); 

module.exports = router;
