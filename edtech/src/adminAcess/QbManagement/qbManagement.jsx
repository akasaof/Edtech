import React from "react";
import styles from "./qbManagement.module.css"
import Nav from "../../component/nav";
import Sidebar from "../../component/sidebar";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

function DifficultyBadge(difficulty) {
    if (difficulty.difficulty === "Hard") {
        return (
            <span style={{ color: "red" }}>Hard</span>
        )
    }
    else if (difficulty.difficulty === "Medium") {
        return (
            <span style={{ color: "gold" }}>Medium</span>
        )
    }
    else {
        return (
            <span style={{ color: "green" }}>Easy</span>
        )
    }
}


function QbManagement() {
    const Navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [search, setSearch] = useState("");
    const [searchList,setSearchList] = useState([])
    console.log(search)
    const [roleFilter, setRoleFilter] = useState("all");
    const [qbs, setQb] = useState([])
    function getQb() {
        const token = localStorage.getItem("token")
        axios.post("http://localhost:1000/Qb/get", {}, { headers: { authorization: token } })
            .then((result) => {
                console.log(result.data)
                setQb(result.data.result)
            })
    }
    useEffect(() => {
        getQb()
    }, [])

    async function handleDelete(id) {
        await axios.post("http://localhost:1000/Qb/delete", { id }, { headers: { authorization: token } })
        getQb()
    }
    async function handleUpdate(id){
           Navigate(`/qbForm/Update/${id}`)
  }
    useEffect(() => {
            const list = qbs.filter((item) => {
                if (item.title.toLowerCase().includes(search.toLowerCase())) {
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
                                <h1>Question Bank management</h1>
                                <p className={`${styles.subtext}`} style={{ fontSize: "large" }}>
                                    {qbs.length} question{qbs.length === 1 ? "" : "s"}
                                </p>
                            </div>
                            <button onClick={() => Navigate("/qbForm/Add")} type="button" className={`${styles.btnPrimary}`}>
                                <span className={`${styles.iconPlus}`} aria-hidden="true">+</span> Add Question
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
                                        <th>Difficulty</th>
                                        <th className={`${styles.actionsCol}`} style={{ textAlign: "right", marginRight: "30px" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {search===""&&qbs.map((u) => (
                                        <tr key={u._id}>
                                            <td className={`${styles.cellName}`}>{u.week}</td>
                                            <td style={{ color: "black" }} className={`${styles.cellPhone}`}>{u.title}</td>
                                            <td>
                                                <DifficultyBadge difficulty={u.difficulty} />
                                            </td>
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
                                    {search!==""&&searchList.map((u) => (
                                        <tr key={u._id}>
                                            <td className={`${styles.cellName}`}>{u.week}</td>
                                            <td style={{ color: "black" }} className={`${styles.cellPhone}`}>{u.title}</td>
                                            <td>
                                                <DifficultyBadge difficulty={u.difficulty} />
                                            </td>
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

                            {qbs.length === 0 && (
                                <p className={`${styles.emptyState}`}>
                                    No qbs match your search. Try a different name or phone number.
                                </p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default QbManagement