import React, { useEffect, useState } from "react";
import Sidebar from "../../component/sidebar";
import styles from "./courseManagement.module.css"
import Nav from "../../component/nav";
import axios from "axios";

function CourseManagement() {
    const [courses, setCourses] = useState([])
    const [search,setSearch] = useState([])
    function getCourses() {
        const token = localStorage.getItem("token")
        axios.post("http://localhost:1000/course/get", {}, { headers: { authorization: token } })
            .then((result) => {
                console.log(result)
                setCourses(result.data.result)
            })
    }
    useEffect(() => {
        getCourses()
    }, [])

    async function handleDelete(id) {
        const token = localStorage.getItem("token")
        await axios.post("http://localhost:1000/course/delete", { id }, { headers: { authorization: token } })
        getCourses()
    }
    return (
        <>
            {<Nav />}
            <div className={`${styles.main}`} >
                <Sidebar />
                <div className={`${styles.mainTab}`}>
                    <div style={{ margin: "30px" }} className={`${styles.userMgmt}`}>
                        <div className={`${styles.userMgmtHeader}`}>
                            <div>
                                <h1>Courses Management</h1>
                                <p className={`${styles.subtext}`} style={{ fontSize: "large" }}>
                                    {courses.length} Course{courses.length === 1 ? "" : "s"}
                                </p>
                            </div>
                            <button onClick={() => Navigate("/qbForm/Add")} type="button" className={`${styles.btnPrimary}`}>
                                <span className={`${styles.iconPlus}`} aria-hidden="true">+</span> Add Course
                            </button>
                        </div>

                        <div className={`${styles.userMgmtControls}`}>
                            <input
                                type="text"
                                className={`${styles.searchInput}`}
                                placeholder="Search by name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className={`${styles.tableWrap}`}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Week</th>
                                        <th>Title</th>
                                        <th>Videos</th>
                                        <th>Cheatsheet</th>
                                        <th>Exams</th>
                                        <th className={`${styles.actionsCol}`} style={{ textAlign: "right", marginRight: "30px" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((u) => (
                                        <tr key={u._id}>
                                            <td className={`${styles.cellName}`}>{u.weekNo}</td>
                                            <td style={{ color: "black" }} className={`${styles.cellPhone}`}>{u.title}</td>
                                            <td style={{ color: "black" }} className={`${styles.cellPhone}`}>{u.videos.length}</td>
                                            <td style={{ color: "black" }} className={`${styles.cellPhone}`}>{u.cheatsheets.length}</td>
                                             <td style={{ color: "black" }} className={`${styles.cellPhone}`}>{u.exams.length}</td>
                                            <td className={`${styles.actionsCol}`}>
                                                <button onClick={(e) => handleUpdate(u._id)} type="button" className={`${styles.iconBtn}`}>
                                                    Edit
                                                </button>
                                                <button onClick={(e) => handleDelete(u._id)} type="button" className={`${styles.iconBtn} ${styles.iconBtnDanger}`}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {courses.length === 0 && (
                                <p className={`${styles.emptyState}`}>
                                    No courses match your search. Try a different name or phone number.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseManagement