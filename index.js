var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var mysql = require("mysql");

var app = express()
var port = process.env.PORT || 5000

var con = mysql.createConnection({
  host: "sherron.cq0y78xmuomp.us-east-1.rds.amazonaws.com",
  database: "hackathon",
  user: "admin",
  password: "admin1234"
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

  	var id = setInterval(function() {
      ws.send(JSON.stringify(rows))
    }, 5000)
  })

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})
