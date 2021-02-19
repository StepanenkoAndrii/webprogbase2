const User = require('../models/user');

class UserRepository {

    async getUsers() {

        const userDocs = await User.find();
        return userDocs.map(user => user.toJSON());

    }

    async getUserById(userId) {

        return await User.findById(userId);

    }

    async getUsersPaginated(page, per_page) {

        const page_size = 3;
        const maxPageSize = 5;

        if (per_page) {

            if (per_page > maxPageSize) {

                console.log("Error.");
    
                return 0;
    
            }

        }
        else {

            per_page = page_size;

        }

        if (!page) {

            page = 1;

        }

        const users = await this.getUsers();
        const usersNumber = Number(users.length);
        const offset = per_page * (page - 1);

        if (usersNumber < offset) {

            console.log("Error.");

            return 0;

        }

        const currentUsers = users.slice(offset, offset + per_page);

        return currentUsers;

    }

    addUser(userModel) {

        const items = this.storage.readItems();
        this.storage.incrementNextId();
        const newUser = new User(userModel.id, userModel.login, userModel.fullname, userModel.role, userModel.registeredAt, userModel.avaUrl, userModel.isEnablede, userModel.bio);
        items.items.push(newUser);
        this.storage.writeItems(items);

        return this.storage.readItems().nextId;

    }

    updateUser(userModel) {

        const items = this.storage.readItems();
        let check = false;

        for (const item of items.items) {

            if (item.id === userModel.id) {

                check = true;
                items.items[item.id - 1] = userModel;
                break;

            }

        }

        if (check === false) {

            console.log("User with such id doesn't exist.");

        }

        this.storage.writeItems(items);

    }

    deleteUser(userId) {

        const items = this.storage.readItems();
        let check = false;

        for (const item of items.items) {

            if (item.id === userId) {

                check = true;
                items.splice(item.id - 1, 1);
                break;

            }

        }

        if (check === false) {

            console.log("User with such id doesn't exist.");

        }

        this.storage.writeItems(items);

    }
};

module.exports = UserRepository;


// const User = require('../models/user');
// const JsonStorage = require('../jsonStorage');

// class UserRepository {

//     constructor(filePath) {

//         this.storage = new JsonStorage(filePath);

//     }

//     getUsers() {

//         return this.storage.readItems().items;

//     }

//     getUserById(userId) {

//         const items = this.storage.readItems().items;

//         for (const item of items) {

//             if (item.id === userId) {

//                 return new User(item.id, item.login, item.fullname, item.role, item.registeredAt, item.avaUrl, item.isEnabled, item.bio);

//             }

//         }

//         return 0;

//     }

//     getUsersPaginated(page, per_page) {

//         const page_size = 3;
//         const maxPageSize = 5;

//         if (per_page) {

//             if (per_page > maxPageSize) {

//                 console.log("Error.");
    
//                 return 0;
    
//             }

//         }
//         else {

//             per_page = page_size;

//         }

//         if (!page) {

//             page = 1;

//         }

//         const users = this.getUsers();
//         const usersNumber = Number(users.length);
//         const offset = per_page * (page - 1);

//         if (usersNumber < offset) {

//             console.log("Error.");

//             return 0;

//         }

//         const currentUsers = users.slice(offset, offset + per_page);

        
//         return currentUsers;

//     }

//     addUser(userModel) {

//         const items = this.storage.readItems();
//         this.storage.incrementNextId();
//         const newUser = new User(userModel.id, userModel.login, userModel.fullname, userModel.role, userModel.registeredAt, userModel.avaUrl, userModel.isEnablede, userModel.bio);
//         items.items.push(newUser);
//         this.storage.writeItems(items);

//         return this.storage.readItems().nextId;

//     }

//     updateUser(userModel) {

//         const items = this.storage.readItems();
//         let check = false;

//         for (const item of items.items) {

//             if (item.id === userModel.id) {

//                 check = true;
//                 items.items[item.id - 1] = userModel;
//                 break;

//             }

//         }

//         if (check === false) {

//             console.log("User with such id doesn't exist.");

//         }

//         this.storage.writeItems(items);

//     }

//     deleteUser(userId) {

//         const items = this.storage.readItems();
//         let check = false;

//         for (const item of items.items) {

//             if (item.id === userId) {

//                 check = true;
//                 items.splice(item.id - 1, 1);
//                 break;

//             }

//         }

//         if (check === false) {

//             console.log("User with such id doesn't exist.");

//         }

//         this.storage.writeItems(items);

//     }
// };

// module.exports = UserRepository;
