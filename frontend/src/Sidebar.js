import React from 'react';
import './Sidebar.css'

const Sidebar = ({ items, onSidebarClick}) => {
  return (
    <div className="sidebar">
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => onSidebarClick(item)}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;