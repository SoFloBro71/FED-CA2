import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';

// import Pages

// COURSES

import Home from './Pages/Home';
import CoursesIndex from './Pages/Courses/Index';
import CoursesShow from './Pages/Courses/Show';
import CoursesCreate from './Pages/Courses/Create';
import CoursesEdit from './Pages/Courses/Edit';
import PageNotFound from './Pages/Courses/PageNotFound';

// ENROLMENTS

import EnrolmentsIndex from './Pages/Enrolments/Index';
import EnrolmentsShow from './Pages/Enrolments/Show';
import EnrolmentsCreate from './Pages/Enrolments/Create';
import EnrolmentsEdit from './Pages/Enrolments/Edit';

// LECTURERS

import LecturersIndex from './Pages/Lecturers/Index';
import LecturersShow from './Pages/Lecturers/Show';
import LecturersCreate from './Pages/Lecturers/Create';
import LecturersEdit from './Pages/Lecturers/Edit';

// IMPORT COMPONENTS

import NavBar from './Components/NavBar';

const App = () => {

  const {authenticated, onAuthenticated} = useAuth();

  let protectedRoutes;

  useEffect(() => {
    if(localStorage.getItem('token')){
      onAuthenticated(true);
    }
  }, []);

  if(authenticated){
    protectedRoutes = (
      <>
          {/* COURSES */}
        <Route path='/courses/create' element={<CoursesCreate/>} />
        <Route path='/courses/:id/edit' element={<CoursesEdit/>} />
        <Route path='/courses/:id' element={<CoursesShow/>} />

          {/* ENROLMENTS */}

        <Route path='/enrolments/create' element={<EnrolmentsCreate/>} />
        <Route path='/enrolments/:id/edit' element={<EnrolmentsEdit/>} />
        <Route path='/enrolments/:id' element={<EnrolmentsShow/>} />

          {/* LECTURERS */}

        <Route path='/lecturers/create' element={<LecturersCreate/>} />
        <Route path='/lecturers/:id/edit' element={<LecturersEdit/>} />
        <Route path='/lecturers/:id' element={<LecturersShow/>} />
      </>
      )
    }

  return(
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<CoursesIndex />} />
        <Route path='/enrolments' element={<EnrolmentsIndex />} />
        <Route path='/lecturers' element={<LecturersIndex />} />

        {protectedRoutes}

        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
