var fs = require('fs');
var {Pool} = require('pg');

module.exports = async (app) => {
	const db = new Pool();

	//the "extra" table is cursed just saying
	await db.query(`
		CREATE TABLE IF NOT EXISTS comics (
			id 			SERIAL PRIMARY KEY,
			hid 		TEXT,
			name 		TEXT,
			tagline 	TEXT,
			description TEXT,
			story 		TEXT
		);

		CREATE TABLE IF NOT EXISTS contacts (
			id 			SERIAL PRIMARY KEY,
			name 		TEXT,
			url 		TEXT
		);

		CREATE TABLE IF NOT EXISTS extras (
			id 			SERIAL PRIMARY KEY,
			key 		TEXT,
			val 		TEXT
		);

		CREATE TABLE IF NOT EXISTS flags (
			id 			SERIAL PRIMARY KEY,
			hid 		TEXT,
			name 		TEXT,
			category 	TEXT
		);

		CREATE TABLE IF NOT EXISTS posts (
			id 			SERIAL PRIMARY KEY,
			hid 		TEXT,
			title 		TEXT,
			body 		TEXT,
			user_id 	TEXT,
			cover_url 	TEXT,
			timestamp 	TIMESTAMPTZ,
			tags		TEXT[]
		);

		CREATE TABLE IF NOT EXISTS projects (
			id 			SERIAL PRIMARY KEY,
			hid 		TEXT,
			name 		TEXT,
			tag 		TEXT
		);

		CREATE TABLE IF NOT EXISTS users (
			id 			SERIAL PRIMARY KEY,
			hid 		TEXT,
			name 		TEXT,
			password 	TEXT,
			salt 		TEXT,
			bio 		TEXT,
			avatar_url 	TEXT
		);
	`);

	app.stores = {};
	var files = fs.readdirSync(__dirname);
	for(var file of files) {
		if(["__db.js", "__migrations.js", "tmp.js"].includes(file)) continue;
		var tmpname = file.replace(/store\.js/i, "");
		var name =  tmpname[0].toLowerCase() + 
				   (tmpname.endsWith("y") ?
				   	tmpname.slice(1, tmpname.length-1) + "ies" : //CategoryStore.js becomes categories
				    tmpname.slice(1) + "s"); //ProfileStore.js becomes profiles

		app.stores[name] = require(__dirname+'/'+file)(app, db);
		if(app.stores[name].init) app.stores[name].init();
	}

	return db;
}