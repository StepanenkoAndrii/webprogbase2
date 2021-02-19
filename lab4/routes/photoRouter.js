const router = require('express').Router({mergeParams: true});
const photoController = require('./../controllers/photoController');

router.get("/new", (req, res) => { res.status(200).render('new') });
router.get("/:id", photoController.getPhotoById);
router.post("/:id", photoController.deletePhoto);
router.get("/", photoController.getPhotos);
router.post("/", photoController.addPhoto);

const commentRouter = require('./commentRouter');
router.use('/:id/comments', commentRouter);

module.exports = router;