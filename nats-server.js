// Nats stuffs
const NATS = require('nats');
const nats = NATS.connect();
const fs = require('fs');
const url = require('url');
const path = require('path');
// Require HTTP module (to start server, HapiJs will work too) and Socket.IO
const http = require('http'), io = require('socket.io');

// Start the server at port 8088
var server = http.createServer(function(req, res){ 
	//
	const parsedUrl = url.parse(req.url);
	// read file from file system
	let pathname = `.${parsedUrl.pathname}`;
	const mimeType = {
		'.ico': 'image/x-icon',
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.json': 'application/json',
		'.css': 'text/css',
		'.png': 'image/png',
		'.jpg': 'image/jpeg'
	};

	// if is a directory, then look for index.html
	if (fs.statSync(pathname).isDirectory()) {
		pathname += '/index.html';
	}
    fs.readFile(pathname, function(err, data){
		if(err){
		  res.statusCode = 500;
		  res.end(`Error getting the file: ${err}.`);
		} else {
		 const ext = path.parse(pathname).ext;
		 console.log(ext);
		  // if the file is found, set Content-type and send data
		  res.setHeader('Content-type',  mimeType[ext] || 'text/plain' );
		  res.end(data);
		}
	  });
});
server.listen(8088);
  
// Create a Socket.IO instance, passing it our server
var socket = io.listen(server);

// Add a connect listener
socket.on('connection', function(client){ 
	
	// Create periodical which ends a message to the client every 5 seconds
	//var interval = setInterval(function() {
		// client.send('<img src="kraken.jpg" height="36px" height="36px" />The KrakenZed Message from the server!   ' + new Date().getTime());
	//},5000);
    // messages from NATS
    nats.subscribe('foo', function(msg) {
        client.send ('<div><img src="kraken.png" height="18px" height="18px" float="left" /> Received a Kraken: </div><div>' + msg + '</div>');
    });

	// Success!  Now listen to messages to be received
	client.on('message',function(event){ 
		console.log('Received message from client!',event);
	});
	client.on('disconnect',function(){
		// clearInterval(interval);
		console.log('Server has disconnected');
	});
	
});