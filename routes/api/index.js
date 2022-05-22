const router= require('express').Router();

const usersRoutes= require('./user-routes');
const thoughtsRoutes= require('./thought-routes');

router.use('./users',userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports= router;
