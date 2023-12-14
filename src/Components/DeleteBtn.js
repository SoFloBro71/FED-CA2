import axios from "../Config/API";
import { useEffect, useState } from "react";

// import { useNavigate, useParams } from "react-router-dom";

export default function DeleteBtn({ id, resource, deleteCallback }) {
	// const navigate = useNavigate();
	// const {id} = useParams();
	const [isLoading, setIsLoading] = useState(false);

	const onDelete = () => {
		let token = localStorage.getItem("token");
		setIsLoading(true);
		axios
			.delete(`/${resource}/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			.then((response) => {
				console.log(response.data);
				setIsLoading(false);
				deleteCallback(id);
			})

			.catch((err) => {
				console.log(err.response.data);
			});
	};

	const deleteEnrolments = () => {
		let token = localStorage.getItem("token");
		const [courses, setCourses, lecturers, setLecturers] = useState([]);

		// loop through course/lecturer enrolments and send delete request to delete them
		lecturers.enrolments.forEach((enrolment) => {
            // DELETING LECTURER
			axios
				.get(`/lecturers`, {
					headers: { Authorization: `Bearer ${token}` },
				})

				.then((response) => {
					console.log(response.data.data);
					setLecturers(response.data.data);
				})

				.catch((err) => {
					console.log(err);
				});
		});
        courses.enrolments.forEach((enrolment) => {
		// Deleting courses
		axios
			.get(`/courses`, {
				headers: { Authorization: `Bearer ${token}` },
			})

			.then((response) => {
				console.log(response.data.data);
				setCourses(response.data.data);
			})

			.catch((err) => {
				console.log(err);
			});
        });
	};

	return (
		<button
			className="btn btn-primary grid justify-items-end"
			onClick={deleteEnrolments}
		>
			{" "}
			{isLoading ? "Deleting..." : "Deleted"}{" "}
		</button>
	);
}
