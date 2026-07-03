import React, { useEffect } from "react";
import Nav from "../../component/nav";
import Sidebar from "../../component/sidebar";
import styles from "../userManagement/userManagement.module.css"
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";


function AdminQb() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { ops,id } = useParams()
    const [form, setForm] = useState({ title: "", week: "", difficulty: "Easy" })
    useEffect(()=>{
         if(id){
            axios.post("http://localhost:1000/Qb/getById",{id},{headers:{authorization:token}})
            .then((result)=>{
                console.log(result)
                setForm({title:result.data.result.title,week:result.data.result.week,difficulty:result.data.result.difficulty})
            })
         }
    },[])
    function handleSubmit() {
        if (ops === "add") {
            console.log(form)
            axios.post("http://localhost:1000/Qb/create", form, { headers: { authorization: token } })
                .then((result) => {
                    console.log(result)
                    navigate("/qbManagement")
                })
        }
        else{
            console.log(id)
            console.log(form)
            axios.post("http://localhost:1000/Qb/update",{id,changes:form}, { headers: { authorization: token } })
                .then((result) => {
                    console.log(result)
                    navigate("/qbManagement")
                })
        }
    }
    return (
        <>
            {<Nav />}
            <div className={`${styles.main}`} >
                <Sidebar />
                <div className={`${styles.mainTab}`}>
                    <div style={{ margin: "30px" }}>
                        <h1 className="fw-bold">{ops} Question</h1>

                        <label className={`${styles.field}`}>
                            Week
                            <input
                                type="text"
                                value={form.week}
                                onChange={(e) => setForm({ ...form, week: e.target.value })}
                                placeholder="Full name"

                            />
                        </label>

                        {<label className={`${styles.field}`}>
                            Title
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="10-digit phone number"
                                minLength={10}
                            />
                        </label>}
                        <label className={`${styles.field}`}>
                            Difficulty
                            <select value={form.difficulty}
                                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </label>
                        <div className={`${styles.modalActions}`}>
                            <button type="button" className={`${styles.btnPrimary}`}
                                onClick={handleSubmit}
                            >
                                {ops} question
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminQb