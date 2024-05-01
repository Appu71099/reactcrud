import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AddForm() {

    useEffect(() => {

        getstateAndCityData();

    }, []);


    const [city, setCity] = useState([])
    const [state, setState] = useState([]);

    const [cityByState,setCityByState] = useState([]);
    const [selectedState, setSelectedState] = useState([]);

   const handleStateChange = (event) =>{
    setSelectedState(event.target.value);
    const cityFilter = city.filter(city => city.state.id === event.target.value);
    setCityByState(cityFilter);
   }

    function getstateAndCityData() {
        // Get City List
        axios.get('http://localhost:9090/api/city/list').then((res) => {

            setCity(res.data.data);
            console.warn("City Response {}",res.data.data)
            // console.log(res.data.data);
            console.log("City List:", city);
        }).catch((error) => {
            console.log('Error While Fetching Data:{}', error)
        })

        //Get State List
        axios.get('http://localhost:9090/stateApi/getAll').then((res) => {
            setState(res.data.data)
            console.warn("State Response {}",res.data.data)
            console.log("State Data:", state)
        }).catch((error) => {
            console.error(error);
        })
    }

    const [formData, setFormData] = useState({
        title: '',
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        city: '',
        state: '',
        company: '',
        jobRole: '',
        dob: '',
        doj: ''
    });

    const body = {
        title: formData.title,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        city: {
            id: formData.city
        },
        state: {
            id: formData.state
        },
        company: formData.company,
        jobRole: formData.jobRole,
        dateOfBirth: formData.dob,
        dateOfJoining: formData.doj
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9090/api/employee/saveEmployee',
            body).then((res) => {
                console.log("Reponse :{}", res);
            }).catch((erro) => {
                console.error(erro)
            });
        console.log(formData);
        console.warn("Body Send to Api")
        console.log(body);
        // You can perform further actions here, like sending the form data to a server
    };

    



    return (
        <div className='container'>
            <div className="container mt-5">
                <div className="form-container">
                    <h2 className="text-center mb-4">Registration Form</h2>
                    <form>
                        <div className="form-group col-md-12">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" />
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
                        </div>
                        <div className="form-row">
                           
                        <label htmlFor="state">State</label>
                            <select className="form-control" id="state" name="state" value={formData.state} onChange={handleStateChange}>
                                <option value="">Select State</option>

                                {state.map(state=>(
                                         <option key={state.id} value={state.id} >{state.name}</option>
                                ))}
                            </select>


                            <label htmlFor="state">City</label>
                            <select className="form-control" id="city" name="city" value={formData.city} onChange={handleChange}>
                                <option value="">Select City</option>
                                {cityByState.map(city=>(
                                    <option  key={city.id} value={city.id}>{city.name}</option>
                                ))}
                                
                                {/* Add other city options here */}
                            </select>

                           
                            
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="company">Company</label>
                            <input type="text" className="form-control" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Enter company" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="jobRole">Job Role</label>
                            <input type="text" className="form-control" id="jobRole" name="jobRole" value={formData.jobRole} onChange={handleChange} placeholder="Enter job role" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="dob">Date of Birth</label>
                                <input type="date" className="form-control" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="doj">Date of Joining</label>
                                <input type="date" className="form-control" id="doj" name="doj" value={formData.doj} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='d-flex justify-content-around mt-3'>
                            <div>
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                            </div>
                            <div>
                                <button type="reset" className="btn btn-danger">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
