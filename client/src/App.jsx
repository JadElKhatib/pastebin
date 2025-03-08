import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Home } from "./components/Home/Home";
import { Edit } from "./components/Edit/Edit";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/edit" element={<Edit />} />
            </Routes>
        </Router>
    );
}

export default App;
