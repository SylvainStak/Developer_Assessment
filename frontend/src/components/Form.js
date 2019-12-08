import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component{
    url = "http://localhost:3900/";

    idRef = React.createRef();
    firstNameRef = React.createRef();
    lastNameRef = React.createRef();
    ageRef = React.createRef();
    nationalityRef = React.createRef();

    saveStudent = (e) => {
        e.preventDefault();

        axios.post(this.url + "saveStudent", {
            id: this.idRef.current.value,
            firstName: this.firstNameRef.current.value,
            lastName: this.lastNameRef.current.value,
            age: this.ageRef.current.value,
            nationality: this.nationalityRef.current.value
        })
        .then(res => {
            console.log(res);
            document.getElementById("formAddStudents").reset();
        })
        .catch(err => {
            console.log(err);
        });
    }

    render(){
        return(
            <div className="container mt-2">
                <div className="mt-2 border border-primary pr-5 pl-5 pb-2 pt-2 rounded newSbg">
                    <h1 className="text-center newStitle">New Student</h1>
                    <form id="formAddStudents" onSubmit={this.saveStudent}>
                        <input type="text" className="col-12 form-control mb-1" ref={this.idRef} placeholder="id" required/>
                        <input type="text" className="col-12 form-control mb-1" ref={this.firstNameRef} placeholder="First Name" required/>
                        <input type="text" className="col-12 form-control mb-1" ref={this.lastNameRef} placeholder="Last Name" required/>
                        <input type="text" className="col-12 form-control mb-1" ref={this.ageRef} placeholder="Age" required/>
                        <input type="text" className="col-12 form-control mb-1" ref={this.nationalityRef} placeholder="Nationality" required/>
                        <hr className="hr mb-1"/>
                        <input className="btn col-12 mt-2 addStudent" type="submit" value="Add Student" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;