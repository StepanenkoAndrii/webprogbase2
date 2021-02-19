const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const mustache = require('mustache-express');
const body_parser = require('body-parser')
const busboyBodyParser = require('busboy-body-parser');
const morgan = require('morgan');

const app = express();

require('dotenv').config()
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_CONNECTION_STRING || '';
const connectOptions = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
};

const viewsDir = path.join(__dirname, 'views');
app.engine("mst", mustache(path.join(viewsDir, "partials")));
app.set('views', viewsDir);
app.set('view engine', 'mst');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('./public'))
app.use(express.static('./data'))

const mstRouter = require('./routes/mstRouter');

app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json());
app.use(busboyBodyParser());

app.use(morgan('dev'));
 
app.get('/', function(req, res) {
    res.render('index', {disabled: "disabled"});
});
app.get('/about', function(req, res) {
    res.render('about', {aboutDisabled: "disabled"});
});

app.use('', mstRouter);
app.use((req, res) => {
    res.status(400).send({ message: "Error in route."});
});

app.listen(port, async () => {

    try {
       
        console.log(`Server ready`);
        const client = await mongoose.connect(dbUrl, connectOptions);
        console.log('Mongo database connected');

    } 
    catch (error) {
       
        console.log(`Server or db connection error`);

    }
   
});


 
// app.get("/api/users/test-create", async function (req, res, next) {
//    const user = {
//        login: `user1`,  // Math.trunc(Math.random() * 100)
//        fullname: "Some User"
//    };
//    try
//    {
//        const userDoc = await new UserModel(user).save();
//        res.json(userDoc.toJSON());
//    }
//    catch (err)
//    {
//        return next(err);
//    }
// });


// const express = require('express');
// const app = express();
// // const consolidate = require('consolidate');
// const path = require('path');
// const mustache = require('mustache-express');
// const body_parser = require('body-parser')
// const busboyBodyParser = require('busboy-body-parser');
// const morgan = require('morgan');

// const viewsDir = path.join(__dirname, 'views');
// app.engine("mst", mustache(path.join(viewsDir, "partials")));
// app.set('views', viewsDir);
// app.set('view engine', 'mst');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'mst');

// app.use(express.static('./public'))
// app.use(express.static('./data'))

// const mstRouter = require('./routes/mstRouter');

// app.use(body_parser.urlencoded({ extended: true }))
// app.use(body_parser.json());
// app.use(busboyBodyParser());

// app.use(morgan('dev'));

// // const expressSwaggerGenerator = require('express-swagger-generator');
// // const expressSwagger = expressSwaggerGenerator(app);
 
// // const options = {
// //     swaggerDefinition: {
// //         info: {
// //             description: 'Trying to understand swagger',
// //             title: 'Pseudo swagger',
// //             version: '1.0.0',
// //         },
// //         host: 'localhost:3000',
// //         produces: [ "application/json" ],
// //     },
// //     basedir: __dirname,
// //     files: ['./routes/**/*.js', './models/**/*.js'],
// // };
// // expressSwagger(options);

// app.get('/', function(req, res) {
//     res.render('index', {disabled: "disabled"});
// });
// app.get('/about', function(req, res) {
//     res.render('about', {aboutDisabled: "disabled"});
// });

// app.use('', mstRouter);
// app.use((req, res) => {
//     res.status(400).send({ message: "Error in route."});
// });

// app.listen(3000, function() {
//     console.log('Server is ready');
// });

// const UserSchema = new mongoose.Schema({
//    login: { type: String, required: true },
//    fullname: { type: String },
//    created: { type: Date, default: Date.now },
// });
 
// const UserModel = mongoose.model('User', UserSchema);

// const UserModel = require('./models/user');