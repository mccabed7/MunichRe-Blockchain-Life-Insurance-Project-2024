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

import React from 'react';
import { Chart } from 'react-google-charts';


const Timeline = () => {
    return (
    
        <Chart
        padding={'10%'}
        width={'100%'}
        height={'100%'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Incident No', 'Risk Score'],
          ['1', 8008000],
          ['2', 3694000],
          ['3', 2896000],
          ['4', 1953000],
          ['5', 1517000],
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