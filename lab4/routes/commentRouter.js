const router = require('express').Router({mergeParams: true});
const commentController = require('./../controllers/commentController');

router.get("/new_comment", (req, res) => { res.status(200).render('newComment', {photoId: req.params.id}) });
router.post("/:id", commentController.deleteComment);
router.get("/", commentController.getComments);
router.post("/", commentController.addComment);

module.exports = router;