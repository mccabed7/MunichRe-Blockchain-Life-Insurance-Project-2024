import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Registration from "./Registration";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import SummaryPage from "./SummaryPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SummaryPage/>} />
                <Route path="/registration" element={<Registration/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;