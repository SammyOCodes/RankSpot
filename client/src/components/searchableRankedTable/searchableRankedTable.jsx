import "./searchableRankedTable.css";
import React, { useState } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchableRankedTable() {
  
  const lolBaseEndpoint = 'https://na1.api.riotgames.com/lol/';
  const apexBaseEndpoint = 'https://api.mozambiquehe.re/bridge?version=5';

  const [email, setEmail] = useState("");
  const [firstSearch, setFirstSearch] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [allRankedInfo, setRankedInfo] = useState({ lolRankedInfo: [
    {
      summonerName: 'loading...',
      queueType: 'loading...',
      tier: '',
      rank: 'loading...',
    },
    {
      summonerName: 'loading...',
      queueType: 'loading...',
      tier: '',
      rank: 'loading...' },
  ], 
  apexRankedInfo: {
    name: 'loading...',
    rank: {
      rankName: 'loading...',
      rankDiv: '',
    },
    arena: {
      rankName: 'loading...',
      rankDiv: '',
    },
  },
  overwatchRankedInfo: {
    name: '',
    rating: '',
  },

  });

  const fetchData = async () => {
    setLoading(true);
    setFirstSearch(false);
      
    try{
      const getUserResponse = await axios.post('http://localhost:5000/profiles/getUser', { email });
      const currentUser = getUserResponse.data;

      const lolSearchParams = await axios.get(`${lolBaseEndpoint}summoner/v4/summoners/by-name/${currentUser.lolSummonerName}?${process.env.REACT_APP_RIOT_API_KEY}`);
      let id = lolSearchParams.data.id;
      const lolResponse = await axios.get(`${lolBaseEndpoint}league/v4/entries/by-summoner/${id}?${process.env.REACT_APP_RIOT_API_KEY}`);

      const apexResponse = await axios.get(`${apexBaseEndpoint}&platform=${currentUser.apexPlatform}&player=${currentUser.apexUsername}&auth=${process.env.REACT_APP_APEX_API_KEY}`);

      const overwatchResponse = await axios.get(`https://ow-api.com/v1/stats/${currentUser.overwatchPlatform}/${currentUser.overwatchRegion}/${currentUser.overwatchBattletag}/profile`);

      setRankedInfo({ lolRankedInfo: lolResponse.data, apexRankedInfo: apexResponse.data.global, overwatchRankedInfo: overwatchResponse.data });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
      
  if(firstSearch) {
    return (
      <div className="loneSearchBar">
        <TextField 
          id="outlined-search" 
          label="Search Friends by Email" 
          type="search"
          size="small"
          value={email} onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={fetchData}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
            
          }}
        />
      </div>
    );
  }

  if(isLoading) {
    return(
      <div>Please wait while table loads...</div>
    );
    
  }

  return (
    <div className="rankedTableOutline">
      <div className="leaderboardTopbar">
      <h3 className="rankedTableTitle">Competitive Summary</h3>
      {isLoading && <p> Wait I'm Loading Data </p>}
        <TextField 
          id="outlined-search" 
          label="Search" 
          type="search"
          size="small"
          value={email} onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={fetchData}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
            
          }}
        />
      </div>
      <h3 className="rankedTableTitle">Competitive Summary</h3>
      <table className="rankedTable">
      <tbody>
        <tr className="rankedTableTr">
          <th className="rankedTableCategory">Game</th>
          <th className="rankedTableCategory">IGN</th>
          <th className="rankedTableCategory">Queue Type</th>
          <th className="rankedTableCategory">Rank/Rating</th>
        </tr>
        <tr className="rankedTableTr">
          <td className="rankedTableGame">
            <img
              src="/images/LeagueOfLegendsIcon.png"
              alt=""
              className="rankedTableImg"
            />
            <span className="rankedTableName">League of Legends</span>
          </td>
          <td className="rankedTableIGN">{allRankedInfo.lolRankedInfo[0].summonerName}</td>
          <td className="rankedTableIGN">Ranked Solo/Duo</td>
          <td className="rankedTableRank">{allRankedInfo.lolRankedInfo[0].tier} {allRankedInfo.lolRankedInfo[1].rank}</td>
        </tr>
        <tr className="rankedTableTr">
          <td className="rankedTableGame">
          </td>
          <td className="rankedTableIGN"></td>
          <td className="rankedTableIGN">Ranked Flex</td>
          <td className="rankedTableRank">{allRankedInfo.lolRankedInfo[1].tier} {allRankedInfo.lolRankedInfo[1].rank}</td>
        </tr>
        <tr className="rankedTableTr">
          <td className="rankedTableGame">
            <img
              src="/images/ApexLegendsIcon.png"
              alt=""
              className="rankedTableImg"
            />
            <span className="rankedTableName">APEX Legends</span>
          </td>
          <td className="rankedTableIGN">{allRankedInfo.apexRankedInfo.name}</td>
          <td className="rankedTableIGN">Battle Royale</td>
          <td className="rankedTableRank">{allRankedInfo.apexRankedInfo.rank.rankName} {allRankedInfo.apexRankedInfo.rank.rankDiv}</td>
        </tr>
        <tr className="rankedTableTr">
          <td className="rankedTableGame">   
          </td>
          <td className="rankedTableIGN"></td>
          <td className="rankedTableIGN">Arena</td>
          <td className="rankedTableRank">{allRankedInfo.apexRankedInfo.arena.rankName} {allRankedInfo.apexRankedInfo.arena.rankDiv}</td>
        </tr>
        <tr className="rankedTableTr">
          <td className="rankedTableGame">
            <img
              src="/images/OverwatchIcon.png"
              alt=""
              className="rankedTableImg"
            />
            <span className="rankedTableName">Overwatch</span>
          </td>
          <td className="rankedTableIGN">{allRankedInfo.overwatchRankedInfo.name}</td>
          <td className="rankedTableIGN">Ranked Solo/Duo</td>
          <td className="rankedTableRank">{allRankedInfo.overwatchRankedInfo.rating}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}