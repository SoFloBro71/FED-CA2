import {useParams,  Link,  useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "../../Config/API"

import DeleteBtn from '../../Components/DeleteBtn';
// import { Button } from 'bootstrap';

const Show = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);

    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`/courses/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data.data);
                setCourse(response.data.data);
            })

            .catch(err => {
                console.log(err);
            });
    }, [id, token])

    if(!course) return <h3>Course not Found</h3>

    return(
        <>
            <h2 className=" justify-center">Course ID: {id}</h2>
            <div>
                <p><b>Title:</b> {course.title} </p>
                <p><b>Description:</b> {course.description}</p>
                <p><b>Code:</b> {course.code}</p>
                <p><b>Points:</b> {course.points}</p>
                <p><b>Level:</b> {course.level}</p>
                <hr/>

                <button className="btn btn-secondary" to={`/courses/${id}/edit`}>Edit Course</button>

                <DeleteBtn  id={course._id} resource="courses" deleteCallback={() => navigate('/courses')}/>
            </div>
        </>
    )
}

export default Show;