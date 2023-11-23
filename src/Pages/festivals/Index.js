import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../Config/API"

import DeleteBtn from "../../Components/DeleteBtn";


const Index = ({ authenticate }) => {


    const [festivals, setFestivals] = useState([]);

    useEffect(() => {
        axios.get(`/festivals`)

            .then(response => {
                console.log(response.data);
                setFestivals(response.data);
            })

            .catch(err => {
                console.log(err);
            });
    }, []);

    const removeFestival = (id) => {
        console.log("Deleted", id);

        let updatedFestivals = festivals.filter((festival) => {
            return festival._id !== id; 
        });

        setFestivals(updatedFestivals);
    }

    if(festivals.length === 0) return <h3>There are no festivals</h3>;

    const festivalsList = festivals.map(festival => {
        return(
            <div key={festival._id}>

                {(authenticate) ? (<p><b>Title:</b> {festival.title} </p>) : (<p><b>Title:</b><Link to={`/festivals/${festival._id}`}> {festival.title}</Link> </p>)}
                <p><b>Description:</b> {festival.description}</p>

                <DeleteBtn resource="festivals" id={festival._id} deleteCallback={removeFestival}/>
                <hr/>
            </div>
        )
    })

    return(
        <>
            <h2>All Festivals</h2>
            {festivalsList}
        </>
    );
};

export default Index;