import { useEffect } from "react";
/**
*@brief
* Todo useEffect hook to add a task to db
*/

export function AddTodoHook(context,Todoo,setTodo,TodoList,setTodoList,setTodoListIndexRemove) {
    useEffect(() => {
        if(Todoo!==""){
            fetch('http://localhost:8080/'+context.id+"/task", {
                method: 'POST',
                body:JSON.stringify({"task_hash":Todoo}),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                }

            }).then(async (response)=>{
                var result = await response.json()
                setTodo("")
                if(result.end !== true){
                    console.log("unsucsessfull")
                }else{
                    console.count()
                }
            })
        }
        
    return () => {
        return
    }
}, [context,Todoo,setTodo,TodoList,setTodoList,setTodoListIndexRemove])
}