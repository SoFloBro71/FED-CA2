import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../Config/API";

import DeleteBtn from "../../Components/DeleteBtn";

const Index = ({ authenticate }) => {
	const token = localStorage.getItem("token");
	const [courses, setCourses] = useState([]);

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

	const removeCourse = (id) => {
		console.log("Deleted", id);

		let updatedCourses = courses.filter((course) => {
			return course.id !== id;
		});

		setCourses(updatedCourses);
	};

	if (courses.length === 0) return <h3>There are no courses</h3>;

	const coursesList = courses.map((course) => {
		return (
            <>
			<div className="card-compact bg-base-100 shadow-xl">
				<div key={course._id} >
					{authenticate ? (
						<h2 className="card-title">
							<b>Title:</b> {course.title}{" "}
						</h2>
					) : (
						<p>
							<b>Title:</b>
							<Link to={`/courses/${course.id}`}> {course.title}</Link>{" "}
						</p>
					)}
					<p>
						<b>Description:</b> {course.description}
					</p>
					<div className="card-actions justify-end">
						<DeleteBtn
							resource="courses"
							id={course.id}
							deleteCallback={removeCourse}
						/>
						<hr />
					</div>
				</div>
			</div>
            <hr/>
            </>
		);
	});

	return (
		<>
			<h2>All Courses</h2>
			{coursesList}
		</>
	);
};

export default Index;
