
import React, { useEffect, useState } from "react";
import styles from "./jobBoard.module.css"
import Nav from "../component/nav";
import Sidebar from "../component/sidebar";
import oldStyles from "../pages/journey.module.css";
import axios from "axios";


function JobBoard() {
    const [jobs, setJob] = useState([])
    useEffect(() => {
        async function getMethod() {
            const jobs = await axios.get("http://localhost:1000/jobBoard")
            setJob(jobs.data.jobs)
        }
        getMethod()
    }, [])
    return (
        <>
            <div className="pb-5">
                <Nav />
                <div className={`${styles.mainDiv}`}>
                    <Sidebar />
                    <div className={`${styles.courseDiv}`}>
                        <div className={`${styles.head}`}>
                            <h1 className={`${styles.pageTitle} fw-bold`}>Job Board</h1>
                            <span className={`${styles.resultCount}`}>{jobs.length} open role{jobs.length === 1 ? "" : "s"}</span>
                        </div>
                        <div className={`${styles.grid}`}>
                            {jobs.map((item, index) => {
                                return (
                                    <div className={`${styles.course}`} key={index}>
                                        <div className={`${styles.cardTop}`}>
                                            <div className={`${styles.logo}`}>
                                                {item.jobComp ? item.jobComp.charAt(0).toUpperCase() : "?"}
                                            </div>
                                            <div className={`${styles.cardTopText}`}>
                                                <h3 className={`${styles.jobTitle}`}>{item.jobTitle}</h3>
                                                <h4 className={`${styles.jobComp}`}>{item.jobComp}</h4>
                                            </div>
                                        </div>
                                        <p className={`${styles.jobDesc}`}>{item.jobDesc}</p>
                                        <button className={`${styles.applyBtn}`}>Apply Now</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default JobBoard