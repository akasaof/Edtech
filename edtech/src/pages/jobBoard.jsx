import React, { useEffect, useState } from "react";
import styles from "./jobBoard.module.css"
import Nav from "../component/nav";
import Sidebar from "../component/sidebar";
import oldStyles from "../pages/journey.module.css";
import axios from "axios";


function JobBoard() {
    const [jobs,setJob] = useState([])
    useEffect(()=>{
        async function getMethod(){
            const jobs = await axios.get("http://localhost:1000/jobBoard")
            setJob(jobs.data.jobs)
        }
        getMethod()
    },[])
    return (
        <>
            <Nav />
            <div className={`${styles.mainDiv}`}>
                <Sidebar />
                <div className={`${styles.courseDiv}`}>
                    {jobs.map((item, index) => {
                        return (
                            <>
                                <div  className={`${styles.course} m-5`}>
                                    <h3>Title:{item.jobTitle}</h3>
                                    <h4>Company:{item.jobComp}</h4>
                                    <p>{item.jobDesc}</p>
                                    <button className="btn btn-primary">Apply Now</button>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            
                
            
            
        </>
    )
}

export default JobBoard