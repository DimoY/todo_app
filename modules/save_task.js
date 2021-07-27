/**
 * @brief 
 * saves the specified tasks
 * @return function 
 * returns a response 
 *
 */

function save_task(db,res,hash,id) {
    db.get(`SELECT * FROM Tasks WHERE Task = ? AND User_id = ? AND Completed = 0`,[hash,id], (err, rows) => {
        if(rows){
            console.log(1)

            res.json({
                end: false,
                message: "task already exists",
              });
        }else{
            db.run(`INSERT INTO Tasks (User_id,Task,Completed) VALUES (?,?,0)`,[id,hash],function(err, result) {
                if (err) {
                    console.log(2)
                    res.status(400).json({"end":false, "error": err.message })
                    x = 1;
                    return;
                }else{
                    db.get(`SELECT * FROM Tasks WHERE Task = ? AND User_id = ?`,[hash,id], (err, rows) => {
                        console.log(3)
                
                        console.log(rows)
                        res.json({
                            end: true,
                            message: "Task was saved successfully",
                            number: rows.Task_id,
                            text: rows.Task
                        });
                    })
                }
        
            });
        }
        
    })

}
module.exports = save_task