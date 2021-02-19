const fs = require('fs');

class JsonStorage {
 
    constructor(filePath) {

        this._filePath = filePath;

    }
 
    get nextId() {

        try {
            
            return this._parsed_items.nextId;

        } catch (err) {
            
            console.log(err.message);

        }

    }
 
    incrementNextId() {

        try {
            
            this._parsed_items.nextId++;

        } catch (err) {
            
            console.log(err.message);

        }

    }
 
    readItems() {

        const buffer = fs.readFileSync(this._filePath);
        const items = buffer.toString();

        try {

            this._parsed_items = JSON.parse(items);

        }
        catch (err) {

            console.log(err.message);

        }

        return this._parsed_items;

    }
 
    writeItems(items) {

        try {
            
            const text = JSON.stringify(items, null, 2);
            fs.writeFileSync(this._filePath, text, 'utf8');

        } catch (err) {
            
            console.log(err.message);

        }
        

    }

};
 
module.exports = JsonStorage;