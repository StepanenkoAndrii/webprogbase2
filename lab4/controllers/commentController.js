const path = require('path');
const CommentRepository = require('./../repositories/commentRepository');
const commentRepository = new CommentRepository();
const Comment = require('../models/comment');

module.exports = {

    async addComment(req, res) {

        const newCommentId = await commentRepository.addComment(req.body);
        const photoId = req.params.id;
        res.redirect(`/photos/${photoId}/comments`);

    },

    async deleteComment(req, res) {

        const commentId = req.params.id;
        await commentRepository.deleteComment(commentId);
        res.redirect(`/photos/${photoId}/comments`);

    },

    async getComments(req, res) {

        try {
            
            photoId = req.params.id;
            comments = await commentRepository.getCommentsPaginated(Number(req.query.page), Number(req.query.per_page), req.query.name, req.params.id);
            pagesNumber = await commentRepository.getPagesNumber(Number(req.query.page), Number(req.query.per_page), req.query.name, req.params.id);
            let page = req.query.page;
            let name = req.query.name;
            if (!page) page = 1;
            else page = Number(page);
            pages = { currentPage: Number(page) }

            if (page != 1) pages.prevPage = page - 1;
            if (page != pagesNumber) pages.nextPage = page + 1; 
            if (name) pages.namePage = name;

            res.status(200).render('comments', {comments: comments, pagesNumber: pagesNumber, pages: pages, commentDisabled: "disabled", photoId: photoId});

        } catch (err) {
            
            console.log(err.message);
            res.status(500).send({comments: null, message: 'Server error.'});

        }

    },

};