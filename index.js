
// Setup Socket Server - so browser clients can connect and
// listen for updates.
var WebSocketServer = require("ws").Server

// Dependencies for REST interface.
var http = require("http")
var connect = require("connect")
var express = require("express")
var app = connect()

// Will parse POST body content.
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var port = process.env.PORT || 5000

// Set up MySQL connection.
var mysql = require("mysql")
var con = mysql.createConnection({
  host: "sherron.cq0y78xmuomp.us-east-1.rds.amazonaws.com",
  database: "hackathon",
  user: "admin",
  password: "admin1234"
});

con.connect(function(err){
  if(err){
    console.log(err);
    return;
  }
  console.log('Connection established');
});

// Set REST endpoint to add page views from Drupal to our DB.
app.use('/view_add', function (req, res, next) {

  // Parse POST info.
  var body = req.body;
  var insert_data = {
  	nid: body.nid, 
  	title: body.title, 
  	thumb: body.thumb,
  	type: body.type,
  	url: body.url,
  	view_count: 1
  }

  // Check for an existing record and update, else insert.
  var insert = "INSERT INTO popular_content SET ? ON DUPLICATE KEY UPDATE view_count = view_count + 1";
  insert_query = con.query(insert, insert_data, function(err, result) {
  	console.log(insert_query.sql);
  	// Update if one exists.
  })

  res.end('Success!');
});

// Handle default route to ask for a socket connection (client browser).
app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

// When a connection is established, periodically send updates every X seconds
// (currently 5).
wss.on("connection", function(ws) {
  
  var id = setInterval(function() {

  	var query = "SELECT * FROM popular_content ORDER BY 'view_count' DESC limit 3";

  	con.query(query, function(err,rows){
      if (err) throw err;
      ws.send(JSON.stringify(rows))
  	})    
  }, 5000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})

