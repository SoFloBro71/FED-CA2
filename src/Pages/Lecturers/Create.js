import { useState } from "react"
import axios from "../../Config/API"

import { useNavigate } from "react-router-dom"

const Create = () => {

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

            axios.post('/lecturers', form, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                Navigate('/lecturers');
            })
    
            .catch(err => {
                console.log(err);
            })
        }

    }

    return(
        <>
            <h3>Create Lecturer</h3>
            <form onSubmit={submitForm}>
                {/* NAME */}
                <div>
                Name: <input type='text' className="input input-bordered input-accent input-sm " onChange={handleForm} value={form.name} name='name'/> <span style={errorStyle}>{errors.name?.message}</span> 
                </div>
                <hr/>
                {/* ADDRESS */}
                <div>
                Address: <input type='text' className="input input-bordered input-accent input-sm " onChange={handleForm} value={form.address} name='address'/> <span style={errorStyle}>{errors.address?.message}</span> 
                </div>
                <hr/>
                {/* PHONE */}
                <div>
                Phone: <input type='text' className="input input-bordered input-accent input-sm " onChange={handleForm} value={form.phone} name='phone'/> <span style={errorStyle}>{errors.phone?.message}</span> 
                </div>
                <hr/>
                {/* EMAIL */}
                <div>
                Email: <input type='text' className="input input-bordered input-accent input-sm " onChange={handleForm} value={form.email} name='email'/> <span style={errorStyle}>{errors.email?.message}</span> 
                </div>
                <hr/>

                <input type='submit' />

            </form>
        </>
    )
}

export default Create;