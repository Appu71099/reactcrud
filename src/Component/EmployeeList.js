import axios from 'axios';
import React, { useEffect, useState } from 'react'

// import Modal from './Modal';

export default function EmployeeList() {

    const [empdata, setEmpDats] = useState([]);

    function getEmployeeData() {
        axios.get('http://localhost:9090/api/employee/getEmployee').then((response) => {
            // console.log(response.data.data); 
            setEmpDats(response.data.data)
            console.log("Employee Data: {}", empdata);
        })
    }

    useEffect(() => {
        getEmployeeData();
    }, [])

     
    return (
        <div className='container'>
            <div className='d-flex justify-content-between '>
                <div><h1>Read List</h1></div>
                <div><button type="button" class="btn btn-secondary mt-2" >Add User</button></div>
            </div>
            
            <div className='.form-container'>
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Company</th>
                            <th scope="col">View Date</th>
                            <th scope="col">Delete Data</th>
                        </tr>
                    </thead>
                    {empdata.map((respData,index) => {
                        return (
                            <>
                                <tbody key={respData.id}>
                                    <tr>
                                        <th scope="row">{respData.title}</th>
                                        <td>{respData.firstName}</td>
                                        <td>{respData.lastName}</td>
                                        <td>{respData.company}</td>
                                        <td><button className='btn btn-sm btn-success'>view Info</button></td>
                                        <td><button className='btn btn-sm btn-danger'>delete</button></td>
                                    </tr>

                                </tbody>
                            </>
                        )
                    })}


                </table>
            </div>



           

</div>


        
    )
}
