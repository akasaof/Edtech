import React, { useEffect, useState } from "react";
import styles from "./qb.module.css"
import Nav from "../component/nav";
import Sidebar from "../component/sidebar";
import axios from "axios";

function difficultyClass(level) {
    const l = (level || "").toString().toLowerCase()
    if (l.includes("easy")) return styles.easy
    if (l.includes("medium")) return styles.medium
    if (l.includes("hard")) return styles.hard
    return styles.neutral
}

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
        if (filter.length == 0) {
            console.log(filter)
            axios.get("http://localhost:1000/getqb")
                .then((result) => {
                    console.log(result.data)
                    setQb(result.data)
                })
        }
        axios.post(`http://localhost:1000/getfilterqb`, filter)
            .then((result) => {
                console.log(result)
                setQb(result.data)
            })


    }, [filter])
    return (
        <>
            <div style={{paddingBottom:"100px"}} className="pb-7">
                <Nav />
                <div className={`${styles.mainDiv}`}>
                    <Sidebar />
                    <div className={`${styles.courseDiv}`}>
                        <div className={`${styles.listPanel}`}>
                            <div className={`${styles.listHead}`}>
                                <h1 className={`${styles.pageTitle} fw-bold`}>Question Bank</h1>
                                <span className={`${styles.resultCount}`}>{questionBank.length} question{questionBank.length === 1 ? "" : "s"}</span>
                            </div>
                            <ul className={`${styles.qList}`}>
                                {
                                    questionBank.map((item, index) => {
                                        return (
                                            <li className={`${styles.list}`} key={index}>
                                                <span className={`${styles.qIndex}`}>{index + 1}</span>
                                                <p className={`${styles.qTitle}`}>{item.title}</p>
                                                <span className={`${styles.qDifficulty} ${difficultyClass(item.difficulty)}`}>
                                                    {item.difficulty}
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <div className={`${styles.filter}`}>
                            <h2 className={`${styles.filterTitle} fw-bold`}>Filter by week</h2>
                            <div className={`${styles.filterChips}`}>
                                {
                                    Array.from({ length: 12 }).map((item, index) => {
                                        return (
                                            <div className={`${styles.chip}`} key={index}>
                                                <input onChange={(e) => handleFilter(e, index)} id={`week-${index + 1}`} className={`${styles.chipInput}`} type="checkbox" />
                                                <label className={`${styles.chipLabel}`} htmlFor={`week-${index + 1}`}>Week-{index + 1}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default QuestionBank