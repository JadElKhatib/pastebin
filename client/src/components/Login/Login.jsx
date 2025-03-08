import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState("");
    const navigate = useNavigate();

    const Login = () => {
        fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then((users) => {
                const user = users.find(
                    (u) => u.username === username && u.password === password
                );
                if (user) {
                    navigate("/home", { state: { user: user } });
                } else {
                    setNotification("Username or Password is incorrect");
                }
            })
            .catch((error) => console.error("Error fetching users: ", error));
    };

    const SignUp = () => {
        navigate("/signup");
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    <h1 className={styles.stretch}>SPACEBIN</h1>
                    <div>
                        <input
                            placeholder="Username"
                            className={styles.loginInput}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Password"
                            type="password"
                            className={styles.loginInput}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.links}>
                        <span>Forgot Password</span>
                        <span onClick={SignUp}>Sign up</span>
                    </div>
                    <button className={styles.loginBtn} onClick={Login}>
                        Login
                    </button>
                    <div className={styles.notification}>{notification}</div>
                </div>
            </div>
        </div>
    );
};
