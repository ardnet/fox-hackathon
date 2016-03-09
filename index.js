var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var mysql = require("mysql");

var app = express()
var port = process.env.PORT || 5000
console.log(process.env.DATABASE_URL);

var con = mysql.createConnection({
  host: process.env.DATABASE_URL,
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  
  var query = "SELECT * FROM popular_content ORDER BY 'view_count' DESC limit 3";

  con.query(query, function(err,rows){
  	if (err) throw err;

  	console.log('Data received from Db:\n');
  	console.log(rows);
  })

  var id = setInterval(function() {
    ws.send(JSON.stringify(rows))
  }, 5000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})
