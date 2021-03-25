const Photo = require('../models/photo');

class PhotoRepository {

    async addPhoto(photoModel) {

        const newPhoto = new Photo(photoModel);
        await Photo.insertMany(newPhoto);
        return newPhoto._id;

    }

    async getLastPhotos() {

        const photoDocs = await Photo.find().sort({'photoDate': -1}).limit(4);
        return photoDocs.map(photo => photo.toJSON());

    }

    async getPhotos() {

        const photoDocs = await Photo.find();
        return photoDocs.map(photo => photo.toJSON());

    }

    async getPagesNumber(page, per_page, name) {

        const page_size = 4;
        const maxPageSize = 4;

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

        const photos = await this.getPhotos();
        const photosNumber = Number(photos.length)
        const offset = per_page * (page - 1);

        if (photosNumber <= offset) {

            console.log("Error.");

            return undefined;

        }

        let resPhotos = [];
        let tempPhotosLen = 0;

        if (name) {

            for (let i = 0; i < photos.length; i++) {

                if (photos[i].photoName.includes(name)) {
    
                    resPhotos.push(photos[i]);
    
                }
    
            }

            tempPhotosLen = resPhotos.length;
            resPhotos = resPhotos.slice(offset, offset + per_page);

        }

        const currentPhotos = photos.slice(offset, offset + per_page);
        let pagesNumber = 0;

        if ((photosNumber / per_page) - Math.trunc(photosNumber / per_page) != 0) {

            pagesNumber = Math.trunc(photosNumber / per_page) + 1;

        }
        else {

            pagesNumber = Math.trunc(photosNumber / per_page);

        }

        if (name) {

            if ((tempPhotosLen / per_page) - Math.trunc(tempPhotosLen / per_page) != 0) {

                pagesNumber = Math.trunc(tempPhotosLen / per_page) + 1;
    
            }
            else {
    
                pagesNumber = Math.trunc(tempPhotosLen / per_page);
    
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

    async getPhotosPaginated(page, per_page, name) {

        const page_size = 4;
        const maxPageSize = 4;

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

        const photos = await this.getPhotos();
        const photosNumber = Number(photos.length);
        const offset = per_page * (page - 1);

        if (photosNumber <= offset) {

            console.log("Error.");

            return undefined;

        }

        let resPhotos = [];

        if (name) {

            for (let i = 0; i < photos.length; i++) {

                if (photos[i].photoName.includes(name)) {
    
                    resPhotos.push(photos[i]);
    
                }
    
            }

            resPhotos = resPhotos.slice(offset, offset + per_page);

        }

        const currentPhotos = photos.slice(offset, offset + per_page);

        if (name) {

            return resPhotos;

        }
        
        return currentPhotos;

    }

    async getPhotoById(photoId) {

        return await Photo.findById(photoId);

    }

    async deletePhoto(photoId) {

        await Photo.deleteOne({_id: photoId});

    }

};

module.exports = PhotoRepository;
