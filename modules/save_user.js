/**
 * @brief 
 * saves a user by hash
 * @return function 
 * returns a response
 */
async function save_user(db,hash,res) {
    var x={};
    db.run(`INSERT INTO User (Hash,Tasks) VALUES (?,0)`,[hash],function(err, result) {
        if (err) {
            res.json({"end":false, "error": err.message })
            return;
        }else{
          db.get(`SELECT * FROM User WHERE Hash = ?`,[hash], (err, row) => {
            res.json({
              end: true,
              message: "Acount was saved successfully",
              number: row.User_id,
            });
          })
        }

    });

}
module.exports = save_user
