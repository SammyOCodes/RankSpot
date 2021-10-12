import "./leaderboard.css";
import PersonalRankedTable from "../../components/personalRankedTable/personalRankedTable";
import SearchableRankedTable from '../../components/searchableRankedTable/searchableRankedTable';

export default function Leaderboard() {

  
  return (
    <div className="leaderboard">
      <div className="splitscreen">
        <div className="left">
            <PersonalRankedTable/>
        </div>
        <div className="right">
            <SearchableRankedTable/>
        </div>
      </div>
    </div>
  );
}