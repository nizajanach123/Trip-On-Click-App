// // import React from "react";

// // class Timeline extends React.Component {
// //   state = {
// //     events: [
// //       { date: "January 1, 2022", title: "Event 1", description: "Description 1" },
// //       { date: "February 1, 2022", title: "Event 2", description: "Description 2" },
// //       { date: "March 1, 2022", title: "Event 3", description: "Description 3" },
// //     ],
// //   };

// //   render() {
// //     return (
// //       <div className="timelineDate">
// //         {this.state.events.map((event, index) => (
// //           <div key={index} className="timelineDate-item">
// //             <div className="timeline-item-date">{event.date}</div>
// //             <div className="timeline-item-content">
// //               <h3 className="timeline-item-title">{event.title}</h3>
// //               <p className="timeline-item-description">{event.description}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   }
// // }

// // export default Timeline;


// import React from 'react';
// import cx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import TextInfoContent from '@mui-treasury/components/content/textInfo';
// import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
// import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
// import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import  { useState } from 'react';
// import temp from '../Images/logo.jpg';
// import axios, { all } from "axios";
// import { useEffect } from 'react';


// export const TimeLine = React.memo(function BlogCard(props) {
 


//   return (
//     <div>
//     <div className="timelineDate">
//              {this.state.events.map((event, index) => (
//                <div key={index} className="timelineDate-item">
//                  <div className="timeline-item-date">{event.date}</div>
//                  <div className="timeline-item-content">
//                    <h3 className="timeline-item-title">{event.title}</h3>
//                    <p className="timeline-item-description">{event.description}</p>
//                  </div>
//                </div>
//             </div>
            
//              ))
//              }
                  
// export default TimeLine