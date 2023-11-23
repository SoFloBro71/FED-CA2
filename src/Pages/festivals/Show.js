import {useParams,  Link,  useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "../../Config/API"

import DeleteBtn from '../../Components/DeleteBtn';
// import { Button } from 'bootstrap';

const Show = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [festival, setFestival] = useState(null);

    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`/festivals/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                setFestival(response.data);
            })

            .catch(err => {
                console.log(err);
            });
    }, [id, token])

    if(!festival) return <h3>Festival not Found</h3>

    return(
        <>
            <h2>Festival: {id}</h2>
            <div>
                <p><b>Title:</b> {festival.title} </p>
                <p><b>Description:</b> {festival.description}</p>
                <p><b>City:</b> {festival.city}</p>
                <p><b>Start_Date:</b> {festival.start_date}</p>
                <p><b>End_Date:</b> {festival.end_date}</p>
                <hr/>

                <Link to={`/festivals/${id}/edit`}>Edit Festival</Link>
                <DeleteBtn id={festival._id} resource="festivals" deleteCallback={() => navigate('/festivals')}/>
            </div>
        </>
    )
}

export default Show;