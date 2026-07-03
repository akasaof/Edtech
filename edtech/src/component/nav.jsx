import React, { useEffect, useState } from "react";
import img from "../assets/edtech.png"
import styles from "../pages/home.module.css"
import { useSelector } from "react-redux";
import { store } from "../redux/store";

function Nav() {
   
    const [records,setRecords] = useState({trophies:0,fire:0,dollar:0})
    useEffect(() => {
        setRecords({trophies:1000 + Math.ceil(Math.random() * 10),fire:100 + Math.ceil(Math.random() * 10),dollar:10 + Math.ceil(Math.random() * 10)})
    },[])
    return (
        <>
            <nav className="nav">
                <div style={{ height: "100%", width: "50%" }}>
                    <img src={img} style={{ height: "100%" }} />
                </div>
                <div className={styles.navEnd}>
                    <input onClick={() => console.log("Hello")} className="form-control" placeholder="Search for Python" style={{ borderRadius: "20px", width: "100%" }} />
                    <div className={styles.records}>
                        <div className="d-flex me-1">
                            {records.trophies}
                            <i class="bi bi-fire ms-1" style={{ color: "orange" }}></i>
                        </div>
                        <div className="d-flex me-1">
                            {records.dollar}
                            <i class="bi bi-coin ms-1" style={{ color: "goldenrod" }}></i>
                        </div>
                        <div className="d-flex me-1">
                            {records.fire}
                            <i class="bi bi-trophy ms-1" style={{ color: "goldenrod" }}></i>
                        </div>
                    </div>

                    <div className={styles.vline}></div>
                    <div className={styles.profile}>
                        <i class="bi bi-person-fill"></i>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Nav