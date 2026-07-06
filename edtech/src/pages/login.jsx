import React, { useEffect, useState } from "react";
import styles from "./login.module.css"
import logo from "../assets/edtech.png"
import { useNavigate } from "react-router";
import axios from "axios";
import { updateStatus } from "../redux/Silcers/userinfo";
import { useDispatch } from "react-redux";


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [status, setStatus] = useState(false)
    const [phone, setPhone] = useState()
    const [otp, setOtp] = useState()
    const [isAdmin, setAdmin] = useState(false)
    const [password, setPasskey] = useState("")

    useEffect(() => {
        console.log(isAdmin)
    }, [isAdmin])
    function handleSubmit(e) {
        e.preventDefault();
        if (phone && phone.length === 10) {
            console.log(phone)
            setStatus(true)
            axios.post("http://localhost:1000/otp", { number: phone })
                .then((result) => {
                    console.log(result)
                    if (result.data === "This phone number dosen't havn an account") {
                        alert(result.data)
                        setStatus(false)
                    }
                    else {
                        localStorage.setItem("token", result.data.token)
                        const role = result.data.result.role
                        console.log(role)
                        if (role === "Admin") {
                            setAdmin(true)
                        }
                    }

                })
        }
        else if (phone && phone.length !== 10) {
            alert("Enter a valid phone number")
        }
        else {
            alert("Phone Number cannot be empty")
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        const token = localStorage.getItem("token")
        console.log(otp)
        axios.post("http://localhost:1000/login", { password: otp, token })
            .then((result) => {
                if (result.data) {
                    console.log(result)
                    dispatch(updateStatus({ role: "student", token }))
                    sessionStorage.setItem("account",JSON.stringify({ role: "student", token }))
                    sessionStorage.setItem("page","Home")
                    navigate("/Home")
                }
                else{
                    alert("Incorrect OTP")
                }
            })
    }

    function handleAdminLogin(e) {
        e.preventDefault();
        console.log(password)
        const token = localStorage.getItem("token")
        console.log(token)
        axios.post("http://localhost:1000/login", { password, token })
            .then((result) => {
                console.log(result)
                if (result.data) {
                    console.log(result)
                    dispatch(updateStatus({ role: "Admin", token }))
                    sessionStorage.setItem("account",JSON.stringify({ role: "Admin", token }))
                    sessionStorage.setItem("page","userManagement")
                    navigate("/userManagement")
                }
                else{
                    alert("Incorrect Password")
                }
            })

    }
    return (
        <>
            <div className={styles.div1}>
                <div className={styles.div2Img} style={{ boxShadow: "0 0 20px black" }}>
                    <div onClick={()=>setStatus(false)} className={styles.div3}>
                        <img style={{ height: "100%", width: "100%" }} src="https://images-platform.99static.com/AgRPXCXjAQ9K2n2-ukGlEWizGhQ=/0x0:962x962/500x500/top/smart/99designs-contests-attachments/70/70481/attachment_70481369" />
                    </div>
                    <div className={`${styles.box} ${styles.box1}`}>
                        <div className={`${styles.around}`}>
                            <i class="bi bi-book"></i>
                        </div>
                        <h3>Interactive Courses</h3>
                        <p>Engage with dynamic, industry-relevant content</p>
                    </div>
                    <div className={`${styles.box} ${styles.box2}`}>
                        <div className={`${styles.around}`}>
                            <i class="bi bi-book"></i>
                        </div>
                        <h3>Interactive Courses</h3>
                        <p>Engage with dynamic, industry-relevant content</p>

                    </div>
                    <div className={`${styles.box} ${styles.box3}`}>
                        <div className={`${styles.around}`}>
                            <i class="bi bi-book"></i>
                        </div>
                        <h3>Interactive Courses</h3>
                        <p>Engage with dynamic, industry-relevant content</p>

                    </div>
                    <div className={`${styles.box} ${styles.box4}`}>
                        <div className={`${styles.around}`}>
                            <i class="bi bi-book"></i>
                        </div>
                        <h3>Interactive Courses</h3>
                        <p>Engage with dynamic, industry-relevant content</p>

                    </div>
                </div>
                <div className={styles.div2}>
                    <div className={styles.mobilediv}>
                        <img style={{ height: "100%", width: "100%" }} src={logo} />
                    </div>
                    <div className={styles.login}>
                        <h1>Where <span style={{ color: "orange" }}>Curiousity</span> Meets <span style={{ color: "navy" }}>Code</span></h1>
                        <form onSubmit={(e) => handleSubmit(e)} className={status ? styles.formHide : styles.form}>
                            <h1 style={{ color: "navy" }}>Login/Signup</h1>
                            <div className="d-flex flex-column" style={{ width: "80%" }}>
                                <label className="ms-2 fw-bold">Mobile Number</label>
                                <input onChange={(e) => setPhone(e.target.value)} placeholder="Enter Your Phone Number" type="tel" className="m-2 p-2 form-control" />
                                <button className="m-2 fw-bold form-control" style={{ backgroundColor: "orange" }} >Get OTP</button>
                            </div>
                        </form>
                        <form onSubmit={(e) => {
                            handleLogin(e)
                        }} className={status && !isAdmin ? styles.form2 : styles.formHide}>
                            <h1 style={{ color: "navy" }}>Login</h1>
                            <p className="text-center">We have sent a 4 digit OTP to your mobile number</p>
                            <div className="d-flex flex-column" style={{ width: "80%" }}>
                                <label className="ms-2 fw-bold">Enter the OTP</label>
                                <input onChange={(e) => setOtp(e.target.value)} placeholder="Enter the OTP" type="tel" className="m-2 p-2 form-control" />
                                <button className="m-2 fw-bold form-control" style={{ backgroundColor: "orange" }} >Login</button>
                            </div>
                        </form>
                        <form onSubmit={(e) => {
                            handleAdminLogin(e)
                        }} className={status && isAdmin ? styles.form2 : styles.formHide}>
                            <h1 style={{ color: "navy" }}>Login</h1>
                            <p className="text-center fw-bold">Enter Your Password</p>
                            <div className="d-flex flex-column" style={{ width: "80%" }}>
                                <label className="ms-2 fw-bold">Password</label>
                                <input onChange={(e) => setPasskey(e.target.value)} placeholder="Enter the Password" type="password" className="m-2 p-2 form-control" />
                                <button className="m-2 fw-bold form-control" style={{ backgroundColor: "orange" }} >Login</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login