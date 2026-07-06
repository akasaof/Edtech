import React, { useEffect, useState } from "react";
import styles from "../userManagement/userManagement.module.css"
import Nav from "../../component/nav";
import Sidebar from "../../component/sidebar";
import { useParams } from "react-router";
import axios from "axios";



function InputHead(arg) {
    const { arg1, arg2 } = arg
    const [resultObj, setObj] = useState({})
    console.log(arg)
}

function Create(arg1) {
    const operation = arg1.arg1
    console.log(operation)
    const [result,setResult] = useState("")
    if(operation==="weekNo" || operation==="title" || operation==="image"){
        useEffect(()=>{
            setResult("")
        },[])
        
    }
    else{
        useEffect(()=>{
            setResult([])
        },[])
    }
    console.log(result)
    const [value,setValue] = useState("")
    return (
        <>
            <div className="d-flex">
                <input onChange={(e)=>setValue(e.target.value)}/>
                <button onClick={(e)=>{
                    if(operation==="weekNo" || operation==="title" || operation==="image"){
                        setResult(value)
                    }
                    else{
                        setResult([...result,value])
                    }
                    console.log(result)
                }}  className="ms-2 p-2 btn btn-primary">{`Update ${operation}`}</button>
            </div>
        </>
    )
}

function AdminCourse() {
    const { ops, id } = useParams()
    console.log(id)
    const token = localStorage.getItem("token")
    const [course, setCourse] = useState({})
    console.log(Object.keys(course))
    console.log(course)
    useEffect(() => {
        if (id) {
            axios.post("http://localhost:1000/Admincourse/getbyid", { id }, { headers: { authorization: token } })
                .then((result) => {
                    console.log(result)
                    setCourse(result.data.result)
                })
        }
    }, [])
    if (ops === "Update") {
        console.log("Update")
        return (
            <>
                {<Nav />}
                <div className={`${styles.main}`} >
                    <Sidebar />
                    <div className={`${styles.mainTab}`}>
                        <div style={{ margin: "30px" }}>
                            <h1 className="fw-bold">{ops} Course</h1>
                            <div>
                                {Object.keys(course).map((item) => {
                                    if (item !== "videoa" && item !== "_id") {
                                        return (
                                            <>
                                                <div>
                                                    <h3>{item}</h3>
                                                    <InputHead arg1={item} arg2={course} />
                                                </div>
                                            </>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )

    }
    else {
        const [course, setCourse] = useState({ cheatsheets: [], exams: [], image: "", title: "", weekNo: "" })
        useEffect(() => {
            const token = localStorage.getItem("token")
            axios.post("http://localhost:1000/course/get", {}, { headers: { authorization: token } })
                .then((result) => {
                    console.log(result)
                    setCourse(result.data.result[0])
                })
        }, [])
        console.log(course)
        console.log("add")
        return (
            <>
                {<Nav />}
                <div className={`${styles.main}`} >
                    <Sidebar />
                    <div className={`${styles.mainTab}`}>
                        <div style={{ margin: "30px" }}>
                            <h1 className="fw-bold">{ops} Course</h1>
                            <div>
                                {Object.keys(course).map((item) => {
                                    if (item !== "videoa" && item !== "_id") {
                                        return (
                                            <>
                                                <div>
                                                    <h3>{item.toUpperCase()}</h3>
                                                    <Create arg1={item}/>
                                                    <InputHead arg1={item} arg2={course} />
                                                </div>
                                            </>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }

}
export default AdminCourse