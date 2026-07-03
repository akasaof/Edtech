import React, { useEffect } from "react";
import Nav from "../../component/nav";
import Sidebar from "../../component/sidebar";
import styles from "../userManagement/userManagement.module.css"
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";



function AdminUser() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("Student");
    const [fees, setFees] = useState("Pending");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState(0);
    const { ops,id } = useParams()
    const token = localStorage.getItem("token")
    const Navigate = useNavigate()
    const handleSubmit = () => {
        if (ops === "add") {
            if (phone.length === 10 && name !== "") {
                const newUser = {
                    name,
                    phone,
                    role,
                    Fees: fees,
                    ...(role === "Admin" ? { password } : { otp }),
                };
                console.log(newUser)
                axios.post("http://localhost:1000/User/create", { account: newUser }, { headers: { Authorization: token } })
                    .then((result) => {
                        if (result.data === "Account already exist") {
                            alert("Phone Number exist")
                        }
                        else {
                            Navigate("/userManagement")
                        }

                    })
            }
            else {
                alert("Error fill the form properly")
            }
        }
        else{
            console.log(id, ops)
            if(name!==""){
                const newUser = {
                    name,
                    Fees: fees,
                };
                console.log(newUser)
                axios.post("http://localhost:1000/User/update",{id,changes:newUser},{headers:{authorization:token}})
                .then((result)=>{
                    console.log(result)
                    Navigate("/userManagement")
                })
            }
            else{
                alert("Enter a name")
            }
        }
    };
    return (

        <>
            {<Nav />}
            <div className={`${styles.main}`} >
                <Sidebar />
                <div className={`${styles.mainTab}`}>
                    <div style={{ margin: "30px" }}>
                        <h1>{ops} user</h1>

                        <label className={`${styles.field}`}>
                            Name
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full name"

                            />
                        </label>

                        {ops!=="update" && <label className={`${styles.field}`}>
                            Phone
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="10-digit phone number"
                                minLength={10}
                            />
                        </label>}

                        {/* <label className={`${styles.field}`}>
                            Role
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="Student">Student</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </label> */}

                        <label className={`${styles.field}`}>
                            Fees status
                            <select value={fees} onChange={(e) => setFees(e.target.value)}>
                                <option value="Paid">Paid</option>
                                <option value="Pending">Pending</option>
                                {/* <option value="NA">Admin</option> */}
                            </select>
                        </label>

                        {/* {role === "Admin" && (
                            <label className={`${styles.field}`}>
                                Password
                                <input
                                    type="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Login password"
                                />
                            </label>
                        ) 
                        } */}

                        <div className={`${styles.modalActions}`}>
                            <button type="button" className={`${styles.btnPrimary}`} onClick={handleSubmit}>
                                {ops} user
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default AdminUser