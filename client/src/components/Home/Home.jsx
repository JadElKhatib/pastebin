import { useLocation } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <div className="homeContainer">
      <div className="mainContainer">
        <div className="content">
          <div className="paste">{user.pasteinfo}</div>
          <button className="editBtn">Edit</button>
          <button className="deleteBtn">Delete</button>
        </div>
      </div>
    </div>
  );
};
