const router = require('express').Router();
const userRouter = require('./userRouter');
router.use('/users', userRouter);
const photoRouter = require('./photoRouter');
router.use('/photos', photoRouter);
const mediaRouter = require('./mediaRouter');
router.use('/media', mediaRouter);

module.exports = router;