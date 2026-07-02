import React, { useEffect, useState } from "react";
import Sidebar from "../component/sidebar";
import Nav from "../component/nav";
import styles from "./journey.module.css"
import axios from "axios";
import { useNavigate } from "react-router";

function Journey(){

    const [course,setCourse] = useState([])
    useEffect(()=>{
        console.log(course)
    },[course])
    useEffect(()=>{
        axios.get("http://localhost:1000/getData")
        .then((result)=>{
            setCourse(result.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    const navigate = useNavigate()

    function handleSubmit(index){
            console.log(index)
            sessionStorage.setItem("currentWeek",`Week-${index+1}`)
            localStorage.setItem("page","Home")
            navigate("/Home")
    }
    return(
        <>
        <Nav/>
        <div className={`${styles.mainDiv}`}>
            <Sidebar/>
            <div className={`${styles.courseDiv}`}>
               { course.map((item,index)=>{
                        return (
                            <>
                            <div onClick={()=>handleSubmit(index)} className={`${styles.course} m-5`}>
                                {item.title}
                            </div>
                            </>
                        )
                })}
            </div>
        </div>
        
        </>
    )
}

export default Journey