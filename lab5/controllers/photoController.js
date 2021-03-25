const path = require('path');
const PhotoRepository = require('./../repositories/photoRepository');
const photoRepository = new PhotoRepository();
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports = {

    async getApiPhotoById(req, res) {

        try {

            photo = await photoRepository.getPhotoById(req.params.id);

            if (photo) {

                res.status(200).render('photo', {
                    photo: photo
                });

            } else {

                res.status(404).send({
                    photo: null,
                    message: "Not found."
                });

            }

        } catch (err) {

            console.log(err.message);
            res.status(500).send({
                photo: null,
                message: 'Server error.'
            });

        }

    },

    async addApiPhoto(req, res) {

        try {

            const result = await cloudinary.uploader.upload(req.file.path);
            req.body.photoUrl = result.url;
            const newPhotoId = await photoRepository.addPhoto(req.body);
            const newPhoto = await photoRepository.getPhotoById(newPhotoId);
            res.send(JSON.stringify(newPhoto));

        } catch (error) {

            console.log(error);

        }

    },

    async deleteApiPhoto(req, res) {

        await photoRepository.deletePhoto(req.params.id);
        res.redirect('/photos');

    },

    async getApiPhotos(req, res) {

        try {

            photos = await photoRepository.getPhotosPaginated(Number(req.query.page), Number(req.query.per_page), req.query.name);
            pagesNumber = await photoRepository.getPagesNumber(Number(req.query.page), Number(req.query.per_page), req.query.name);
            lastPhotos = await photoRepository.getLastPhotos();

            let page = req.query.page;
            let name = req.query.name;
            if (!page) page = 1;
            else page = Number(page);
            pages = {
                currentPage: Number(page)
            }

            if (page != 1) pages.prevPage = page - 1;
            if (page != pagesNumber) pages.nextPage = page + 1;
            if (name) pages.namePage = name;

            const jsonObject = {
                photos: photos,
                pagesNumber: pagesNumber,
                pages: pages,
                lastPhotos: lastPhotos
            };

            res.status(200).send(JSON.stringify(jsonObject, 2));


        } catch (err) {

            console.log(err.message);
            res.status(500).send({
                message: 'Server error.'
            });

        }

    },

    //////////////////////////////////////////////

    async getPhotoById(req, res) {

        try {

            photo = await photoRepository.getPhotoById(req.params.id);

            if (photo) {

                res.status(200).render('photo', {
                    photo: photo
                });

            } else {

                res.status(404).send({
                    photo: null,
                    message: "Not found."
                });

            }

        } catch (err) {

            console.log(err.message);
            res.status(500).send({
                photo: null,
                message: 'Server error.'
            });

        }

    },

    async addPhoto(req, res) {

        try {

            res.render('new');

        } catch (err) {

            console.log(err.message);
            res.status(500).send({
                photo: null,
                message: 'Server error.'
            });

        }

    },

    async getPhotos(req, res) {

        try {

            res.render('photos');

        } catch (err) {

            console.log(err.message);
            res.status(500).send({
                photos: null,
                message: 'Server error.'
            });

        }

    },

};