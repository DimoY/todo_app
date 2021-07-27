/**
 * @brief 
 * The function Updates the db "Completed" row to 1 and increses user Task score which puts him hier on the leaderboard
 * 
 * 
 * @return function 
 * The function doesn't return anything instead it sends a json response
 * containing all the information needed for the frontend 
 */
 function checked(db,res,task_id,user_id) {
    db.run(`UPDATE Tasks set completed = 1 WHERE task_id = ?`,[task_id], (err, row) => {
        if(err){
            res.json({
                end:false,
                message:err
            })
            return
        }
        db.run(`UPDATE User SET Tasks = Tasks+1 WHERE User_id =?`,[user_id],(err,result)=>{
            if(err){
                res.json({
                    end:false,
                    message:err
                })
                return
            }
            res.json({end: true,
                message: "Task checked successfully"})
        })
        
    })
}

module.exports = checked
