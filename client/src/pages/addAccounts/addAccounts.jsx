import "./addAccounts.css";
import IconButton from '@mui/material/IconButton';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { useHistory } from 'react-router-dom';


export default function FeaturedInfo() {

  let history = useHistory();

  const goToAddLolProfile = () => { history.push('/addLolProfile'); }
  const goToAddApexProfile = () => { history.push('/addApexProfile'); }
  const goToAddOverwatchProfile = () => { history.push('/addOverwatchProfile'); }

  return (
    <div className="addAccounts">
      <div className="gameChoiceBox">
        <div className="addPlusCart">
            <IconButton color="primary" onClick={goToAddLolProfile}>
                <ControlPointRoundedIcon />
                <p>League of Legends</p>
            </IconButton>
        </div>
      </div>
      <div className="gameChoiceBox">
        <div className="addPlusCart">
            <IconButton color="primary" onClick={goToAddApexProfile}>
                <ControlPointRoundedIcon />
                <p>APEX Legends</p>
            </IconButton>
        </div>
      </div>
      <div className="gameChoiceBox">
        <div className="addPlusCart">
            <IconButton color="primary" onClick={goToAddOverwatchProfile}>
                <ControlPointRoundedIcon />
                <p>Overwatch</p>
            </IconButton>
        </div>
      </div>
    </div>
  );
}