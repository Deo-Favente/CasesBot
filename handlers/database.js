const config = require("../config/config.js");
const sqlite3 = require("sqlite3").verbose();

function loadDatabaseConnection() {
	const db = new sqlite3.Database("./data/database.db", (err) => {
		if (err) {
			console.error(err.message);
		}
		console.log("0------------------| Database handler:".blue);
		db.run(`CREATE TABLE IF NOT EXISTS users (
		user_id TEXT NOT NULL,
		money INTEGER NOT NULL,
		items TEXT NOT NULL,
		PRIMARY KEY (user_id)
	)`, (err) => {
			if (err) {
				console.error(err.message);
			}
		});
		console.log("[HANDLER - EVENTS] Loaded a table : users".green);
		console.log("0------------------| Database connected!".green);
	});
	return db;
}

module.exports = loadDatabaseConnection();
