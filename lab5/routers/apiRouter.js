const router = require('express').Router();
const photoController = require('./../controllers/photoController');
const upload = require('../additional/multer');

router.get("/new", (req, res) => { res.status(200).render('new') });
router.get("/:id", photoController.getApiPhotoById);
router.post("/:id", photoController.deleteApiPhoto);
router.get("/", photoController.getApiPhotos);
router.post("/", upload.single('photoUrl'), photoController.addApiPhoto);

module.exports = router;