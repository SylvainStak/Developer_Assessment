var mongoose = require('mongoose');
var app = require('./app');
var node_port = 3900;
var mongo_port = 27017;

//Setting up the NodeJS backend and 
//the connection with the database
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(
    `mongodb://localhost:${mongo_port}/students`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB');

        app.listen(node_port, () => {
            console.log(`NodeJS server running at http://localhost:${node_port}`);
        });
    });