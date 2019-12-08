var mongoose = require('mongoose');
var schema = mongoose.Schema;

var studentSchema = schema({
    id: Number,
    firstName: String,
    lastName: String,
    age: Number,
    nationality: String
});

module.exports = mongoose.model('Student', studentSchema);