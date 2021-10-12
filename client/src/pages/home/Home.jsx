//import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import PersonalRankedTable from "../../components/personalRankedTable/personalRankedTable.jsx";

export default function Home() {

  return (
    <div className="home">
      <div className="homeWidgets">
        <PersonalRankedTable/>
      </div>
    </div>
  );
}
