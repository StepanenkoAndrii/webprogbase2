const mainRouter = require('express').Router();
const photoRouter = require('./photoRouter');
const apiRouter = require('./apiRouter');

mainRouter.use("/photos", photoRouter)
mainRouter.use("/api/photos", apiRouter);

module.exports = mainRouter;