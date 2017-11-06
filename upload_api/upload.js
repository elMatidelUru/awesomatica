var express = require("express")
var multer = require('multer')
var app = express()
var path = require('path')
const PORT = 4000;

/*var ejs = require('ejs')
app.set('view engine', 'ejs')

app.get('/api/file', function(req, res) {
	res.render('index')
})*/

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, '/var/www')
	},
	filename: function(req, file, callback) {
		callback(null, "fotoavisos_" + file.fieldname + path.extname(file.originalname))
	}
})

app.post('/upload_aviso', function(req, res) {
	console.log(" Got a request : " + req.url);
	var upload = multer({
		storage: storage,
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname)
			
			if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
				return callback(res.end('Only images are allowed'), null)
			}
			callback(null, true)
		}
	}).single('userFile');
	upload(req, res, function(err) {
		console.log(" Success! " + JSON.stringify(req));
		res.end('File is uploaded')
	})
})

app.listen(PORT, function() {
	console.log('Node.js listening on port ' + PORT)
})
