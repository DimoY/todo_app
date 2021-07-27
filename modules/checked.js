/**
 * @brief 
 * The function Updates the db "Completed" row to 1
 * 
 * 
 * @return function 
 * The function doesn't return anything instead it sends a json response
 * containing all the information needed for the frontend 
 */
function checked(db,res,task_id) {
    db.run(`UPDATE Tasks set completed = 1 WHERE task_id = ?`,[task_id], (err, row) => {
        if(err){
            res.json({
                end:false,
                message:err
            })
            return
        }
        db.run(``)
        db.run(`UPDATE User`)
        res.json({end: true,
            message: "Task checked successfully"})
    })
}

module.exports = checked
