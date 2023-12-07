import { useState, useEffect } from "react";
import axios from "../../Config/API";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {

    const {id} = useParams();
    const [courses, setCourses] = useState(null);

    const errorStyle = {
        color: 'red'
    };

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        code: "",
        points: "",
        level: "",
    });

    const Navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        code: "",
        points: "",
        level: "",

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

        if(isRequired(['title','description', 'code', 'points', 'level'])){


            let token = localStorage.getItem('token');

            axios.put(`/courses/${id}`, form, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                Navigate(`/courses/${id}`);
                setCourses(response.data);
                setForm(response.data)
            })
    
            .catch(err => {
                console.log(err);
            })
        }

    }

    return(
        <>
            <h3>Edit Courses</h3>
            <form onSubmit={submitForm}>
                {/* TITLE */}
                <div>
                Title: <input type='text' className="input input-bordered input-secondary input-sm" onChange={handleForm} value={form.title} name='title'/> <span style={errorStyle}>{errors.title?.message}</span> 
                </div>
                <hr/>
                {/* DESCRIPTION */}
                <div>
                Description: <input type='text' className="input input-bordered input-secondary input-sm" onChange={handleForm} value={form.description} name='description'/> <span style={errorStyle}>{errors.description?.message}</span> 
                </div>
                <hr/>
                {/* CODE */}
                <div>
                Code: <input type='text' className="input input-bordered input-secondary input-sm" onChange={handleForm} value={form.code} name='code'/> <span style={errorStyle}>{errors.code?.message}</span> 
                </div>
                <hr/>
                {/* POINTS */}
                <div>
                Points: <input type='text' className="input input-bordered input-secondary input-sm" onChange={handleForm} value={form.points} name='points'/> <span style={errorStyle}>{errors.points?.message}</span> 
                </div>
                <hr/>
                {/* LEVEL */}
                <div>
                Level: <input type='text' className="input input-bordered input-secondary input-sm" onChange={handleForm} value={form.level} name='level'/> <span style={errorStyle}>{errors.level?.message}</span> 
                </div>
                <hr/>

                <input type='submit' />

            </form>
        </>
    )
}

export default Edit;