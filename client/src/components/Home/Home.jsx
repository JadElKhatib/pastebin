import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

export const Home = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const navigate = useNavigate();
    const userDataDeletePaste = {
        username: user.username,
        password: user.password,
        pasteinfo: "",
        fullname: user.fullname,
        email: user.emailaddress,
    };

    const Edit = () => {
        navigate("/home/edit", { state: { user: user } });
    };

    const Delete = () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete your paste?"
        );
        if (isConfirmed) {
            fetch(`http://localhost:3000/users/${user.userid}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDataDeletePaste),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`error, status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(() => {
                    navigate("/home", {
                        state: {
                            user: {
                                ...user,
                                pasteinfo: userDataDeletePaste.pasteinfo,
                            },
                        },
                    });
                })
                .catch((err) => {
                    console.error("Failed to update user:", err);
                });
        }
    };

    return (
        <div className={styles.homeContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    <div className={styles.paste}>
                        {user.pasteinfo.split("\n").map((line, index) => {
                            return (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            );
                        })}
                    </div>
                    <button className={styles.editBtn} onClick={Edit}>
                        Edit
                    </button>
                    <button className={styles.deleteBtn} onClick={Delete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
