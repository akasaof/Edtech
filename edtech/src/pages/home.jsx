// import React, { useEffect, useState } from "react";
// import styles from "./home.module.css"
// import img from "../assets/edtech.png"
// import Nav from "../component/nav";
// import Sidebar from "../component/sidebar";
// import { BrowserRouter, Route, Routes } from "react-router";
// import Homedummy from "./dummy";
// import axios from "axios";
// import { Link } from "react-router";

// function Home() {

//     const [page, setPage] = useState(localStorage.getItem("page") ? localStorage.getItem("page") : "")
//     const [status, setStatus] = useState(false)
//     const [currentWeek, setWeek] = useState(sessionStorage.getItem("currentWeek") ? sessionStorage.getItem("currentWeek") : "Week-1")
//     useEffect(() => {
//         sessionStorage.setItem("currentWeek", currentWeek)
//     }, [currentWeek])

//     console.log(currentWeek.split("-")[1])
//     const [courses, setCourse] = useState({})
//     const [arr2, setArr] = useState([])

    
    
//     useEffect(() => {
//         console.log(courses)
//         const { cheatsheets, exams, videos } = courses
//         setArr([videos,cheatsheets, exams])
//         console.log(arr2)

//     }, [courses])

//     useEffect(()=>{
//         console.log(arr2)
//     },[arr2])

//     useEffect(() => {
//         console.log(currentWeek)
//         axios.get(`http://localhost:1000/getData/${currentWeek}`)
//             .then(async (result) => {
//                 console.log(result.data[0])
//                 await setCourse(result.data[0])
//             })
//             .catch(() => {
//                 console.log("Error")
//             })
//     }, [currentWeek])
//     // let arr1 = Array.from({ length: 12 })



//     let [arr1,setArr1] = useState([])
//     useEffect(()=>{
//         getData()
//     },[])
//     function getData(){
//         axios.get("http://localhost:1000/getData")
//         .then((result)=>{
//             console.log(result)
//             setArr1(result.data)
//         })
//     }

//     return (
//         <>
//             {<Nav />}
//             <div className={`${styles.main}`} >
//                 <Sidebar />
//                 <div onClick={() => { status ? setStatus(!status) : "" }} className={`${styles.mainTab}`}>
//                     <div className={`${styles.mainHead}`}>
//                         <h1 className="fw-bold">Your shedule</h1>
//                         <div onClick={() => { setStatus(!status) }} className={`${styles.week} fw-bold`}>
//                             {currentWeek}
//                             <i class="fw-bold bi bi-chevron-down ms-3"></i>
//                         </div>
//                         <div className={status ? `${styles.weeklist}` : `${styles.weeklist} ${styles.weeklistHide}`}>
//                             {arr1.map((item, index) => {
//                                 return (
//                                     <>
//                                         <div onClick={() => setWeek(`Week-${index + 1}`)} className={Number(currentWeek.split("-")[1]) === index + 1 ? `${styles.weekDiv} ${styles.weekA}` : `${styles.weekDiv}`}>
//                                             Week- {index + 1}
//                                         </div>
//                                     </>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                     <div className={`${styles.mainBody}`}>
//                         <h1 className="fw-bold text-center">{courses.title}</h1>
//                         <div class="accordion" id="accordionPanelsStayOpenExample">
//                             {arr2.map((item, index) => {
//                                 console.log(item)
//                                 return (
//                                     <>
//                                         <div class="accordion-item">
//                                             <h2 class="accordion-header">
//                                                 <button class=" fw-bold text-center accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${index}`} aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
//                                                      {(index === 0 && `Videos` || (index === 1 && 'Cheatsheets') || (index === 2 && 'Exams'))}
//                                                 </button>
//                                             </h2>
//                                             <div id={`panelsStayOpen-collapse${index}`} class="accordion-collapse collapse">
//                                                 <div class="accordion-body">
//                                                     <ul>
//                                                         {item && item.map((value,index)=>{
//                                                              return(<li className={`${styles.list}`}><Link to="">{value}</Link>
                                                             
//                                                              </li>)
//                                                         })}
                                                       
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                     </>
//                                 )
//                             })}


//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default Home 








import React, { useEffect, useState } from "react";
import styles from "./home.module.css"
import img from "../assets/edtech.png"
import Nav from "../component/nav";
import Sidebar from "../component/sidebar";
import { BrowserRouter, Route, Routes } from "react-router";
import Homedummy from "./dummy";
import axios from "axios";
import { Link } from "react-router";

const sectionMeta = [
    { label: "Videos", icon: "bi-play-circle-fill" },
    { label: "Cheatsheets", icon: "bi-file-earmark-text-fill" },
    { label: "Exams", icon: "bi-patch-check-fill" },
]

function Home() {

    const [page, setPage] = useState(localStorage.getItem("page") ? localStorage.getItem("page") : "")
    const [status, setStatus] = useState(false)
    const [currentWeek, setWeek] = useState(sessionStorage.getItem("currentWeek") ? sessionStorage.getItem("currentWeek") : "Week-1")
    useEffect(() => {
        sessionStorage.setItem("currentWeek", currentWeek)
    }, [currentWeek])

    console.log(currentWeek.split("-")[1])
    const [courses, setCourse] = useState({})
    const [arr2, setArr] = useState([])



    useEffect(() => {
        console.log(courses)
        const { cheatsheets, exams, videos } = courses
        setArr([videos, cheatsheets, exams])
        console.log(arr2)

    }, [courses])

    useEffect(() => {
        console.log(arr2)
    }, [arr2])

    useEffect(() => {
        console.log(currentWeek)
        axios.get(`http://localhost:1000/getData/${currentWeek}`)
            .then(async (result) => {
                console.log(result.data[0])
                await setCourse(result.data[0])
            })
            .catch(() => {
                console.log("Error")
            })
    }, [currentWeek])
    // let arr1 = Array.from({ length: 12 })



    let [arr1, setArr1] = useState([])
    useEffect(() => {
        getData()
    }, [])
    function getData() {
        axios.get("http://localhost:1000/getData")
            .then((result) => {
                console.log(result)
                setArr1(result.data)
            })
    }

    return (
        <>
            {<Nav />}
            <div className={`${styles.main}`} >
                <Sidebar />
                <div className={`${styles.mainTab}`} onClick={() => { status ? setStatus(!status) : "" }}>
                    <div className={`${styles.mainHead}`}>
                        <h1 className={`${styles.pageTitle} fw-bold`}>Your shedule</h1>
                        <div onClick={() => { setStatus(!status) }} className={`${styles.week} fw-bold`}>
                             {currentWeek}
                           <i class="fw-bold bi bi-chevron-down ms-3"></i>
                        </div>
                        <div className={status ? `${styles.weeklist}` : `${styles.weeklist} ${styles.weeklistHide}`}>
                            {arr1.map((item, index) => {
                                return (
                                    <>
                                        <div onClick={() => setWeek(`Week-${index + 1}`)} className={Number(currentWeek.split("-")[1]) === index + 1 ? `${styles.weekDiv} ${styles.weekA}` : `${styles.weekDiv}`}>
                                            Week- {index + 1}
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                    <div className={`${styles.mainBody}`}>
                        <h1 className={`${styles.courseTitle} fw-bold text-center`}>{courses.title}</h1>
                        <div className={`${styles.sections}`}>
                            {arr2.map((item, index) => {
                                const meta = sectionMeta[index] || { label: "", icon: "bi-collection" }
                                return (
                                    <div className={`${styles.section}`} key={index}>
                                        <div className={`${styles.sectionHead}`}>
                                            <div className={`${styles.sectionIcon}`}>
                                                <i className={`bi ${meta.icon}`}></i>
                                            </div>
                                            <h2 className={`${styles.sectionTitle} fw-bold`}>{meta.label}</h2>
                                            <span className={`${styles.sectionCount}`}>{item ? item.length : 0} item{item && item.length === 1 ? "" : "s"}</span>
                                        </div>
                                        <ul className={`${styles.itemsList}`}>
                                            {item && item.map((value, i) => {
                                                return (
                                                    <li className={`${styles.list}`} key={i}>
                                                        <Link to="" className={`${styles.itemLink}`}>
                                                            <span className={`${styles.itemLeft}`}>
                                                                <i className={`bi ${meta.icon} ${styles.itemIcon}`}></i>
                                                                {value}
                                                            </span>
                                                            <i className={`bi bi-chevron-right ${styles.itemArrow}`}></i>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home