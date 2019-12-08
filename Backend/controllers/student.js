var validator = require('validator');
var Student = require('../models/student');

var mongoose = require('mongoose');

var testStudents = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        age: 24,
        nationality: "English"
    },
    {
        id: 2,
        firstName: "Jan",
        lastName: "Dewaele",
        age: 27,
        nationality: "Belgian"
    },
    {
        id: 3,
        firstName: "Jonathan",
        lastName: "Van Driessen",
        age: 33,
        nationality: "Belgian"
    },
    {
        id: 4,
        firstName: "Anthony",
        lastName: "Lamot",
        age: 30,
        nationality: "Belgian"
    },
    {
        id: 5,
        firstName: "Tim",
        lastName: "Ferris",
        age: 36,
        nationality: "American"
    },
    {
        id: 6,
        firstName: "Melinda",
        lastName: "Gates",
        age: 63,
        nationality: "American"
    },
    {
        id: 7,
        firstName: "Jan",
        lastName: "De Hollander",
        age: 13,
        nationality: "Dutch"
    },
    {
        id: 8,
        firstName: "Maarten",
        lastName: "De Vriendt",
        age: 47,
        nationality: "Dutch"
    },
    {
        id: 9,
        firstName: "Furkan",
        lastName: "Kursun",
        age: 23,
        nationality: "Turkish"
    }
];

var controller = {
    /**
     * Cleans the 'students' collection and inserts
     * the test students documents to it
     */
    init: (req, res) => {

        //Cleans the collection
        mongoose.connection.collections['students'].drop(err => {
            console.log('Collection initialized');
        });

        testStudents.forEach(student => {
            //Creates a new student from the students model
            //And assign it the values from the test student
            let newStudent = new Student();

            newStudent.id = student.id;
            newStudent.firstName = student.firstName;
            newStudent.lastName = student.lastName;
            newStudent.age = student.age;
            newStudent.nationality = student.nationality;

            //save this new student to the database
            newStudent.save((err, studentStored) => {
                //Check for any errors
                if(err || !studentStored){
                    return res.status(404).send({
                        status: 'Error',
                        message: 'There was an error inserting the students to the Database'
                    });
                }
            });
        });

        //If everything goes well, return a success message
        return res.status(200).send({
            status: 'Success',
            message: 'The next students have been inserted to the Database.',
            studentsInserted: testStudents
        });
    },

    /**
     * Takes the parameters of the new student, validates the data,
     * and adds a new student document to the database
     */
    saveStudent: (req, res) => {
        var params = req.body;

        //First checks if all data is sent
        try{
            var validate_id = !validator.isEmpty(params.id);
            var validate_firstName = !validator.isEmpty(params.firstName);
            var validate_lastName = !validator.isEmpty(params.lastName);
            var validate_age = !validator.isEmpty(params.age);
            var validate_nationality = !validator.isEmpty(params.nationality); 
        }catch(err){
            return res.status(200).send({
                status: 'Error',
                message: 'There is some data left'
            });
        }

        //Check if data is valid
        if(validate_id &&
           validate_firstName &&
           validate_lastName &&
           validate_age &&
           validate_nationality){
            
            var newStudent = new Student();
            newStudent.id = params.id;
            newStudent.firstName = params.firstName;
            newStudent.lastName = params.lastName;
            newStudent.age = params.age;
            newStudent.nationality = params.nationality;

            //saves the student to the database
            newStudent.save((err, studentStored) => {
                if(err || !studentStored){
                    return res.status(404).send({
                        status: 'Error',
                        message: 'There was an error storing the student'
                    });
                }

                return res.status(200).send({
                    status: 'Success',
                    newStudent
                });
            }); 
           }else{
               //At this point, the data sent is not valid
                return res.status(200).send({
                    status: 'Error',
                    message: 'The data is not valid'
                });
           }
    },

    /**
     * Returns all the students from the 'students' collection
     */
    getStudents: (req, res) => {
        var query = Student.find({});

        query.exec((err, students) => {
            if(err || !students){
                return res.status(500).send({
                    status: 'Error',
                    message: 'There was an error retrieving the students',
                });
            }else{
                return res.status(200).send({
                    status: 'Success',
                    students
                });
            }           
        });
    }
};

module.exports = controller;