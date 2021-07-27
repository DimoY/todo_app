const express = require("express");
const save_user = require("./modules/save_user.js");
const check_user = require("./modules/check_user.js");
const save_task = require("./modules/save_task.js");
const get_task = require("./modules/get_task.js");
const checked = require("./modules/checked");
var sqlite3 = require('sqlite3')
const app = express();
const port = 8080;


const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
      console.error("Erro opening database " + err.message);
  } else {

      db.run('CREATE TABLE User (\
        User_id int NOT NULL AUTO_INCREMENT,\
        Hash varchar(255) DEFAULT NULL UNIQUE,\
        Tasks int DEFAULT NULL,\
        PRIMARY KEY (`User_id`)\
      );', (err) => {
          if (err) {
              console.log("Table User already exists.");
          }
      });
      db.run('CREATE TABLE Tasks (\
            Task_id int NOT NULL,\
            User_id int NOT NULL,\
            Task varchar(1000),\
            Completed BIT,\
            PRIMARY KEY (Task_id),\
            FOREIGN KEY (User_id) REFERENCES User (User_id));', (err) => {
        if (err) {
            console.log("Table Tasks already exists.");
        }
    });
  }
});
/**
 * Acount schema
 *
 * {
 *  hash:String
 *  id:Int
 *
 * }
 */

/**
 *
 * Task schema
 *
 * {
 * task_hash:id
 * id:Int
 * completed:BOOL
 * user_id
 * }
 *
 * /tasks/:user_id


    /login/user_hash

   /register/user_hash

 */
let accounts = [];
let tasks = [];
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post("/register", function (req, res) {
  if (req.body["hash"] == null) {
    res.json({
      end: false,
      message: "Hash was not sent",
    });
    return;
  }
  save_user(db, req.body["hash"],res);

});

app.post("/login/", function (req, res) {
  if (req.body["hash"] == null) {
    res.json({
      end: false,
      message: "Hash was not sent",
    });
    return;
  }
  check_user(db,req.body["hash"],res);

});

app.post("/:user_id/task", function (req, res) {
  if (req.body["task_hash"] == null) {
    res.json({
      end: false,
      message: "Hash was not sent",
    });
    return;
  }
  if(req.body["task_hash"] === ""){
    res.json({
      end: false,
      message: "No task",
    });
    return;
  }
  save_task(db,res, req.body["task_hash"], req.params["user_id"]);

});

app.get("/:user_id/task", function (req, res) {
  console.log(parseInt(req.params["user_id"],10))
  get_task(db,res, parseInt(req.params["user_id"],10));

});

app.post("/task/completed", function (req, res) {
  if (req.body["id"] == null) {
    res.json({
      end: false,
      message: "id was not sent",
    });
    return;
  }
  checked(db,res,req.body["id"])

});

app.get("/leaderboard",function (req,res) {
  leaderboard(db,res)
})
app.listen(port, () => {
  console.log(`Example app listening on port port!`)
});

