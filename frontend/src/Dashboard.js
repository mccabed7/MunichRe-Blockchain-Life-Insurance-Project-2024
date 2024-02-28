import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useMatch } from 'react-router-dom';
import Sidebar from './Sidebar';
import TimelinePanel from './TimelinePanel';
import './Dashboard.css';
import SummaryPage from './SummaryPage';
import SubmitInfo from './SubmitInfo';


function Dashboard(){

    const items = ['Summary', 'Risk Timeline', 'Your Premium', 'Submit Info'];
    const [currentPage, setCurrentPage] = useState('Summary');

    const handleSidebarClick = (page) => {
        setCurrentPage(page);
        console.log("Changing page to:", page);
      };

    return(
        <div className='dashboard' style={{ display: 'flex', color: 'white' }}>
            <Sidebar items={items}  onSidebarClick={handleSidebarClick} />
            <div className='dashboard-panel'>
                {currentPage === 'Summary' && <SummaryPage/>}
                {currentPage === 'Risk Timeline' && <TimelinePanel/>}
                {currentPage === 'Your Premium' && <div>ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</div>}
                {currentPage === 'Submit Info' && <SubmitInfo/>}
            </div>
        </div>
    )
}

export default Dashboard;
