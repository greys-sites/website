const express	= require('express'); 
const fetch		= require('node-fetch');
const fs 		= require('fs');
const path		= require('path');
const dblite	= require('dblite');
const showdown	= require('showdown');
const cookparse	= require('cookie-parser')
const axios 	= require('axios');

require('dotenv').config();

const app	= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookparse());

const multer 	= require('multer');
var memstore = multer.memoryStorage();
app.upload = multer({
	storage: memstore,
	fileFiler: (req, file, cb) => {
		if(req.path == "/api/comic" && (!file.mimetype === "image/*" || !req.verified)) cb(null, false);
		else if(req.path == "/api/comic" && file.mimetype === "image/*" && req.verified) cb(null, true);
		else if(req.path == "/api/flag" && ["image/*", "text/*"].includes(file.mimetype) && req.verified) cb(null, true);
		else cb(null, false);
	}
});

app.stripper = require('sanitize-html');

showdown.setOption('simplifiedAutoLink', true);
showdown.setOption('simpleLineBreaks', true);
showdown.setOption('openLinksInNewWindow', true);
showdown.setOption('underline', true);
showdown.setOption('strikethrough', true);
app.conv	= new showdown.Converter();

const { pool } = require('pg');
const session = require('express-session');
app.use(session({
  store: new (require('connect-pg-simple')(session))({
  	pool
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

const routes = {};

app.utils = {};
app.utils.genCode = (table = process.env.CHARS, n = 4) => {
	var str = "";
	while (str.length < n){
		str += table[Math.floor(Math.random() * (table.length))];
	}
	return str;
}

async function setup() {
	app.db = await require(__dirname + "/stores/__db")(app);

	var files = fs.readdirSync(__dirname + "/routes");
	for(var file of files) {
		routes[file.slice(0, -3)] = require(__dirname+'/routes/'+file)(app);
	}

	app.use(express.static(path.join(__dirname, 'frontend/public')));
	app.use(express.static(path.join(__dirname, 'Images/comics')));
	app.use(express.static(path.join(__dirname, 'Images/flags')));
	app.use(express.static(path.join(__dirname, 'Images/projects')));

	app.use("/*", async (req, res, next)=> {
		var index = fs.readFileSync(path.join(__dirname+'/frontend/public/index.html'),'utf8');
		index = index.replace('$TITLE','Send Us into the Light');
		index = index.replace('$DESC','Home of the Grey Skies');
		index = index.replace('$TWITDESC','Home of the Grey Skies');
		index = index.replace('$TWITTITLE','Send Us into the Light');
		index = index.replace('$OGTITLE','Send Us into the Light');
		index = index.replace('$OGDESC','Home of the Grey Skies');
		index = index.replace('$OEMBED','oembed.json');
		res.send(index);
	})

	app.use(function (err, req, res, next) {
	  console.log('This is the invalid field ->', err.field)
	  next(err)
	})
}

setup()
.then(() => {
	console.log("Ready.");
	app.listen(process.env.PORT || 8080);
})
