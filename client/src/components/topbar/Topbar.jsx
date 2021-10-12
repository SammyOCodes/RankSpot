import React from "react";
import "./topbar.css";
import IconButton from "@material-ui/core/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';

export default function Topbar() {

  //routing
  const history = useHistory();
  const goToLogin = () => { history.push('/login'); }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Welcome to RankSpot</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <IconButton onClick={goToLogin}>
              <LogoutIcon />
            </IconButton>
          </div>
        </div>        
      </div>
    </div>
  );
}
