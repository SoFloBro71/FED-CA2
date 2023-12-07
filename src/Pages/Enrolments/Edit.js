import { useState, useEffect } from "react";
import axios from "../../Config/API";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {

    const {id} = useParams();
    const [enrolments, setEnrolments] = useState(null);

    const errorStyle = {
        color: 'red'
    };

    const [errors, setErrors] = useState({
        course_title: "",
        lecturer_name: "",
        datetime: "",
        status: "" 
    });

    const Navigate = useNavigate();

    const [form, setForm] = useState({
        course_title: "",
        lecturer_name: "",
        datetime: "",
        status: "" 

    })


    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const isRequired = (fields) => {

        let included = true;
        setErrors({});

        fields.forEach(field => {
            
            if(!form[field]){

                included = false;
                setErrors(prevState => ({
                    ...prevState,
                    [field]:{
                        message: `${field} is required!`
                    }
                }));
            };
        });

        return included;

    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log('Submitted', form);

        if(isRequired(['course_title','lecturer_name', 'date', 'time', 'status'])){


            let token = localStorage.getItem('token');

            axios.put(`/enrolments/${id}`, form, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                Navigate(`/enrolments/${id}`);
                setEnrolments(response.data);
                setForm(response.data)
            })
    
            .catch(err => {
                console.log(err);
            })
        }

    }

    return(
        <>
            <h3>Edit Enrolment</h3>
            <form onSubmit={submitForm}>
                {/* TITLE */}
                <div>
                Course Title: <input type='text' className="input input-bordered input-secondary input-sm" onChange={handleForm} value={form.course_title} name='course_title'/> <span style={errorStyle}>{errors.course_title?.message}</span> 
                </div>
                <hr/>
                {/* LECTURER NAME */}
                <div>
                Lecturer Name: <input type='text' className="input input-bordered input-secondary input-sm" onChange={handleForm} value={form.lecturer_name} name='lecturer_name'/> <span style={errorStyle}>{errors.lecturer_name?.message}</span> 
                </div>
                <hr/>
                {/* DATE + TIME */}
                <div>
                Date + Time: <input type='datetime-local' className="input input-bordered input-accent input-sm " onChange={handleForm} value={form.datetime} name='datetime'/> <span style={errorStyle}>{errors.datetime?.message}</span> 
                </div>
                <hr/>
                {/* STATUS */}
                <div>
                Status: <input type='text' className="input input-bordered input-secondary input-sm" onChange={handleForm} value={form.status} name='status'/> <span style={errorStyle}>{errors.status?.message}</span> 
                </div>
                <hr/>

                <input type='submit' />

            </form>
        </>
    )
}

export default Edit;