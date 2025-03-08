import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Edit.module.css";
import { useState } from "react";

export const Edit = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: user.username,
        password: user.password,
        pasteinfo: user.pasteinfo,
        fullname: user.fullname,
        email: user.emailaddress,
    });

    const Save = () => {
        fetch(`http://localhost:3000/users/${user.userid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`error, status: ${res.status}`);
                }
                return res.json();
            })
            .then(() => {
                navigate("/home", {
                    state: { user: { ...user, pasteinfo: userData.pasteinfo } },
                });
            })
            .catch((err) => {
                console.error("Failed to update paste:", err);
            });
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.homeContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    <textarea
                        name="pasteinfo"
                        value={userData.pasteinfo}
                        className={styles.paste}
                        autoComplete="off"
                        onChange={handleChange}
                    />
                    <button className={styles.saveBtn} onClick={Save}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
