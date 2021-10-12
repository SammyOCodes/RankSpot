import "./personalRankedTable.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WidgetLg() {

  const lolBaseEndpoint = 'https://na1.api.riotgames.com/lol/';
  const apexBaseEndpoint = 'https://api.mozambiquehe.re/bridge?version=5';

  const [isLoading, setLoading] = useState(false);
  const [allRankedInfo, setRankedInfo] = useState({ lolRankedInfo: [
    {
      summonerName: '',
      queueType: '',
      tier: '',
      rank: '',
    },
    {
      summonerName: '',
      queueType: '',
      tier: '',
      rank: '' },
  ], 
  apexRankedInfo: {
    name: '',
    rank: {
      rankName: '',
      rankDiv: '',
    },
    arena: {
      rankName: '',
      rankDiv: '',
    },
  },
  overwatchRankedInfo: {
    name: '',
    rating: '',
  },

  });

  useEffect(() => {

    const fetchData = async () => {
      try{
        const email = JSON.parse(localStorage.getItem('userInfo')).data.email;
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

    fetchData();
    
  }, [])

  if(isLoading) {
    return (
      <div>Loading your user data....</div>
    );
  }
  
  return (
    <div className="rankedTableOutline">
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