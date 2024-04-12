//import './Timeline.css';

//import CanvasJSReact from '@canvasjs/react-charts';
//import React, { Component } from 'react';

////var CanvasJS = CanvasJSReact.CanvasJS;
//var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//https://canvasjs.com/react-charts/line-chart/  Use this it looks good.

/*
class Timeline extends Component{
    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark2",
            title:{
                text: "Your Risk History"
            },
            axisY: {
                title: "Risk Score",
                suffix: ""
            },
            axisX: {
                title: "Incident",
                prefix: "i",
                interval: 1
            },
            data: [{
                type: "line",
                toolTipContent: "Risk Score: {y}",
                dataPoints: [
                    {x: 1, y: 200},
                    {x: 2, y: 100},
                    {x: 3, y: 135}
                ]
            }]
        }

        return(
            <div className='Timeline'>
                <CanvasJSChart options = {options}/>;
            </div>
        );
    }
}
export default Timeline;
*/

import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

import {getSessionID, getEmail} from './sessionModule.jsx';
let sessionID = null;
let email = null;

const Timeline = () =>{
    const [timelinePoints, setTimelinePoints] = useState([]);
    

    const params = new URLSearchParams({
      'sid': sessionID,
      'emailAddress': email
    });
    
    useEffect(() => {
      async function fetchData() {
        const sessionID = getSessionID();
        const email = getEmail();
        const params = new URLSearchParams({
          'sid': sessionID,
          'emailAddress': email
        });
  
        try {
          const response = await fetch(`/api/customers/timeline?${params.toString()}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            }
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log(data);
          setTimelinePoints(data); // Assume data is in the correct format
          //setIsLoading(false);
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
      fetchData();
    }, []);

    const formattedTimelinePoints = timelinePoints.reverse().map((point, index) => {
      // Assuming the first element of each point is a timestamp or an incident ID
      const incidentNo = `Incident ${timelinePoints.length - index}`;
      // The second element is the risk score
      const riskScore = point[1];
    
      return [incidentNo, riskScore];
    });

    console.log(timelinePoints);

    return (
    
        <Chart
        padding={'10%'}
        width={'100%'}
        height={'100%'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Incident No', 'Risk Score'],
          ...formattedTimelinePoints.reverse(),
        ]}
        options={{
          title: 'Risk Timeline',
          titleTextStyle: { color: '#FFF' }, // White title
          backgroundColor: '#2a2a2a', // Dark background
          chartArea: { width: '50%', backgroundColor: '#1a1a1a'  },
          hAxis: {
            title: 'Incident Number',
            minValue: 0,
            textStyle: { color: '#FFF' }, // White text
            gridlines: { color: '#333' }, // Dark gridlines
          },
          vAxis: {
            title: 'Risk Score',
            textStyle: { color: '#FFF' }, // White text
            gridlines: { color: '#333' }, // Dark gridlines
          },
          legend: { textStyle: { color: '#FFF' } } // White legend
          
        }}
      />
    
      
    );
  };

  export default Timeline;