import Timeline from "./Timeline";
import './TimelinePanel.css';

import { getSessionID } from './sessionModule.jsx';

let currentSessionID = null;

function TimelinePanel (){
    currentSessionID = getSessionID();
    console.log("I AM THE TIMELINE NOT THE REG PAGE :) Here's the session ID: " + currentSessionID);
    return <div className='panel'>
        <Timeline/>
    </div>
}

export default TimelinePanel;