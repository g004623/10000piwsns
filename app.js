
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

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

server.listen(7532);

app.get('/',function ( req,res){
	res.sendfile(__dirname +'/monitor.html');
});

app.get('/seats',function ( request, response, next) {
	//response.send(seats);
	var i ;
	for ( i in check_now.G0) { seats[0][i] = 1;}
	for ( i in check_now.G1) { seats[1][i] = 1;}
	for ( i in check_now.G2) { seats[2][i] = 1;}
	for ( i in check_now.G3) { seats[3][i] = 1;}
	for ( i in check_now.G4) { seats[4][i] = 1;}
	for ( i in check_now.G5) { seats[5][i] = 1;}
	for ( i in check_now.G6) { seats[6][i] = 1;}
	for ( i in check_now.G7) { seats[7][i] = 1;}
	response.send(seats);
}); 

io.on('connection',function(socket){

	console.log('Cooool now connected socket.io');
	
	// socket.emit('news',{hello:'world'});
	
	socket.on('CH0',function(from,msg){
		console.log(msg);
	});

	socket.on('reserve',function(data){
		seats[data.y][data.y] =3;
		socket.emit('activ',data);
	});	
	
});


//--- end of codinater data
