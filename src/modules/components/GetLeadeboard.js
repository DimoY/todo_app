/**
*
*@brief
* returns a leaderboard component
*/


import { useState } from "react";
import { GetLeaderboardHook } from "../hooks/GetLeaderboard";
export function GetLeaderboard(params) {
    const [Leaderboard, setLeaderboard] = useState([])
    GetLeaderboardHook(params.context,params.refresh,setLeaderboard)
    return (<div><h3>Leaderboard</h3><ul>{Leaderboard}</ul></div>)
}