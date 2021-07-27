/**
 * @brief 
 *  Get all the tasks of a user
 * @return function 
 * returns a response
 */
function get_task(db,res,id) {
    console.log(id)
    db.all(`SELECT * FROM Tasks WHERE User_id = ? AND Completed = 0`,[id], (err, rows) => {
        console.log(rows)
        res.json({
            end: true,
            message: "Task listed successfully",
            tasks: rows,
          });
    })
}

module.exports = get_task