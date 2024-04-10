import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useMatch } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Dashboard.css';


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
            <div style={{marginLeft: '250px', marginTop: '20px', marginRight: '20px', padding: '20px' }}>
                {currentPage === 'Summary' && <div>Summaryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy</div>}
                {currentPage === 'Risk Timeline' && <div>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>}
                {currentPage === 'Your Premium' && <div>ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</div>}
                {currentPage === 'Submit Info' && <div>IIIIIIIIIIIIIFJISDJF:I:JSIOEJIOSJDGOHSOIGJSIORHGOISFJ</div>}
            </div>
        </div>
    )
}

export default Dashboard;
