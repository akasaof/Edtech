import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Login from './pages/login'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './pages/home'
import { useDispatch, useSelector } from 'react-redux'
import { sampleData } from './redux/Silcers/sampleSlice'
import Journey from './pages/journey'
import QuestionBank from './pages/questionBank'
import JobBoard from './pages/jobBoard'
import Usermanagement from './adminAcess/userManagement/userManagement.jsx'
import AdminUser from './adminAcess/formsComp/adminUser.jsx'
import QbManagement from './adminAcess/QbManagement/qbManagement.jsx'
import AdminQb from './adminAcess/formsComp/adminQb.jsx'
import JobManagement from './adminAcess/jobManagement/jobManagement.jsx'
import JobForm from './adminAcess/formsComp/adminJob.jsx'
import CourseManagement from './adminAcess/courseManagement/courseManagement.jsx'

function App() {
  const dispath = useDispatch()
  dispath(sampleData("Hello"))
  const value = useSelector((store)=>store.sampleData)
  console.log(value)
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path='/journey' element={<Journey/>}/>
        <Route path="/qb" element={<QuestionBank/>}/>
        <Route path='/jobBoard' element={<JobBoard/>}/>
        <Route path="/userManagement" element={<Usermanagement/>}/>
        <Route path="/userForm/:ops" element={<AdminUser/>}/>
        <Route path="/userForm/:ops/:id" element={<AdminUser/>}/>
        <Route path="/qbManagement" element={<QbManagement/>}/>
        <Route path="/qbForm/:ops" element={<AdminQb/>}/>
        <Route path="/qbForm/:ops/:id" element={<AdminQb/>}/>
        <Route path="/jobManagement" element={<JobManagement/>}/>
        <Route path="/jobForm/:ops" element={<JobForm/>}/>
        <Route path="/jobForm/:ops/:id" element={<JobForm/>}/>
        <Route path='/CourseManagement' element={<CourseManagement/>}/>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
