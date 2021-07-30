# Backend todo_app

----------------------------------

## How to run the app

`yarn run`

## Api routes
| route | use |
|-----|---------|
| /login | post request for checking if the user exists |
| /register | post request to add a user |
| /:user_id/task | get request see all of users task |
| /:user_id/task | post request to add a task |
| /leaderboard | get request to see the Leaderboard |
| /:user_id/task/completed | post request to complete a task and increse the user task count |
