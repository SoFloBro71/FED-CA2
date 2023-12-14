import {useParams,  Link,  useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "../../Config/API"

import DeleteBtn from '../../Components/DeleteBtn';
// import { Button } from 'bootstrap';

const Show = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [lecturer, setLecturer] = useState(null);

    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`/lecturers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data.data);
                setLecturer(response.data.data);
            })

            .catch(err => {
                console.log(err);
            });
    }, [id, token])

    if(!lecturer) return <h3>Lecturer not Found</h3>

    return(
        <>
            <h2>Lecturer ID: {id}</h2>
            <div>
                <p><b>Name:</b> {lecturer.name} </p>
                <p><b>Address:</b> {lecturer.address}</p>
                <p><b>Phone:</b> {lecturer.phone}</p>
                <p><b>Email:</b> {lecturer.email}</p>
                <hr/>

                <button className="btn btn-secondary" to={`/lecturers/${id}/edit`}>Edit Lecturer</button>
                <DeleteBtn id={lecturer._id} resource="lecturers" deleteCallback={() => navigate('/lecturers')}/>
            </div>
        </>
    )
}

export default Show;