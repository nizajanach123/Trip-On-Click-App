import CardDay from './CardDay';
import { useLocation } from 'react-router-dom';
import "../css/DayByDay.css";
import  { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-vertical-timeline-component/style.min.css';
import car from '../Images/car.png';
import '../css/TimeLine.css';
import NavButton from './NavButton';
import bed from '../Images/bed.png'
import timeout from '../Images/time.png'
import { Button} from 'antd';
import { CalendarOutlined } from '@ant-design/icons'
import { ToastContainer, toast } from 'react-toastify';
import { HourglassBottom } from '@mui/icons-material';


function DayByDay() {
   const location = useLocation();
   const trip = location.state.data;
   console.log(trip);
   const myRef = useRef(null);


   const generateError = (error) =>
      toast.error(error, {
         position: "top-left",
      });


   const navigate = useNavigate();
   console.log("DAY----BY----DAY")
   console.log(trip);
   console.log(trip._id);
   console.log(trip.AttractionsNotUsed);

   const StartDate = trip.StartDate
   const FinalDate = trip.FinalDate
   console.log(StartDate);
   console.log(FinalDate)


   var getDaysArray = function (start, end) {
      for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
         arr.push(new Date(dt));
      }

      return arr;
   };



   var days = []
   days = getDaysArray(new Date(StartDate), new Date(FinalDate));
   days.map((v) => v.toUTCString().slice(0, 10)).join("")
   var lenDays = days.length

   console.log(days)

   const allAttractions = trip.Attractions;
   console.log(allAttractions);

   const scrollToRef = useRef(null);

   const firstEventForDate = (events, date) => {
      const dateString = new Date(date).toISOString().substring(0, 10);
      const firstEvent = events.find((event) => new Date(event.Start) >= new Date(dateString));
      return firstEvent || null;
   };


   const handleClick = (e, id) => {
      const date = e.target.innerText;
      const dayAndMonthAndYear = date.split("/");
      const day = dayAndMonthAndYear[0];
      const month = dayAndMonthAndYear[1];
      const year = dayAndMonthAndYear[2];
      const attractionsInDate = allAttractions.filter(attraction => (
         new Date(attraction.Start).getMonth() + 1) == month &&
         new Date(attraction.Start).getDate() == day &&
         new Date(attraction.Start).getFullYear() == year);
      if (attractionsInDate.length === 0) {
         generateError("לא קיימות אטרקציות ביום זה")
         return;
      }
      const element = document.getElementById(`object-${id}`);
      element.scrollIntoView({ behavior: 'smooth' });
   }

   let first = []


   return (
      <div >
         <div>
            <NavButton trip={trip} />
         </div>
         <div style={{ display: 'flex' }}>
            <div className="DayByDay-dates-div">
               {days.map((date) => {
                  const eventId = firstEventForDate(allAttractions, date)?._id;
                  first.push(eventId)

                  if (!eventId) return null;

                  return (

                     <div key={eventId} style={{}}>
                        <span onClick={(e) => handleClick(e, eventId)}>
                           <Button className="dates-dayByDay" >
                              {date.getDate() + "/" + ((date.getMonth()) + 1) + "/" + (date.getFullYear())}
                              <CalendarOutlined style={{ fontSize: '20px' }} />
                           </Button>
                        </span>
                     </div>
                  );
               })}

            </div>
            <div className='pagefix'>


               <div className='cardsmap'>
                  {
                     allAttractions.map((item, index) => {
                        const d = new Date();
                        d.setTime(new Date(item.Start).getTime());
                        let text = d.toString();
                        const daymonth = d.getDate() + "/" + ((d.getMonth()) + 1);
   
                        const startObj = new Date(item.Start);
                        startObj.setHours(startObj.getHours() - 2)

                        let endObj = new Date(item.Start);
                        let hoursDuration;
                        if (item.AttractionDetails) {
                           hoursDuration = item.AttractionDetails.HoursNum
                        }
                        else {
                           hoursDuration = item.Break.HoursNum;
                        }
                        endObj.setHours(endObj.getHours() + hoursDuration - 2)

                        const startHour = startObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        const endHour = endObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                        const travelTime = (item.TravelTimeFromPrev / 60);
                        let roundedNumber = Math.round(travelTime);


                        return (

                           (item.AttractionDetails === null) ?
                              <div>
                               

                              </div>
                              :
                              <div>
                                 {first.includes(item._id) ? <img src={bed} class="bed"></img>
                                    : console.log("no first")}
                                 <div key={item._id} id={`object-${item._id}`} ref={scrollToRef} >
                                 </div>
                                 <div className="timeline-container">
                                    <div className="timeline">
                                       <img src={car} alt='car' className='car'></img>
                                       <div className='nextToEachOther'>
                                          <img src={timeout} className='time'></img>
                                          <div class="travelTime">{" " + roundedNumber + " "} <p className='min'> דקות </p></div>


                                       </div>

                                       <div>

                                          {allAttractions[index - 1] && allAttractions[index - 1].AttractionDetails == null && <>
                                             <span className=''> הפסקה<span>{" " + Math.round(allAttractions[index - 1].Break.HoursNum * 60) + " "} </span> דקות </span>
                                             <span style={{ color: 'white' }}></span>
                                             <HourglassBottom fontSize='large' />
                                             
                                             <br />
                                          </>}

                                          {item.AttractionDetails &&
                                             <CardDay
                                                className='cards'
                                                header={item.AttractionDetails.Name}
                                                body={item.AttractionDetails.Description}
                                                Address={daymonth + ' ' + startHour + '-' + endHour}
                                                Url={item.AttractionDetails.Url}
                                                Image={item.AttractionDetails.Image}
                                                
                                             ></CardDay>}


                                         
                                       </div>
                                    </div>
                                 </div>

                              </div>

                        );

                     }

                     )}
               </div>


               <div>
               </div>
            </div>
         </div>

         <ToastContainer rtl={true} />
      </div>


   );
}



export default DayByDay;