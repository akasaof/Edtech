import React, { useEffect } from "react";
import Nav from "../../component/nav";
import Sidebar from "../../component/sidebar";
import styles from "../userManagement/userManagement.module.css"
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

function JobForm() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { ops, id } = useParams()
    const [form, setForm] = useState({ jobTitle: "", jobDesc: "", jobComp: "",count:0 })
    useEffect(()=>{
        console.log(id)
         if(id){
            axios.post("http://localhost:1000/JobBoard/getById",{id},{headers:{authorization:token}})
            .then((result)=>{
                console.log(result)
                setForm({jobTitle:result.data.result.jobTitle,jobDesc:result.data.result.jobDesc,jobComp:result.data.result.jobComp})
            })
        }
    },[])
    function handleSubmit() {
        if (ops.toLowerCase() === "add") {
            console.log(form)
            axios.post("http://localhost:1000/JobBoard/create", form, { headers: { authorization: token } })
                .then((result) => {
                    console.log(result)
                    navigate("/jobManagement")
                })
        }
        else{
            console.log(id)
            console.log(form)
            axios.post("http://localhost:1000/JobBoard/update",{id,changes:form}, { headers: { authorization: token } })
                .then((result) => {
                    console.log(result)
                    navigate("/jobManagement")
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
                        <h1 className="fw-bold">{ops} Job</h1>

                        <label className={`${styles.field}`}>
                            Job Title
                            <input
                                type="text"
                                value={form.jobTitle}
                                onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                                placeholder="Enter the Job title"

                            />
                        </label>

                        <label className={`${styles.field}`}>
                            Job Description
                            {/* <input
                                type="text"
                                value={form.jobDesc}
                                onChange={(e) => setForm({ ...form, jobDesc: e.target.value })}
                                placeholder="Describe the job"
                                minLength={10}
                            /> */}
                        </label>
                        <textarea
                            type="text"
                            value={form.jobDesc}
                            onChange={(e) => setForm({ ...form, jobDesc: e.target.value })}
                            placeholder="Describe the job"
                            rows={5}
                            style={{width:"100%",borderRadius:"5px"}}
                            className="p-3"
                            >

                            </textarea>
                        <label className={`${styles.field}`}>
                            Company
                            <input
                                type="text"
                                value={form.jobComp}
                                onChange={(e) => setForm({ ...form, jobComp: e.target.value })}
                                placeholder="Enter the company name"
                                minLength={10}
                            />
                        </label>
                        <div className={`${styles.modalActions}`}>
                            <button type="button" className={`${styles.btnPrimary}`}
                                onClick={()=>handleSubmit()}
                            >
                                {ops} job 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobForm