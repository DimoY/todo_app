/**
 * @brief 
 * Produces a leaderboard of the top 10 users
 * @return function 
 * returns a response with all the info
 * 
 */

function get_task(db,res) {
    console.log(id)
    db.all(`SELECT Hash,Tasks FROM  "User" ORDER BY Tasks limit 10`, (err, rows) => {
        if(err){
            res.json({
                end:false,
                message:err
            })
            return
        }
        res.json({
            end: true,
            message: "Lederboard",
            tasks: rows,
          });
    })
}

module.exports = get_task