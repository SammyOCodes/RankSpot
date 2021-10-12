import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">League of Legends</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">100 rating gain</span>
          <span className="featuredMoneyRate">
            +100 <ArrowUpward  className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Since last visit</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">APEX Legends</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">100 rating loss</span>
          <span className="featuredMoneyRate">
            -100 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Since last visit</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Overwatch</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">100 rating gain</span>
          <span className="featuredMoneyRate">
            +100 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Since last visit</span>
      </div>
    </div>
  );
}
