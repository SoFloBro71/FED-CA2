import {useParams,  Link,  useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "../../Config/API"

import DeleteBtn from '../../Components/DeleteBtn';
// import { Button } from 'bootstrap';

const Show = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [enrolment, setEnrolment] = useState(null);

    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`/enrolments/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data.data);
                setEnrolment(response.data.data);
            })

            .catch(err => {
                console.log(err);
            });
    }, [id, token])

    if(!enrolment) return <h3>Enrolment not Found</h3>

    return(
        <>
            <h2>Enrolment ID: {id}</h2>
            <div>
                <p><b>Course Title:</b> {enrolment.course_title} </p>
                <p><b>Lecturer Name:</b> {enrolment.lecturer_name}</p>
                <p><b>Date:</b> {enrolment.date}</p>
                <p><b>Time:</b> {enrolment.time}</p>
                <p><b>Status:</b> {enrolment.status}</p>
                <hr/>

                <Link to={`/enrolments/${id}/edit`}>Edit Enrolment</Link>
                <DeleteBtn id={enrolment._id} resource="enrolments" deleteCallback={() => navigate('/enrolments')}/>
            </div>
        </>
    )
}

export default Show;