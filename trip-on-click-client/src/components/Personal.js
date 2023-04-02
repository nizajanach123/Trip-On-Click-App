import React from 'react';
import styled from "styled-components";
import CardT from './Card';
import "../css/Personal.css";
import axios from "axios";
import  { useState, useEffect } from 'react';
import Button from './DesignedComponents/Button';
import {  useNavigate } from "react-router-dom";

function Personal() {
    const [userTrips, setUserTrips] = useState([]);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserConnected() {
            let { data } = await axios.post(
                "http://localhost:8080/",
                {},
                {
                    withCredentials: true,
                }
            );
            console.log(data.user._id);
            setUserId(data.user._id);
        }
        getUserConnected();
    }, []);

    useEffect(() => {
        async function getUserTrips() {
            if (userId === null)
                return;
            const { data } = await axios.get(`http://localhost:8080/users/${userId}/trips`);
            setUserTrips(data);
            console.log(data);
        }
        getUserTrips()
    }, [userId]);



const [date, setDate] = useState();
const deleteTrip =async(event)=>{
    const id=event.target.id;
    console.log(event.target);
    console.log(event.target.getAttribute('id'));
  
    const {data} = await axios.post(`http://localhost:8080/trips/delete/${id}/${userId}`);
    const newData = userTrips.filter(item => item._id !== id);
        setUserTrips(newData);
    console.log(data)
}

    return (
        <div >
             
            <h3 className='per'>איזור אישי</h3>
            <div className='but'>
            <Button   content="יצירת טיול" type="submit" onClick={() => navigate("/Trip")}>יצירת טיול</Button>
            </div>
            <div class='allCard'>
               
                    {

                        userTrips.map((Item) => {
                            const d = Item.StartDate;
                            let text = d.toString();
                            console.log(text);    
                            const [year, month, day] = text.substring(0, 10).split('-');
                            console.log(`${day}/${month}`)
                           
                             
                            return (
                     
                                    <div  id='item ' class="col-lg-3 mb-4 ">
                                          <CardT func={deleteTrip} id={Item._id} header={`${day}/${month}`} middel={Item.Name} img={Item.Image}  className='card' style={{  display:'inline-block' }}  ></CardT>
                                    </div>
                                 
                           
                          
                           
                            )
                        }
                        )}
                </div>
            </div>
    );
}

const per = styled.h3`
margin: 1rem 0 1rem 0;
color:green ;
`;


export default Personal;