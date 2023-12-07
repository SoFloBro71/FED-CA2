// import { Navbar, Container, Nav, NavDropdown } from "reacts-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const NavBar = () => {
	const { authenticated, onAuthenticated } = useAuth();

	const navigate = useNavigate();

	const logout = () => {
		onAuthenticated(false);
		navigate("/");
	};

	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				<a className="btn btn-ghost text-xl">daisyUI</a>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					{/* <li><a>Item 1</a></li> */}

					<li>
						<details>
							<summary>Lecturers</summary>
							<ul className="p-2">
								<li>
									<Link to="/lecturers"> All</Link>
								</li>
								<li>
									<Link to="/lecturers/create"> Create Lecturers</Link>
								</li>
							</ul>
						</details>
					</li>

					<li>
						<details>
							<summary>Courses</summary>
							<ul className="p-2">
								<li>
									<Link to="/courses"> All</Link>
								</li>
								<li>
									<Link to="/courses/create"> Create Courses </Link>
								</li>
							</ul>
						</details>
					</li>

					<li>
						<details>
							<summary>Enrolments</summary>
							<ul className="p-2">
								<li>
									<Link to="/enrolments"> All</Link>
								</li>
								<li>
									<Link to="/enrolments/create">Create Enrolment</Link>
								</li>
							</ul>
						</details>
					</li>
					{/* <li><a>Item 3</a></li> */}
				</ul>
			</div>
			<div className="navbar-end">
				{authenticated ? <button onClick={logout}>Logout</button> : ""}
			</div>
		</div>
	);
};

export default NavBar;
