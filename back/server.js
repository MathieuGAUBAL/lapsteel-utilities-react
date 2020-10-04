
require('dotenv').config();
const app = require('./app');
const express = require('express');
const parser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const https = require('https');
const fs = require('fs');
const path = require('path');
const http = require('http');
const httpServer = http.createServer();

app.use(parser.json());
app.use(cors());

app.use("/images", express.static(__dirname + "/public/images"));

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage }).single('file');


app.post('/api/uploadFile', (req, res) => {

	upload(req, res, err => {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		} else {
			return res.status(200).json({ file: "ok" });
		}
	});
});


app.listen(process.env.PORT_SERVER, () => {
	console.log('Server listening on port ' + process.env.PORT_SERVER);
});
 






