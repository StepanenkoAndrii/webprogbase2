const path = require('path');
const UserRepository = require('./../repositories/userRepository');
const userRepository = new UserRepository();

module.exports = {

    async getUserById(req, res) {

        try {
            
            user = await userRepository.getUserById(req.params.id);

            if (user) {

                res.status(200).render('user', {user: user});

            }
            else {

                res.status(404).send({user: null, message: "Not found."});

            }

        } catch (err) {
            
            console.log(err.message);
            res.status(500).send({user: null, message: 'Server error.'});

        }
        
    },

    async getUsersPaginated(req, res) {

        try {

            users = await userRepository.getUsersPaginated(Number(req.query.page), Number(req.query.per_page));
            
            if (users) {

                res.status(200).render('users', {users: users, userDisabled: "disabled"});

            }
            else {

                res.status(404).send({users: null, message: "Not found."});

            }

        } catch (err) {
            
            console.log(err.message);
            res.status(500).send({user: null, message: 'Server error.'});

        }
        
    },

};
