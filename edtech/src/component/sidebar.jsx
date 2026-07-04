import React, { useEffect } from "react";
import styles from "../pages/home.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { changeTab } from "../redux/Silcers/sampleSlice";
import { useSelector } from "react-redux";


function Sidebar() {
    const navigate = useNavigate()
    const [page, setPage] = useState(sessionStorage.getItem("page") ? sessionStorage.getItem("page") : "Home")
    const account = useSelector((store) => store.userInfo.account)
    console.log(account.role)

    // useEffect(()=>{
    //     navigate(`/${page}`)
    // },[])
    if (account.role === "Admin") {
        return (
            <>
                <div className={`${styles.sidebar}`}>
                    <div onClick={() => {
                        setPage("CourseManagement")
                        sessionStorage.setItem("page", "CourseManagement")
                        navigate("/CourseManagement")
                    }} className={page === "CourseManagement" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                        <i class="bi bi-house-door m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                        <h6 style={{ color: "white", height: "100%" }}>Course Management</h6>
                    </div>
                    <div onClick={() => {
                        setPage("userManagement")
                        sessionStorage.setItem("page", "userManagement")
                        navigate("/userManagement")
                    }} className={page === "userManagement" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                        <i class="bi bi-flag m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                        <h6 style={{ color: "white", height: "100%" }}>User Management</h6>
                    </div>
                    <div onClick={() => {
                        setPage("qbManagement")
                        sessionStorage.setItem("page", "qbManagement")
                        navigate("/qbManagement")
                    }} className={page === "qbManagement" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                        <i class="bi bi-book m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                        <h6 style={{ color: "white", height: "100%" }}>Question Bank Management</h6>
                    </div>
                    <div onClick={() => {
                        setPage("jobManagement")
                        sessionStorage.setItem("page", "jobManagement")
                        navigate("/jobManagement")
                    }} className={page === "jobManagement" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                        <i class="bi bi-suitcase-lg m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                        <h6 style={{ color: "white", height: "100%" }}>Job Board Management</h6>
                    </div>
                    <div onClick={() => {
                        sessionStorage.clear()
                        navigate("/")
                    }} className={styles.sidebarItm}>
                        <i class="bi bi-box-arrow-right m-2 mt-3" style={{ color: "white", fontSize: "22px", height: "100%" }}></i>
                        <h6 style={{ color: "white", height: "100%" }}>Log Out</h6>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className={`${styles.sidebar}`}>
                <div onClick={() => {
                    setPage("Home")
                    sessionStorage.setItem("page", "Home")
                    sessionStorage.setItem("currentWeek", "Week-1")
                    navigate("/Home")
                }} className={page === "Home" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                    <i class="bi bi-house-door m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                    <h6 style={{ color: "white", height: "100%" }}>Home</h6>
                </div>
                <div onClick={() => {
                    setPage("journey")
                    sessionStorage.setItem("page", "journey")
                    navigate("/journey")
                }} className={page === "journey" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                    <i class="bi bi-flag m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                    <h6 style={{ color: "white", height: "100%" }}>Journey</h6>
                </div>
                <div onClick={() => {
                    setPage("qb")
                    sessionStorage.setItem("page", "qb")
                    navigate("/qb")
                }} className={page === "qb" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                    <i class="bi bi-book m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                    <h6 style={{ color: "white", height: "100%" }}>Question Bank</h6>
                </div>
                <div onClick={() => {
                    setPage("jobBoard")
                    sessionStorage.setItem("page", "jobBoard")
                    navigate("/jobBoard")
                }} className={page === "jobBoard" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                    <i class="bi bi-suitcase-lg m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                    <h6 style={{ color: "white", height: "100%" }}>Job Board</h6>
                </div>
                <div onClick={() => {
                    sessionStorage.clear()
                    navigate("/")
                }} className={styles.sidebarItm}>
                    <i class="bi bi-box-arrow-right m-2 mt-3" style={{ color: "white", fontSize: "22px", height: "100%" }}></i>
                    <h6 style={{ color: "white", height: "100%" }}>Log Out</h6>
                </div>
            </div>
        </>
    )
}

export default Sidebar