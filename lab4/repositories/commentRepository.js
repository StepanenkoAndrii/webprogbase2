const Comment = require('../models/comment');
const Photo = require('../models/photo');

class CommentRepository {

    async addComment(commentModel) {

        const newComment = new Comment(commentModel);
        await Comment.insertMany(newComment);
        return newComment._id;

    }

    async getComments(photoId) {

        console.log(photoId);
        const commentDocs = await Comment.find({photoId: photoId}).populate('Photo');
        return commentDocs.map(comment => comment.toJSON());

    }

    async getPagesNumber(page, per_page, name, photoId) {

        const page_size = 3;
        const maxPageSize = 3;

        if (per_page) {

            if (per_page > maxPageSize) {

                console.log("Error.");
    
                return undefined;
    
            }

        }
        else {

            per_page = page_size;

        }

        if (!page) {

            page = 1;

        }

        const comments = await this.getComments(photoId);
        const commentsNumber = Number(comments.length)
        const offset = per_page * (page - 1);

        if (commentsNumber <= offset) {

            console.log("Error.");

            return 0;

        }

        let resComments = [];
        let tempCommentsLen = 0;

        if (name) {

            for (let i = 0; i < comments.length; i++) {

                if (comments[i].commentText.includes(name)) {
    
                    resComments.push(comments[i]);
    
                }
    
            }

            tempCommentsLen = resComments.length;
            resComments = resComments.slice(offset, offset + per_page);

        }

        const currentComments = comments.slice(offset, offset + per_page);
        let pagesNumber = 0;

        if ((commentsNumber / per_page) - Math.trunc(commentsNumber / per_page) != 0) {

            pagesNumber = Math.trunc(commentsNumber / per_page) + 1;

        }
        else {

            pagesNumber = Math.trunc(commentsNumber / per_page);

        }

        if (name) {

            if ((tempCommentsLen / per_page) - Math.trunc(tempCommentsLen / per_page) != 0) {

                pagesNumber = Math.trunc(tempCommentsLen / per_page) + 1;
    
            }
            else {
    
                pagesNumber = Math.trunc(tempCommentsLen / per_page);
    
            }

            if (pagesNumber == 0) {

                pagesNumber = 1;

            }

            return pagesNumber;

        }

        if (pagesNumber == 0) {

            pagesNumber = 1;

        }
        
        return pagesNumber;

    }

    async getCommentsPaginated(page, per_page, name, photoId) {

        const page_size = 3;
        const maxPageSize = 3;

        if (per_page) {

            if (per_page > maxPageSize) {

                console.log("Error.");
    
                return undefined;
    
            }

        }
        else {

            per_page = page_size;

        }

        if (!page) {

            page = 1;

        }

        const comments = await this.getComments(photoId);
        const commentsNumber = Number(comments.length);
        const offset = per_page * (page - 1);

        if (commentsNumber <= offset) {

            console.log("Error.");

            return 0;

        }

        let resComments = [];

        if (name) {

            for (let i = 0; i < comments.length; i++) {

                if (comments[i].commentText.includes(name)) {
    
                    resComments.push(comments[i]);
    
                }
    
            }

            resComments = resComments.slice(offset, offset + per_page);

        }

        const currentComments = comments.slice(offset, offset + per_page);

        if (name) {

            return resComments;

        }
        
        return currentComments;

    }

    async getCommentById(commentId) {

        return await Comment.findById(commentId);

    }

    async deleteComment(commentId) {

        await Comment.deleteOne({_id: commentId});

    }

};

module.exports = CommentRepository;