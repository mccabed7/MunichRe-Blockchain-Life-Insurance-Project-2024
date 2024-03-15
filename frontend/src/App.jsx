import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Registration from "./Registration";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import LandingPage from "./LandingPage";
import AboutUs from "./AboutUs";
import HowItWorks from "./HowItWorks";
import ContactUs from "./ContactUs";
import SummaryPage from "./SummaryPage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/registration" element={<Registration/>} />
                <Route path="/dashboard" element={<Dashboard/>} />  
                <Route path="/aboutus" element={<AboutUs/>} />    
                <Route path="/howitworks" element={<HowItWorks/>} /> 
                <Route path="/contactus" element={<ContactUs/>} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;