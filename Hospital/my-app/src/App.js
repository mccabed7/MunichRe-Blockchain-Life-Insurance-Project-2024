import SubmitData from './SubmitData';
import Navbar from './Navbar';
import Footer from './Footer';
import LandingPage from './LandingPage';
import SearchBar from './SearchBar';
import ThirdPartyClient from './ThirdPartyClient';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";


import './App.css';

function App() {
  // return (
  //       <div id="root">
  //         <Navbar />
  //         <LandingPage />
  //         <SearchBar />
  //         {/* <SubmitData /> */}
  //         <Footer />
  //       </div>
  // );
  return (
    <Router>
      <div id="root">
      <ThirdPartyClient />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchBar />} />
          {/* <Route path="/submit" element={<SubmitData />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
