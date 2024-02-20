import Registration from "./Registration";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

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