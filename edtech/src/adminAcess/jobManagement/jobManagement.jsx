import React from "react";
import { useState, useMemo, useEffect } from "react";
import Sidebar from "../../component/sidebar";
import Nav from "../../component/nav";
import styles from "../QbManagement/qbManagement.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router";





function JobManagement() {
    const [jobList, setJobList] = useState([])
    const [search,setSearch] = useState("")
    const [searchList,setSearchList] = useState([])
    const Navigate = useNavigate()
    useEffect(() => {
        getJob()
    }, [])
    useEffect(() => {
        console.log(jobList)
    }, [jobList])
    function getJob() {
        const token = localStorage.getItem("token")
        axios.post("http://localhost:1000/JobBoard/get", {}, { headers: { authorization: token } })
            .then((result) => {
                console.log(result.data.result)
                setJobList(result.data.result)
            })
    }
    async function handleDelete(id) {
        const token = localStorage.getItem("token")
        await axios.post("http://localhost:1000/JobBoard/delete", { id }, { headers: { authorization: token } })
        getJob()
    }
    async function handleUpdate(id){
           Navigate(`/jobForm/Update/${id}`)
    }
    console.log(search)
    useEffect(() => {
            const list = jobList.filter((item) => {
                if (item.jobTitle.toLowerCase().includes(search.toLowerCase())) {
                    return item
                }
            })
            setSearchList(list)
            console.log(list)
            console.log(search)
        }, [search])
    return (
        <>
            {<Nav />}
            <div className={`${styles.main}`} >
                <Sidebar />
                <div className={`${styles.mainTab}`}>
                    <div style={{ margin: "30px" }} className={`${styles.userMgmt}`}>
                        <div className={`${styles.userMgmtHeader}`}>
                            <div>
                                <h1>Job management</h1>
                                <p className={`${styles.subtext}`} style={{ fontSize: "large" }}>
                                    {jobList.length} user{jobList.length === 1 ? "" : "s"}
                                </p>
                            </div>
                            <button onClick={() => Navigate("/jobForm/Add")} type="button" className={`${styles.btnPrimary}`}>
                                <span className={`${styles.iconPlus}`} aria-hidden="true">+</span> Add Job
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
                                        <th>Company</th>
                                        <th>Role</th>
                                        <th>Count</th>
                                        <th className={`${styles.actionsCol}`} style={{ textAlign: "right", marginRight: "30px" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {search===""&&jobList.map((u) => (
                                        <tr key={u._id}>
                                            <td className={`${styles.cellName}`}>{u.jobComp}</td>
                                            <td className={`${styles.cellPhone}`}>{u.jobTitle}</td>
                                            <td className={`${styles.cellPhone}`}>{u.count}</td>
                                            <td className={`${styles.actionsCol}`}>
                                                <button
                                                    onClick={(e) => handleUpdate(u._id)} 
                                                    type="button" className={`${styles.iconBtn}`}>
                                                    Edit
                                                </button>
                                                <button
                                                     onClick={(e) => handleDelete(u._id)} 
                                                    type="button" className={`${styles.iconBtn} ${styles.iconBtnDanger}`}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {search!==""&&searchList.map((u) => (
                                        <tr key={u._id}>
                                            <td className={`${styles.cellName}`}>{u.jobComp}</td>
                                            <td className={`${styles.cellPhone}`}>{u.jobTitle}</td>
                                            <td className={`${styles.cellPhone}`}>{u.count}</td>
                                            <td className={`${styles.actionsCol}`}>
                                                <button
                                                    onClick={(e) => handleUpdate(u._id)} 
                                                    type="button" className={`${styles.iconBtn}`}>
                                                    Edit
                                                </button>
                                                <button
                                                     onClick={(e) => handleDelete(u._id)} 
                                                    type="button" className={`${styles.iconBtn} ${styles.iconBtnDanger}`}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {jobList.length === 0 && (
                                <p className={`${styles.emptyState}`}>
                                    No jobList match your search. Try a different name or phone number.
                                </p>
                            )}
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default JobManagement