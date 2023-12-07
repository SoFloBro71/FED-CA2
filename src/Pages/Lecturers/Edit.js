import { useState, useEffect } from "react";
import axios from "../../Config/API";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {

    const {id} = useParams();
    const [lecturers, setLecturers] = useState(null);

    const errorStyle = {
        color: 'red'
    };

    const [errors, setErrors] = useState({
        name:"",
        address:"",
        phone:"",
        email:"",
    });

    const Navigate = useNavigate();

    const [form, setForm] = useState({
        name:"",
        address:"",
        phone:"",
        email:"",

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

        if(isRequired(['name','address', 'phone', 'email'])){


            let token = localStorage.getItem('token');

            axios.put(`/lecturers/${id}`, form, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                Navigate(`/lecturers/${id}`);
                setLecturers(response.data);
                setForm(response.data)
            })
    
            .catch(err => {
                console.log(err);
            })
        }

    }

    return(
        <>
            <h3>Edit Lecturers</h3>
            <form onSubmit={submitForm}>
                {/* NAME */}
                <div>
                Name: <input type='text' onChange={handleForm} value={form.name} name='name'/> <span style={errorStyle}>{errors.name?.message}</span> 
                </div>
                <hr/>
                {/* ADDRESS */}
                <div>
                Address: <input type='text' onChange={handleForm} value={form.address} name='address'/> <span style={errorStyle}>{errors.address?.message}</span> 
                </div>
                <hr/>
                {/* PHONE */}
                <div>
                Phone: <input type='text' onChange={handleForm} value={form.phone} name='phone'/> <span style={errorStyle}>{errors.phone?.message}</span> 
                </div>
                <hr/>
                {/* EMAIL */}
                <div>
                Email: <input type='text' onChange={handleForm} value={form.email} name='email'/> <span style={errorStyle}>{errors.email?.message}</span> 
                </div>
                <hr/>

                <button type='submit' />

            </form>
        </>
    )
}

export default Edit;