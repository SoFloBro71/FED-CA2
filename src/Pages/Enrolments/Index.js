import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../Config/API"

import DeleteBtn from "../../Components/DeleteBtn";

const token = localStorage.getItem('token');
const Index = ({ authenticate }) => {


    const [enrolments, setEnrolments] = useState([]);

    useEffect(() => {
        axios.get(`/enrolments`, {
            headers: {Authorization: `Bearer ${token}` }
        })

            .then(response => {
                console.log(response.data.data);
                setEnrolments(response.data.data);
            })

            .catch(err => {
                console.log(err);
            });
    }, []);

    const removeEnrolment = (id) => {
        console.log("Deleted", id);

        let updatedEnrolment = enrolments.filter((enrolment) => {
            return enrolment._id !== id; 
        });

        setEnrolments(updatedEnrolment);
    }

    if(enrolments.length === 0) return <h3>There are no enrolments</h3>;

    const enrolmentList = enrolments.map(enrolment => {
        return(
            <div key={enrolment._id}>

                {(authenticate) ? (<p><b>Course Title:</b> {enrolment.course_title} </p>) : (<p><b>Course Title:</b><Link to={`/enrolments/${enrolment.id}`}> {enrolment.course_title}</Link> </p>)}
                <p><b>Status:</b> {enrolment.Status}</p>

                <DeleteBtn resource="enrolments" id={enrolment.id} deleteCallback={removeEnrolment}/>
                <hr/>
            </div>
        )
    })

    return(
        <>
            <h2>All Enrolments</h2>
            {enrolmentList}
        </>
    );
};

export default Index;