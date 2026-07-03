import React, { useEffect } from "react";
import styles from "../pages/home.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { changeTab } from "../redux/Silcers/sampleSlice";
import { useSelector } from "react-redux";


function Sidebar() {
    const navigate = useNavigate()
    const [page, setPage] = useState(localStorage.getItem("page") ? localStorage.getItem("page") : "Home")
    const account = useSelector((store) => store.userInfo.account)
    console.log(account.role)
    if (account.role === "Admin") {
        return (
            <>
                <div className={`${styles.sidebar}`}>
                    <div onClick={() => {
                        setPage("Home")
                        localStorage.setItem("page", "Home")
                        sessionStorage.setItem("currentWeek", "Week-1")
                        navigate("/CourseManagement")
                    }} className={page === "Home" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                        <i class="bi bi-house-door m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                        <h6 style={{ color: "white", height: "100%" }}>Course Management</h6>
                    </div>
                    <div onClick={() => {
                        setPage("Journey")
                        localStorage.setItem("page", "Journey")
                        navigate("/userManagement")
                    }} className={page === "Journey" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                        <i class="bi bi-flag m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                        <h6 style={{ color: "white", height: "100%" }}>User Management</h6>
                    </div>
                    <div onClick={() => {
                        setPage("Question")
                        localStorage.setItem("page", "Question")
                        navigate("/qbManagement")
                    }} className={page === "Question" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                        <i class="bi bi-book m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                        <h6 style={{ color: "white", height: "100%" }}>Question Bank Management</h6>
                    </div>
                    <div onClick={() => {
                        setPage("job")
                        localStorage.setItem("page", "job")
                        navigate("/jobManagement")
                    }} className={page === "job" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                        <i class="bi bi-suitcase-lg m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                        <h6 style={{ color: "white", height: "100%" }}>Job Board Management</h6>
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
                    localStorage.setItem("page", "Home")
                    sessionStorage.setItem("currentWeek", "Week-1")
                    navigate("/Home")
                }} className={page === "Home" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                    <i class="bi bi-house-door m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                    <h6 style={{ color: "white", height: "100%" }}>Home</h6>
                </div>
                <div onClick={() => {
                    setPage("Journey")
                    localStorage.setItem("page", "Journey")
                    navigate("/journey")
                }} className={page === "Journey" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                    <i class="bi bi-flag m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                    <h6 style={{ color: "white", height: "100%" }}>Journey</h6>
                </div>
                <div onClick={() => {
                    setPage("Question")
                    localStorage.setItem("page", "Question")
                    navigate("/qb")
                }} className={page === "Question" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                    <i class="bi bi-book m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                    <h6 style={{ color: "white", height: "100%" }}>Question Bank</h6>
                </div>
                <div onClick={() => {
                    setPage("job")
                    localStorage.setItem("page", "job")
                    navigate("/jobBoard")
                }} className={page === "job" ? `${styles.sidebarItm} ${styles.active}` : `${styles.sidebarItm}`}>
                    <i class="bi bi-suitcase-lg m-2 mt-3" style={{ color: "white", fontSize: "large", height: "100%" }}></i>
                    <h6 style={{ color: "white", height: "100%" }}>Job Board</h6>
                </div>

            </div>
        </>
    )
}

export default Sidebar