/**
 * @brief 
 * Checks if a user trying to login exists
 * @return function 
 * It returns a response containig all the information for the json
 */

function check_user(db,hash,res) {
    var x= 0;
    db.get(`SELECT * FROM User WHERE Hash = ?`,[hash], (err, row) => {
        if(!row){
            res.json({
                end: false,
                message: "User does not exist",
              });
            return;};
            res.json({
                end: true,
                message: "Acount was logged in successfully",
                number: row.User_id,
              });
      })

}


module.exports = check_user