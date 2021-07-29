import { useEffect } from "react";

/**
*@brief
* Gets the leaderboard from the backend and makes it a list of <li> 
*/
export function GetLeaderboardHook(context,refresh,setLeaderboard) {
    useEffect(() => {
        fetch('http://localhost:8080/leaderboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        
        }).then(async (response)=>{
            var result = await response.json()
            var crib = result.users.reverse()
            crib = crib.map((i,index)=>{
                console.log(i.Tasks,i.Hash,context.hash)
                if(context.hash === i.Hash){
                    return (<li key = {index}>You ({i.Hash}) at {i.Tasks}</li>); 
                }
                return (<li key = {index}>{i.Hash} at {i.Tasks}</li>);
            })
            console.log(crib)
            setLeaderboard(crib)
        })
    return () => {
        return
    }
}, [context,refresh,setLeaderboard])
}