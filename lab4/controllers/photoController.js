const path = require('path');
const PhotoRepository = require('./../repositories/photoRepository');
const photoRepository = new PhotoRepository();
const fs = require('fs');
const fsExtra = require('fs-extra');
// const MediaRepository = require('./../repositories/mediaRepository');
const Photo = require('../models/photo');
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


// const mediaRepository = new MediaRepository(path.resolve(__dirname, '../data/media'));

module.exports = {

    async getPhotoById(req, res) {

        try {
            
            photo = await photoRepository.getPhotoById(req.params.id);
            
            if (photo) {

                res.status(200).render('photo', {photo: photo});

            }
            else {

                res.status(404).send({photo: null, message: "Not found."});

            }

        } catch (err) {
            
            console.log(err.message);
            res.status(500).send({photo: null, message: 'Server error.'});

        }
        
    },

    async addPhoto(req, res) {

        const fileName = req.files['photoUrl'].name;
        const bufferPath = path.resolve(
            require.main.filename,
            process.env.BUFFER_PATH || ''
        );
        const filePath = bufferPath + '/' + fileName;
        fs.writeFile(filePath, req.files['photoUrl'].data, (error) => {
            if (error) console.log("Can't load this photo.");
        });
        cloudinary.v2.uploader.upload(filePath, async function(error, result) {
            if (error) console.log("Can't upload this photo to cloudinary.");
            else {
                req.body.photoUrl = result.url;
                const newPhotoId = await photoRepository.addPhoto(req.body);
                await fsExtra.emptyDir(bufferPath);
                res.redirect('/photos/' + newPhotoId);
            }
        });

    },

    async deletePhoto(req, res) {

        photoRepository.deletePhoto(req.params.id);
        res.redirect('/photos');

    },

    async getPhotos(req, res) {

        try {
            
            photos = await photoRepository.getPhotosPaginated(Number(req.query.page), Number(req.query.per_page), req.query.name);
            pagesNumber = await photoRepository.getPagesNumber(Number(req.query.page), Number(req.query.per_page), req.query.name);
            let page = req.query.page;
            let name = req.query.name;
            if (!page) page = 1;
            else page = Number(page);
            pages = { currentPage: Number(page) }

            if (page != 1) pages.prevPage = page - 1;
            if (page != pagesNumber) pages.nextPage = page + 1; 
            if (name) pages.namePage = name;

            if (photos) {

                res.status(200).render('photos', {photos: photos, pagesNumber: pagesNumber, pages: pages, photoDisabled: "disabled"});

            }
            else {

                res.status(404).send({photos: null, message: "Not found."});

            }

        } catch (err) {
            
            console.log(err.message);
            res.status(500).send({photos: null, message: 'Server error.'});

        }

    },

};

// const path = require('path');
// const PhotoRepository = require('./../repositories/photoRepository');
// const photoRepository = new PhotoRepository(path.resolve(__dirname, '../data/photos.json'));
// const fs = require('fs');
// const MediaRepository = require('./../repositories/mediaRepository');
// const Photo = require('../models/photo');

// const mediaRepository = new MediaRepository(path.resolve(__dirname, '../data/media'));

// module.exports = {

//     async getPhotoById(req, res) {

//         try {

//             photo = photoRepository.getPhotoById(parseInt(req.params.id));
            

//             if (photo) {

//                 res.status(200).render('photo', {photo: photo});

//             }
//             else {

//                 res.status(404).send({photo: null, message: "Not found."});

//             }

//         } catch (err) {
            
//             console.log(err.message);
//             res.status(500).send({photo: null, message: 'Server error.'});

//         }
        
//     },

//     async addPhoto(req, res) {

//         console.log(req.files);

//         const fileFormat = req.files['photoUrl'].mimetype.split('/')[1];
//         fs.writeFileSync(path.resolve(__dirname, '../data/media/' + mediaRepository.getNextId() + '.' + fileFormat), req.files['photoUrl'].data, (err) => {
//             if (err) {

//                 console.log("Can't load this photo.");

//             }
//         })
        
//         const photoUrl = '/media/' + mediaRepository.getNextId() + '.' + fileFormat;
//         const newPhoto = new Photo(mediaRepository.getNextId(), req.body.photoName, req.body.location, Number(req.body.likes), Number(req.body.dislikes), req.body.photoDate, photoUrl)
//         const newId = photoRepository.addPhoto(newPhoto) - 1;
//         console.log(newId);
//         mediaRepository.incrementId();
//         res.redirect('/photos/' + newId);

//     },

//     async updatePhoto(req, res) {

//         try {

//             if (!req.body.photoName || !req.body.likes || !req.body.dislikes) {

//                 res.status(400).send({message: 'Bad request.'});

//             }
            
//             photo = photoRepository.updatePhoto(req.body);

//             if (photo) {

//                 console.log(photo);
//                 res.status(200).send({photo: photo, message: "Success."});

//             }
//             else {

//                 res.status(404).send({photo: null, message: "Not found."});

//             }

//         } catch (err) {
            
//             console.log(err.message);
//             res.status(500).send({photo: null, message: 'Server error.'});

//         }

        
//     },

//     async deletePhoto(req, res) {

//         photoRepository.deletePhoto(Number(req.params.id));
//         res.redirect('/photos');

//     },

//     async getPhotos(req, res) {

//         try {
            
//             photos = photoRepository.getPhotosPaginated(Number(req.query.page), Number(req.query.per_page), req.query.name);
//             pagesNumber = photoRepository.getPagesNumber(Number(req.query.page), Number(req.query.per_page), req.query.name);
//             let page = req.query.page;
//             let name = req.query.name;
//             if (!page) page = 1;
//             else page = Number(page);
//             pages = { currentPage: Number(page) }

//             if (page != 1) pages.prevPage = page - 1;
//             if (page != pagesNumber) pages.nextPage = page + 1; 
//             if (name) pages.namePage = name;

//             if (photos) {

//                 res.status(200).render('photos', {photos: photos, pagesNumber: pagesNumber, pages: pages, photoDisabled: "disabled"});

//             }
//             else {

//                 res.status(404).send({photos: null, message: "Not found."});

//             }

//         } catch (err) {
            
//             console.log(err.message);
//             res.status(500).send({photos: null, message: 'Server error.'});

//         }

//     },

// };