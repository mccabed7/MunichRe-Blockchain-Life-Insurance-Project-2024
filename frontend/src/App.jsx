<<<<<<< HEAD
import Registration from "./Registration";
import Login from "./Login";
=======
>>>>>>> 8e3c8c3d0f50f60f552f56e22431902730bfa90d
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Registration from "./Registration";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import LandingPage from "./LandingPage";

function App() {
    return (
        <Router>
            <Routes>
<<<<<<< HEAD
                <Route path="/" element={<Registration/>} />
=======
                <Route path="/" element={<LandingPage/>} />
                
>>>>>>> 8e3c8c3d0f50f60f552f56e22431902730bfa90d
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;