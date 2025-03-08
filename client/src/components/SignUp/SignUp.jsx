import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";

export const SignUp = () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState("");

    const [emailAddress, setEmailAddress] = useState("");
    const [emailExistNotification, setEmailExistNotification] = useState("");

    const [username, setUsername] = useState("");
    const [usernameExistNotification, setUsernameExistNotification] =
        useState("");

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordsMatchNotification, setPasswordsMatchNotification] =
        useState("");

    const SignUp = () => {
        const samePassword = password === passwordConfirm;
        fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then((users) => {
                const emailCheck = users.find(
                    (u) => u.emailaddress === emailAddress
                );
                const usernameCheck = users.find(
                    (u) => u.username === username
                );
                
                if (!emailCheck && !usernameCheck && samePassword) {
                    fetch("http://localhost:3000/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            fullname: fullname,
                            emailaddress: emailAddress,
                            username: username,
                            password: password,
                            pasteinfo: "",
                        }),
                    })
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`error, status: ${res.status}`);
                            }
                            return res.json();
                        })
                        .then(() => {
                            navigate("/");
                        })
                        .catch((err) => {
                            console.error("Failed to update user:", err);
                        });
                } else {
                    emailCheck
                        ? setEmailExistNotification(
                              "Email Address already exists"
                          )
                        : setEmailExistNotification("");
                    usernameCheck
                        ? setUsernameExistNotification("Username is taken")
                        : setUsernameExistNotification("");
                    !samePassword
                        ? setPasswordsMatchNotification(
                              "Passwords do not match"
                          )
                        : setPasswordsMatchNotification("");
                }
            });
    };

    const loginRoute = () => {
        navigate("/");
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    <h1>Sign Up</h1>
                    <div>
                        <input
                            placeholder="Full Name"
                            className={styles.loginInput}
                            autoComplete="no"
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Email Address"
                            className={styles.loginInput}
                            autoComplete="no"
                            onChange={(e) => setEmailAddress(e.target.value)}
                            type="email"
                        />
                        <br />
                        <span className={styles.notification}>
                            {emailExistNotification}
                        </span>
                    </div>
                    <div>
                        <input
                            placeholder="Username"
                            className={styles.loginInput}
                            autoComplete="no"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <span className={styles.notification}>
                            {usernameExistNotification}
                        </span>
                    </div>
                    <div>
                        <input
                            placeholder="Password"
                            type="password"
                            className={styles.loginInput}
                            autoComplete="no"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Reconfirm Password"
                            type="password"
                            className={styles.loginInput}
                            autoComplete="no"
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                        <br />
                        <span className={styles.notification}>
                            {passwordsMatchNotification}
                        </span>
                    </div>
                    <button className={styles.signupBtn} onClick={SignUp}>
                        Sign Up
                    </button>
                    <div className={styles.links}>
                        Already have an account?{" "}
                        <span onClick={loginRoute}>Login</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
