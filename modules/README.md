TODO app backend
===================

- - - - 
# INPUT

|      File    |  Input                                                                                                   |
|--------------|----------------------------------------------------------------------------------------------------------|
| check_user.js| Input( Users_hash = Encrypted(Pasword+Username) |
|  checked.js  | Input( Task_id = Id of the task you want to complete)|
|  get_task.js | Input(id = the id of the user you want to get the task from) - return a list of users not completed tasks|
|leadeboard.js | Input(None) - returns the Leaderboard|
| save_task.js | Input(Hash - text of hash, Id - users id ) - saves a task in the db|
| save_user.js | Input( Hash - users Hash = Encrypted(Pasword+Username)   )-Saves a user with 0 tasks completed|


# OUTPUT

### Basic Structure
 
#### END = Was the operation successful
#### Message = Text information

### Other:
    
#### Tasks = List of all the tasks

#### Number = The id of the user(for example save_user.js) or task (for example save_task.js)
 
#### Text(in save_task.js) = The text of the task
