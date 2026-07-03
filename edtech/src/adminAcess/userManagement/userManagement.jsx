import { useState, useMemo, useEffect } from "react";
import Sidebar from "../../component/sidebar";
import Nav from "../../component/nav";
import styles from "../userManagement/userManagement.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router";



// Static placeholder data — step 2 replaces this with a real fetch to your backend.

function isPaid(fees) {
  return String(fees).toLowerCase() === "paid";
}

function RoleBadge({ role }) {
  const admin = role === "Admin";
  return (
    <span className={`${styles.badge} ${admin ? styles.badgePurple : styles.badgeBlue}`}>
      {role}
    </span>
  );
}

function FeesBadge({ fees }) {
  if (fees === "NA") {
    return (
      <span className={`${styles.badge} ${styles.badgeSuccess}`}>
        NA
      </span>
    )
  }
  const paid = isPaid(fees);
  return (
    <span className={`${styles.badge} ${paid ? styles.badgeSuccess : styles.badgeDanger}`}>
      {paid ? "Paid" : "Pending"}
    </span>
  );
}



export default function UserManagement() {
  const Navigate = useNavigate()
  const [usersList, setUser] = useState([])
  const token = localStorage.getItem("token")
  useEffect(() => {
    getUsers()
  }, [])
  const users = usersList;
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  


  async function handleDelete(id) {
    await axios.post("http://localhost:1000/User/delete", { account: id }, { headers: { authorization: token } })
    getUsers()
  }
  const getUsers = async () => {
    const result = await axios.post(
      "http://localhost:1000/User/get",
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );

    setUser(result.data.result);
  };
  async function handleUpdate(id){
    Navigate(`/userForm/update/${id}`)
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
                <h1>User management</h1>
                <p className={`${styles.subtext}`} style={{ fontSize: "large" }}>
                  {users.length} user{users.length === 1 ? "" : "s"}
                </p>
              </div>
              <button onClick={() => Navigate("/userForm/add")} type="button" className={`${styles.btnPrimary}`}>
                <span className={`${styles.iconPlus}`} aria-hidden="true">+</span> Add user
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
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Fees</th>
                    <th className={`${styles.actionsCol}`} style={{ textAlign: "right", marginRight: "30px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td className={`${styles.cellName}`}>{u.name}</td>
                      <td className={`${styles.cellPhone}`}>{u.phone}</td>
                      <td>
                        <RoleBadge role={u.role} />
                      </td>
                      <td>
                        <FeesBadge fees={u.Fees} />
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

              {users.length === 0 && (
                <p className={`${styles.emptyState}`}>
                  No users match your search. Try a different name or phone number.
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}