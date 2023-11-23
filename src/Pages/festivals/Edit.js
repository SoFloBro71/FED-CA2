import { useState, useEffect } from "react";
import axios from "../../Config/API";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {

    const {id} = useParams();
    const [festival, setFestival] = useState(null);

    const errorStyle = {
        color: 'red'
    };

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        city: "",
        start_date: "",
        end_date: "",
    });

    const Navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        city: "",
        start_date: "",
        end_date: "",

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

        if(isRequired(['title','description', 'city', 'start_date', 'end_date'])){


            let token = localStorage.getItem('token');

            axios.put(`/festivals/${id}`, form, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                Navigate(`/festivals/${id}`);
                setFestival(response.data);
                setForm(response.data)
            })
    
            .catch(err => {
                console.log(err);
            })
        }

    }

    return(
        <>
            <h3>Edit Festival</h3>
            <form onSubmit={submitForm}>
                {/* TITLE */}
                <div>
                Title: <input type='text' onChange={handleForm} value={form.title} name='title'/> <span style={errorStyle}>{errors.title?.message}</span> 
                </div>
                <hr/>
                {/* DESCRIPTION */}
                <div>
                Description: <input type='text' onChange={handleForm} value={form.description} name='description'/> <span style={errorStyle}>{errors.description?.message}</span> 
                </div>
                <hr/>
                {/* CITY */}
                <div>
                City: <input type='text' onChange={handleForm} value={form.city} name='city'/> <span style={errorStyle}>{errors.city?.message}</span> 
                </div>
                <hr/>
                {/* START DATE */}
                <div>
                Start_Date: <input type='datetime-local' onChange={handleForm} value={form.start_date} name='start_date'/> <span style={errorStyle}>{errors.start_date?.message}</span> 
                </div>
                <hr/>
                {/* END DATE */}
                <div>
                End_Date: <input type='datetime-local' onChange={handleForm} value={form.end_date} name='end_date'/> <span style={errorStyle}>{errors.end_date?.message}</span> 
                </div>
                <hr/>

                <input type='submit' />

            </form>
        </>
    )
}

export default Edit;