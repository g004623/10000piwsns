
//--- mongoose setting

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
	db.on('error', console.error.bind(console,'connection error:'));
	db.once('open',function(){
	// we're connected
});

var schema = mongoose.Schema({
	G0: [Number],
	G1: [Number],
	G2: [Number],
	G3: [Number],
	G4: [Number],
	G5: [Number],
	G6: [Number],
	G7: [Number],	
	date:{type:Date,default:Date.now}
});

var distribute = mongoose.model('distribute',schema);

var check_now = new distribute;

check_now.G0.unshift(1,1);
check_now.G1.unshift(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
check_now.G2.unshift(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
check_now.G3.unshift(1,1);
check_now.G4.unshift(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
check_now.G5.unshift(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);

check_now.G6.unshift(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
check_now.G7.unshift(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);

console.log(check_now);

var seats = [
   //[ 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
	[ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 3, 3, 3, 3, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 3, 3, 3, 3, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[ 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(function(req,res, next){
	res.io = io;
	next();
});


//--- socket for rxd xbee codinator 

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection',function(socket){
	console.log('Cooool now connected socket.io');
	
	socket.on('CH0',function(from,msg){
		console.log(msg);
	});
});

http.listen(8080,function(){
	console.log('socket listening on : 8080');
});
//--- end of codinater data


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));

// not use 4.x
//app.use('/', routes);

//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// creat Web servers

//app.get('/',function ( req, res) {
//	res.set('content-type','text/html');
//	res.send(fs.readFileSync("monitor.html",'utf8'));
//	res.end();
//}); 

app.get('/seats',function ( request, response, next) {
	//response.send(seats);

	for ( i = 0, item ; item = check_now.G0[i] ; i++){
		seats[0][i] = item;
	}
	for ( i = 0, item ; item = check_now.G1[i] ; i++){
		seats[0][i] = item;
	}
	for ( i = 0, item ; item = check_now.G2[i] ; i++){
		seats[0][i] = item;
	}
	for ( i = 0, item ; item = check_now.G3[i] ; i++){
		seats[0][i] = item;
	}
	for ( i = 0, item ; item = check_now.G4[i] ; i++){
		seats[0][i] = item;
	}
	for ( i = 0, item ; item = check_now.G5[i] ; i++){
		seats[0][i] = item;
	}
	for ( i = 0, item ; item = check_now.G6[i] ; i++){
		seats[0][i] = item;
	}
	for ( i = 0, item ; item = check_now.G7[i] ; i++){
		seats[0][i] = item;
	}
	response.send(seats);
}); 


// execute web server
//var server = http.createServer(app);

app.get('/',function(req,res){
	res.send('Hello world');
});

app.listen(3000,function(){
	console.log('Server Running at http://127.0.0.1:3000');
});

server.listen(7532,function(){
	console.log('Server Running at http://127.0.0.1:7532');
});

// socket server 
//var io = socketio.listen(server);

io.sockets.on('connection',function(socket) {
	socket.on('reserve',function(data){
		seats[data.y][data.y] ++;
		io.sockets.emit('reserve',data);
	});
});


module.exports = {app: app,server:server};
