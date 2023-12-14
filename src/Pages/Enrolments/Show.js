import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../Config/API";

import DeleteBtn from "../../Components/DeleteBtn";
// import { Button } from 'bootstrap';

const Show = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [enrolment, setEnrolment] = useState(null);

	let token = localStorage.getItem("token");

	useEffect(() => {
		axios
			.get(`/enrolments/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response.data.data);
				setEnrolment(response.data.data);
			})

			.catch((err) => {
				console.log(err);
			});
	}, [id, token]);

	if (!enrolment) return <h3>Enrolment not Found</h3>;

	return (
		<>
			<h2>Enrolment ID: {id}</h2>
			<br />
            <hr/>
			<div>
				<p>
					<b>Course id:</b> {enrolment.course_id}{" "}
				</p>
				<br />
				<p>
					<b>Lecturer id:</b> {enrolment.lecturer_id}
				</p>
				<br />
				<p>
					<b>Date:</b> {enrolment.date}
				</p>
				<br />
				<p>
					<b>Time:</b> {enrolment.time}
				</p>
				<br />
				<p>
					<b>Status:</b> {enrolment.status}
				</p>
				<br />
				<hr />

				<Link className="btn btn-secondary" to={`/enrolments/${id}/edit`}>
					Edit Enrolment
				</Link>
				<DeleteBtn
					id={enrolment._id}
					resource="enrolments"
					deleteCallback={() => navigate("/enrolments")}
				/>
			</div>
		</>
	);
};

export default Show;
