
const dotenv = require('dotenv').config();
const app = require('./app');
const express = require('express');
const parser = require("body-parser");
const multer = require("multer");
const cors = require("cors");


app.use(parser.json());
app.use(cors());
//app.use(cors({ origin: process.env.REACT_APP_SERVER_ADDRESS_FULL, credentials: true }));

app.use("/images", express.static(__dirname + "/public/images"));

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,'public/images');
    },
    filename:(req, file, cb) => {
        cb(null,file.originalname);
    },
});

const upload = multer({storage:storage}).single('file');


// upload file path
app.post('/api/uploadFile', (req, res) => {
  
	upload(req, res, err => {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		} else {
			// si la sauvegarde a fonctionné, on renvoi un status 200
			return res.status(200).json({file: "ok"});
		}
	});
});

app.listen(dotenv.parsed.PORT_SERVER, () => {
    console.log(`Server is listening on`, dotenv.parsed.PORT_SERVER);
  });



