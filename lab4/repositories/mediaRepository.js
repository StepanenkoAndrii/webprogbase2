const Media = require('../models/photo');
const JsonStorage = require('../jsonStorage');
const fs = require('fs');

class MediaRepository {

    constructor(filePath) {

        this.path= filePath;
        this.storage = new JsonStorage(filePath + ".json");

    }

    getCurrentId() {

        return this.storage.nextId - 1;

    }

    getNextId() {

        this.storage.readItems();
        return this.storage.nextId;

    }

    incrementId() {

        const items = this.storage.readItems(); 
        this.storage.incrementNextId();
        this.storage.writeItems(items);

    }

    allFileFormats() {

        return this.storage.readItems().fileFormats;

    }

    getMediaPath(mediaId) {

        for (const item of this.allFileFormats()) {

            const fullPath = this.path + '/' + String(mediaId) + '.' + item;

            if (fs.existsSync(fullPath)) {

                return fullPath;

            }
        }

        return undefined;

    }

};

module.exports = MediaRepository;