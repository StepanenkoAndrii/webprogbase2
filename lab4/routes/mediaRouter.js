const router = require('express').Router();
const mediaController = require('./../controllers/mediaController');

/**
 * @route POST /api/media
 * @group Media - media operations
 * @comsumes multipart/form-data
 * @param {file} image.formData.required - new Media object
 * @returns {integer} 201 - added media id
 * @returns {Error} 400 - bad request
 */
router.post("/", mediaController.addMedia)

/**
 * @route GET /api/media/{id}
 * @group Media - media operations
 * @param {integer} id.path.required - id of the Media - eg: 1
 * @returns {file} 200 - Media file
 * @returns {Error} 404 - Media not found
 */
router.get("/:id", mediaController.getMediaById)

module.exports = router;
