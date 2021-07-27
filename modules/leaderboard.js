/**
 * @brief 
 * Produces a leaderboard of the top 10 users
 * @return function 
 * returns a response with all the info
 * 
 */

function get_task(db,res) {
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
            users: rows,
          });
    })
}

module.exports = get_task