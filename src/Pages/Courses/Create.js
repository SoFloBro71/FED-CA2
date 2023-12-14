import { useState } from "react";
import axios from "../../Config/API";

import { useNavigate } from "react-router-dom";

const Create = () => {
	const errorStyle = {
		color: "red",
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

	const submitForm = (e) => {
		e.preventDefault();
		console.log("Submitted", form);

		if (isRequired(["title", "description", "code", "points", "level"])) {
			let token = localStorage.getItem("token");

			axios
				.post("/courses", form, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					Navigate("/courses");
				})

				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<>
			<h3>Create Course</h3>
			<form onSubmit={submitForm}>
				{/* TITLE */}
				<br/>
				<div>
					Title:{" "}
					<input
						type="text"
						className="input input-bordered input-accent input-sm "
						onChange={handleForm}
						value={form.title}
						name="title"
					/>{" "}
					<span style={errorStyle}>{errors.title?.message}</span>
				</div>
				<br/>
				<hr />
				<br/>

				{/* DESCRIPTION */}
				<div>
					Description:{" "}
					<input
						type="text"
						className="input input-bordered input-accent input-sm "
						onChange={handleForm}
						value={form.description}
						name="description"
					/>{" "}
					<span style={errorStyle}>{errors.description?.message}</span>
				</div>
				<br/>
				<hr />
				<br/>

				{/* CODE */}
				<div>
					Code:{" "}
					<input
						type="text"
						className="input input-bordered input-accent input-sm "
						onChange={handleForm}
						value={form.code}
						name="code"
					/>{" "}
					<span style={errorStyle}>{errors.code?.message}</span>
				</div>
				<br/>
				<hr />
				<br/>

				{/* POINTS */}
				<div>
					Points:{" "}
					<input
						type="text"
						className="input input-bordered input-accent input-sm "
						onChange={handleForm}
						value={form.points}
						name="points"
					/>{" "}
					<span style={errorStyle}>{errors.points?.message}</span>
				</div>
				<br/>
				<hr />
				<br/>

				{/* LEVEL */}
				<div>
					Level:{" "}
					<input
						type="text"
						className="input input-bordered input-accent input-sm "
						onChange={handleForm}
						value={form.level}
						name="level"
					/>{" "}
					<span style={errorStyle}>{errors.level?.message}</span>
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
