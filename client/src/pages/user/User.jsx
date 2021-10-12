import { MailOutline, PermIdentity } from "@material-ui/icons";
import "./user.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function User() {

  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const email = JSON.parse(localStorage.getItem('userInfo')).data.email;
      try{
        const getUserResponse = await 
        axios.post('http://localhost:5000/profiles/getUser', { email });
        setCurrentUser(getUserResponse.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [])

  if(isLoading) {
    return ( <div></div> );
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User Profile</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="/images/BlankUserIcon.png"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername"></span>
              <span className="userShowUserTitle"></span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{currentUser.email}</span>
              </div>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">League of Legends - {currentUser.lolSummonerName}</span>
              </div>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">APEX Legends - {currentUser.apexUsername}</span>
              </div>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">Overwatch - {currentUser.overwatchBattletag}</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
