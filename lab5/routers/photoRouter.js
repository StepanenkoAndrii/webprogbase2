const router = require('express').Router();
const photoController = require('./../controllers/photoController');

router.get("/new", (req, res) => { res.status(200).render('new') });
router.get("/:id", photoController.getPhotoById);
router.get("/", photoController.getPhotos);
router.post("/", photoController.addPhoto);

module.exports = router;