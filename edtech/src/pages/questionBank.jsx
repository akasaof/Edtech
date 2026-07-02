import React, { useEffect, useState } from "react";
import styles from "./qb.module.css"
import Nav from "../component/nav";
import Sidebar from "../component/sidebar";
import axios from "axios";

function QuestionBank() {
    const [questionBank, setQb] = useState([])
    const [filter, setFilter] = useState([])
    useEffect(() => {
        axios.get("http://localhost:1000/getqb")
            .then((result) => {
                console.log(result.data)
                setQb(result.data)
            })
    }, [])

    function handleFilter(e, index1) {
        console.log(e.target.checked)
        if (e.target.checked) {
            setFilter([...filter, `week-${index1 + 1}`])
            // axios.post(`http://localhost:1000/getfilterqb`,filter)
            //     .then((result) => {
            //         console.log(result)
            //     })
        }
        else {
            console.log(`week-${index1 + 1}`)
            const newArr = filter.filter((item, index2) => `week-${index1 + 1}` !== item)
            console.log(newArr)
            setFilter(newArr)
            // axios.post(`http://localhost:1000/getfilterqb`,filter)
            //     .then((result) => {
            //         console.log(result)
            //     })
        }


    }
    useEffect(() => {
        console.log(filter)
        if(filter.length==0){
            console.log(filter)
            axios.get("http://localhost:1000/getqb")
            .then((result) => {
                console.log(result.data)
                setQb(result.data)
            })
        }
        axios.post(`http://localhost:1000/getfilterqb`,filter)
                .then((result) => {
                    console.log(result)
                    setQb(result.data)
                })


    }, [filter])
    return (
        <>
            <Nav />
            <div className={`${styles.mainDiv}`}>
                <Sidebar />
                <div className={`${styles.courseDiv}`}>
                    <div style={{ width: "60vw" }}>
                        <ul>
                            {
                                questionBank.map((item, index) => {
                                    return (
                                        <>
                                            <li className={`${styles.list}`}>
                                                <p className="me-2 display-flex">{index + 1}</p>
                                                <p>{item.title}</p>
                                                <p>
                                                    {item.difficulty}
                                                </p>
                                            </li>
                                        </>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <div className={`${styles.filter}`}>
                        {
                            Array.from({ length: 12 }).map((item, index) => {
                                return (
                                    <>
                                        <div  key={index}>
                                            <input onChange={(e) => handleFilter(e, index)} id={`week-${index + 1}`} className="m-2" type="checkbox" />
                                            <label style={{cursor:"pointer"}} htmlFor={`week-${index + 1}`}>Week-{index + 1}</label>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionBank