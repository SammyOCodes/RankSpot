import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  BarChart,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">

          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">

            <Link to="/home" className="link">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>

            <Link to="/user" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                User
              </li>
            </Link>

            <Link to="/leaderboard" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                RankSpot Leaderboard
              </li>
            </Link>

            <Link to="/addAccounts" className="link">
            <li className="sidebarListItem">
              <PermIdentity className="sidebarIcon" />
              Add Game Accounts
            </li>
            </Link>

          </ul>
        </div>
      </div>
    </div>
  );
}
