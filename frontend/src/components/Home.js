import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component{
    url = "http://localhost:3900/";

    state = {
        students: [],
        nationalities: [],
        nationality: null,
        status: null,
        sort: 0
    }

    componentWillMount(){
        this.getData();
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        axios.get(this.url + "getStudents")
        .then(res => {
            let options = document.querySelector('#nationalities').options;
            let nationality = "";

            
            for (let i = 0; i < options.length; i++) {
                if(options[i].selected){
                    nationality = options[i].text;
                } 
            }

            //Insert all the nationalities into an array
            let allNations = [];
            let allStudents = [];

            res.data.students.forEach(student => {
                allNations.push(student.nationality);
                if(student.nationality === nationality)
                    allStudents.push(`${student.firstName} ${student.lastName} (${student.age})`);
            });

            //The filter method here goes through all the nations of the students and 
            //only store the ones that are different in the "nationList" Array
            let nationList = allNations.filter((nation, index) => allNations.indexOf(nation) === index).sort();

            this.setState({
                students: allStudents.sort(),
                nationalities: nationList,
                nationality: nationality,
                status: 'success'
            });

            console.log(this.state);
        });
    }

    sortStudents = () => {
        let sortedStudents = this.state.students.reverse();
        this.setState({
            students: sortedStudents
        });
    }

    render(){   
        /**
         * Generates students as divs with its first name, last name and age
         */        
        var listStudents = this.state.students.map((student, index) => {
            return(
                <div key={index} className="row">
                    <div className="col-12 border border-success rounded mb-1 mt-1 bg-light pt-2">
                        <p className="text-center">{student}</p>
                    </div>
                </div>
            );
        });

        /**
         * Generates nationalities as options
         */
        var listNationalities = this.state.nationalities.map((nation, index) => {
            return(
                <option key={index}>
                    {nation}
                </option>
            );
        });

        return(
            <div className="container mt-2">
                <select className="form-control" id="nationalities" onChange={this.getData}>
                    {listNationalities}
                </select>
                <div className="mt-2 border border-primary pr-5 pl-5 pb-2 pt-2 rounded bg-primary">
                    {listStudents}
                </div>
                <button className="btn mt-2 px-5 text-light border border-dark" onClick={this.sortStudents}>Sort</button>                
            </div>
        );
    }
}

export default Home;