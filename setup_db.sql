/*Tables*/

CREATE TABLE "User" (
	User_id INTEGER PRIMARY KEY,
    Hash TEXT(255) DEFAULT NULL UNIQUE,
	Tasks INTEGER DEFAULT NULL
);

CREATE TABLE Tasks (
	Task_id INTEGER NOT NULL PRIMARY KEY,
	User_id INTEGER NOT NULL,
	Task TEXT(1000),
	Completed BOOLEAN,
	FOREIGN KEY (User_id) REFERENCES User (User_id)
);

/* Insert */

/*Task*/INSERT INTO Tasks (User_id,Task,Completed) VALUES (?,?,0)

/*User*/INSERT INTO User (Hash,Tasks) VALUES (?,0)

/*Selectors*/

/*Login*/SELECT * FROM User WHERE Hash = ?

/*Users Tasks*/SELECT * FROM Tasks WHERE User_id = ? AND Completed = 0

/*Leaderboard*/SELECT Hash,Tasks FROM  "User" ORDER BY Tasks limit 10