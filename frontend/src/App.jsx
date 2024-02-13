import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Registration from "./Registration";
import Dashboard from "./Dashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Registration/>} />

            </Routes>
        </Router>
        
    );
}

export default App;