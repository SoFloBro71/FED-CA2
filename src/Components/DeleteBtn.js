import axios from "../Config/API"

// import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function DeleteBtn ({id, resource, deleteCallback}) {

    // const navigate = useNavigate();
    // const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false)

    const onDelete = () => {
        let token = localStorage.getItem('token');
        setIsLoading(true);
        axios.delete(`/${resource}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        .then(response => {
            console.log(response.data);
            setIsLoading(false);
            deleteCallback(id);
        })

        .catch(err => {
            console.log(err.response.data);
        })
    };

    return(
        <button className="btn btn-accent grid justify-items-end" onClick={onDelete}> {(isLoading) ? "Deleting..." : "Deleted"} </button>
    );
};