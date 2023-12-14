import { useState } from "react";
import axios from "../../Config/API";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Create = () => {
	const errorStyle = {
		color: "red",
	};

	const [errors, setErrors] = useState({
		course_id: "",
		lecturer_id: "",
		time: "",
		date: "",
		status: "",
	});

	const Navigate = useNavigate();

	const [form, setForm] = useState({
		course_id: "",
		lecturer_id: "",
		time: "",
		date: "",
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
				console.log(err.response.data);
			});
	}, []);

	const courseList = courses.map((course) => {
		return <option value={course.id}>{course.title}</option>;
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
		return <option value={lecturer.id}>{lecturer.name}</option>;
	});

	const submitForm = (e) => {
		e.preventDefault();
		console.log("Submitted", form);

		if (isRequired(["time", "date"])) {
			let token = localStorage.getItem("token");

			console.log("API");

			axios
				.post("/enrolments", form, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					console.log("API", response.data);
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
			<br/>
			<form onSubmit={submitForm}>
				{/* TITLE */}

				<div key="">
					Course Title:{" "}
					<select
						className="input input-bordered input-accent input-sm "
						name="course_id"
						onChange={handleForm}
					>
						text{courseList}
					</select>
				</div>
                <br/>
				<hr />
				<br/>

				{/* LECTURER NAME */}
				<div>
					Lecturer Name:{" "}
					<select
						className="input input-bordered input-accent input-sm "
						name="lecturer_id"
						onChange={handleForm}
					>
						{lecturerList}
					</select>
				</div>
				<br/>
				<hr />
				<br/>

				{/* TIME */}
				<div>
					Time:{" "}
					<input
						type="time"
						className="input input-bordered input-accent input-sm "
						onChange={handleForm}
						value={form.time}
						name="time"
					/>{" "}
					<span style={errorStyle}>{errors.time?.message}</span>
				</div>
				<br/>
				<hr />
				<br/>

				{/* DATE */}
				<div>
					Date:{" "}
					<input
						type="date"
						className="input input-bordered input-accent input-sm "
						onChange={handleForm}
						value={form.date}
						name="date"
					/>{" "}
					<span style={errorStyle}>{errors.date?.message}</span>
				</div>
				<br/>
				<hr />
				<br/>

				{/* STATUS */}
				<div>
					Status:{" "}
					<select
						className="input input-bordered input-accent input-sm "
						name="status"
						onChange={handleForm}
					>
						<option value="assigned">Assigned</option>
						<option value="interested">Interested</option>
						<option value="associate">Associate</option>
						<option value="carrer_break">Carrer Break</option>

					</select>
				</div>
				<br/>
				<hr />
				<br/>
				
				<input type="submit" />
			</form>
		</>
	);
};

export default Create;
