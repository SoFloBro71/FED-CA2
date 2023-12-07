import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../Config/API"

import DeleteBtn from "../../Components/DeleteBtn";


const Index = ({ authenticate }) => {

    const token = localStorage.getItem('token');
    const [lecturers, setLecturers] = useState([]);

    useEffect(() => {
        axios.get(`/lecturers`, {
            headers: {Authorization: `Bearer ${token}` }
        })

            .then(response => {
                console.log(response.data.data);
                setLecturers(response.data.data);
            })

            .catch(err => {
                console.log(err);
            });
    }, []);

    const removeLecturer = (id) => {
        console.log("Deleted", id);

        let updatedLecturers = lecturers.filter((lecturer) => {
            return lecturer.id !== id; 
        });

        setLecturers(updatedLecturers);
    }

    if(lecturers.length === 0) return <h3>There are no lecturers</h3>;

    const lecturersList = lecturers.map(lecturer => {
        return(
            <div key={lecturer.id}>

                {(authenticate) ? (<p><b>Name:</b> {lecturer.name} </p>) : (<p><b>Name:</b><Link to={`/lecturers/${lecturer.id}`}> {lecturer.name}</Link> </p>)}
                <p><b>Phone:</b> {lecturer.Phone}</p>

                <DeleteBtn resource="lecturers" id={lecturer.id} deleteCallback={removeLecturer}/>
                <hr/>
            </div>
        )
    })

    return(
        <>
            <h2>All Lecturers</h2>
            {lecturersList}
        </>
    );
};

export default Index;