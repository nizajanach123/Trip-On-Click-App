import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  MDBNavbar,
  MDBBtn,
  MDBContainer,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import "../css/Navbar.css";
import logo from "../Images/logo.jpg";
import { useNavigate } from "react-router-dom";
      
      export default function Navbar() {
        const [isLoggedIn, setIsLoggedIn] = useState("false");
        
         const navigate = useNavigate();

         const [cookies, setCookie, removeCookie] = useCookies([]);
         const [userName, setUserName] = useState(null);
         const [isUserConnect, setIsUserConnect] = useState(false);
         const logOut = () => {
          localStorage.clear();
          removeCookie("jwt", {
              path: '/',
          });
          navigate("/");
      };
         useEffect(() => {
             const verifyUser = async () => {
                 const { data } = await axios.post(
                     "http://localhost:8080/",
                     {},
                     {
                         withCredentials: true,
                     }
                 );
                 if (data.status) {
                  setIsLoggedIn(JSON.parse(localStorage.getItem('isAuthenticated')));
                 }
     
             };
             verifyUser();
         }, [cookies, navigate, removeCookie]);
        return (
     
         <MDBNavbar light bgColor='light' class='navbar '>
            
            <MDBContainer tag="form" fluid className='justify-content-end nav '>
            <div class='justify-content-end nav fix2'>
              
               {
                (isLoggedIn == "true") ?
                <div>
                <MDBBtn  id='but' outline color="success" className='me-2 '  type="submit" onClick={ ()=>logOut()}>
                  התנתק
               </MDBBtn>
               <i class="far fa-user personallogo" onClick={() => navigate("/personal")} ></i>
                 </div>
               :
               <>
               <MDBBtn   id='but' outline color="success" className='me-2'  type="submit" onClick={() => navigate("/register")}>
                        הירשם
                      </MDBBtn>
               <MDBBtn  id='but' outline color="success" className='me-2' type="submit" onClick={() => navigate("/login")}>
                      התחבר
                    </MDBBtn></>
            
               
               }
             </div>
               <MDBNavbarBrand href='#' className=' logo '>
               <img
                     src={logo}
                     class='logo'
                     height='30'
                     alt=''
                     loading='lazy'
                     onClick={() => navigate("/")}
               />
          </MDBNavbarBrand>
               
            </MDBContainer>
           
       </MDBNavbar>
  
     
 
        );
      }
   
