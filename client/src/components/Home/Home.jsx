import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

export const Home = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const navigate = useNavigate();

    const Edit = () => {
        navigate("/home/edit", { state: { user: user } });
    };

    return (
        <div className={styles.homeContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.content}>
                    <div className={styles.paste}>
                        {user.pasteinfo.split('\n').map((line,index) => {
                            return (
                                <span key={index}>
                                    {line}
                                    <br/>
                                </span>
                            )
                        })}

                    </div>
                    <button className={styles.editBtn} onClick={Edit}>
                        Edit
                    </button>
                    <button className={styles.deleteBtn}>Delete</button>
                </div>
            </div>
        </div>
    );
};
