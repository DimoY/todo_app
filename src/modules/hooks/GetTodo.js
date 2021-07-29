import { useEffect } from "react";
/**
*@brief
* Gets the tasks from backend and sets todo_list to a list of <li>
*/

export function GetTodoHook(context,refresh,setTodoList,setTodoListIndexRemove) {
    useEffect(() => {
        console.log(2)
        fetch('http://localhost:8080/'+context.id+"/task", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        
        }).then(async (response)=>{
            var result = await response.json()
            var crib = result.tasks
            crib = crib.map((i)=>{
                return (<li key={i.Task_id} id = {i.Task_id} className="task" onClick = {async (e)=>{
                    var responce = await fetch('http://localhost:8080/'+context.id+"/task/completed", {
                        method: 'POST',
                        body:JSON.stringify({"id":e.target.id}),
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                        }
                    })
                    console.log(await responce.json())
                    setTodoListIndexRemove(e.target.id)
                }}>{i.Task}</li>)
            })
            setTodoList(crib)
            
        })
    return () => {
        return
    }
}, [context,refresh,setTodoList,setTodoListIndexRemove])
}