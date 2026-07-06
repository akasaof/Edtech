import React, { useEffect, useState } from "react";
import Sidebar from "../component/sidebar";
import Nav from "../component/nav";
import styles from "./journey.module.css"
import axios from "axios";
import { useNavigate } from "react-router";
import Deployment from "../uploads/Deployment.png"

function Journey() {

    const [course, setCourse] = useState([])
    useEffect(() => {
        console.log(course)
    }, [course])
    useEffect(() => {
        axios.get("http://localhost:1000/getData")
            .then((result) => {
                setCourse(result.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    const navigate = useNavigate()

    function handleSubmit(index) {
        console.log(index)
        sessionStorage.setItem("currentWeek", `Week-${index + 1}`)
        sessionStorage.setItem("page", "Home")
        navigate("/Home")
    }
    return (
        <>
            <div className="pb-5">
                <Nav />
                <div className={`${styles.mainDiv}`}>
                    <Sidebar />
                    <div className={`${styles.courseDiv}`}>
                        {course.map((item, index) => {
                            return (
                                <>
                                    <div onClick={() => handleSubmit(index)} className={`${styles.course} m-5 fw-bold`}>
                                        <img src={`http://localhost:1000/uploads/${item.image}`} style={{ height: "13vh" }} />
                                        {item.title}
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>

            </div>


        </>
    )
}

export default Journey