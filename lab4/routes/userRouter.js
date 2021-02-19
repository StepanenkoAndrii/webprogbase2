const router = require('express').Router();
const userController = require('./../controllers/userController');

router.get("/:id", userController.getUserById);
router.get("/", userController.getUsersPaginated);

module.exports = router;
