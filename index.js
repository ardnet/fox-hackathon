var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  
  var dummy_data = [
    {
      'nid': 182786,
      'title': 'Home Again',
      'thumb': '/sites/default/files/styles/full_episodes_rotator_thumbnail/public/video-image-thumb/fox_TheXFiles_1AYW02_hulu.jpg',
      'type': 'video',
      'url': '/watch/616557123886/7756658688' 
    },
    {
      'nid': 187501,
      'title': 'Mr. Freeze',
      'thumb': '/sites/default/files/styles/full_episodes_rotator_thumbnail/public/video-image-thumb/Gotham_GTH212_2500_1280x720_633837635777.jpg',
      'type': 'video',
      'url': '/watch/633284675626/7684182528'
    },
    {
      'nid': 188896,
      'title': 'Wingman',
      'thumb': '/sites/default/files/styles/full_episodes_rotator_thumbnail/public/video-image-thumb/fox_Lucifer_L106_hulu.jpg',
      'type': 'video',
      'url': '/watch/638578243933/7766097408'
    }
  ];

  var id = setInterval(function() {
    ws.send(JSON.stringify(dummy_data))
  }, 5000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})
