import { useState } from "react";
import axios from "../../Config/API";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Create = () => {
	const errorStyle = {
		color: "red",
	};

	const [errors, setErrors] = useState({
		course_title: "",
		lecturer_name: "",
		datetime: "",
		status: "",
	});

	const Navigate = useNavigate();

	const [form, setForm] = useState({
		course_title: "",
		lecturer_name: "",
		datetime: "",
		status: "",
	});

	const handleForm = (e) => {
		setForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const isRequired = (fields) => {
		let included = true;
		setErrors({});

		fields.forEach((field) => {
			if (!form[field]) {
				included = false;
				setErrors((prevState) => ({
					...prevState,
					[field]: {
						message: `${field} is required!`,
					},
				}));
			}
		});

		return included;
	};

	const [courses, setCourses] = useState([]);
	const token = localStorage.getItem("token");

	useEffect(() => {
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
	}, []);

	const courseList = courses.map((course) => {
		return <option value={course.id}>{course.title}</option>
			
	});

    useEffect(() => {
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
	}, []);

    const [lecturers, setLecturers] = useState([]);

	const lecturerList = lecturers.map((lecturer) => {
		return <option value={lecturer.id}>{lecturer.name}</option>
			
	});

	const submitForm = (e) => {
		e.preventDefault();
		console.log("Submitted", form);

		if (isRequired(["course_title", "lecturer_name", "datetime", "status"])) {
			let token = localStorage.getItem("token");

			axios
				.post("/enrolments", form, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					Navigate("/enrolments");
				})

				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<>
			<h3>Create Enrolments</h3>
			<form onSubmit={submitForm}>
				{/* TITLE */}

				<div>
					Course Title:
                    <select className="input input-bordered input-accent input-sm ">
                        {courseList}
                    </select>
                    
				</div>

				<hr />
				{/* LECTURER NAME */}
				<div>
					Lecturer Name:{" "}
                    <select className="input input-bordered input-accent input-sm ">
                        {lecturerList}
                    </select>
				</div>
				<hr />
				{/* DATE + TIME */}
				<div>
					Date + Time:{" "}
					<input
						type="datetime-local"
						className="input input-bordered input-accent input-sm "
						onChange={handleForm}
						value={form.datetime}
						name="datetime"
					/>{" "}
					<span style={errorStyle}>{errors.datetime?.message}</span>
				</div>
				<hr />
				{/* STATUS */}
				<div>
					Status:{" "}
					<input
						type="text"
						className="input input-bordered input-accent input-sm "
						onChange={handleForm}
						value={form.status}
						name="status"
					/>{" "}
					<span style={errorStyle}>{errors.status?.message}</span>
				</div>
				<hr />

				<input type="submit" />
			</form>
		</>
	);
};

export default Create;
