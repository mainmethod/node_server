var http = require("http");
var mysql = require('mysql');

var db = mysql.createConnection({
	host: '<host>',
	user: '<user>',
	password: '<password>'
});

http.createServer(function (request, response) {
	response.writeHead(200, {
	   'Content-Type': 'text/plain'
	});
	db.connect(function(error){
		if(error != null){
			response.end("Error connecting to database: " + error);
		}
	});
	
	db.query("SHOW databases;",function(error,rows){
		if(error == null){
			response.end(JSON.stringify(rows));
		}else{
			response.end("Error querying database: " + error);
		}
	});
	
}).listen(8080);