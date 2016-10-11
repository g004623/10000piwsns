//--- mongoose setting


var arryEndDevice = [2,24,36,2,25,36,18,18];

var arryG0NumSens = [4,4];
var arryG1NumSens = [1,4,4,2,1, 4,4,2,4,1, 4,4,1,4,4, 1,2,2,2,2, 2,2,2,2];
var arryG2NumSens = [2,4,2,3,3, 3,3,4,4,4, 4,3,3,3,3, 2,2,4,3,3, 3,3,2,4,2, 3,4,4,3,4, 4,3,3,2,2, 4];

var arryG3NumSens = [4,4];
var arryG4NumSens = [1,4,4,2,1, 4,4,2,4,1, 4,4,1,4,4, 1,2,2,2,2, 2,2,2,2];
var arryG5NumSens = [2,4,2,3,3, 3,3,4,4,4, 4,3,3,3,3, 2,2,4,3,3, 3,3,2,4,2, 3,4,4,3,4, 4,3,3,2,2, 4];
var arryG6NumSens = [3,3,3,4,4, 3,2,3,2,3, 2,3,4,4,3, 3,3,2];
var arryG7NumSens = [3,3,3,4,4, 3,2,3,2,3, 2,3,4,4,3, 3,3,2];


var sensObj = {	enabled: true, sensId: 0, oldSensValue: 0, sensValue: 0, 
				moving: true,rxData			: '0000'
		};

var mastCtrl = { numSens : 0, rxTime : 0, oldRxTime : 0, isGood : 0, rxData : '00000'};

//--- group 0 
var G0 = [];
var count = arryEndDevice[0]; 
for ( var i = 0 ; i < count ; i ++){
	G0.push({
		endDevice : mastCtrl,
		sens1 : sensObj,
		sens2 : sensObj,
		sens3 : sensObj,
		sens4 : sensObj
	});
}

for ( var i = 0 ; i < count ; i ++){
	G0[i].endDevice.numSens = arryG0NumSens[i];
}

//--- group 1 

var G1 = [];
count = arryEndDevice[1]; 
for ( var i = 0 ; i < count ; i ++){
	G1.push({
		endDevice : mastCtrl,
		sens1 : sensObj,
		sens2 : sensObj,
		sens3 : sensObj,
		sens4 : sensObj
	});
}

for ( var i = 0 ; i < count ; i ++){
	G1[i].endDevice.numSens = arryG1NumSens[i];
}

//--- group 2
var G2 = [];
count = arryEndDevice[2]; 
for ( var i = 0 ; i < count ; i ++){
	G2.push({
		endDevice : mastCtrl,
		sens1 : sensObj,
		sens2 : sensObj,
		sens3 : sensObj,
		sens4 : sensObj
	});
}

for ( var i = 0 ; i < count ; i ++){
	G2[i].endDevice.numSens = arryG2NumSens[i];
}

//--- group 2
count = arryEndDevice[2]; 
for ( var i = 0 ; i < count ; i ++){
	G2.push({
		endDevice : mastCtrl,
		sens1 : sensObj,
		sens2 : sensObj,
		sens3 : sensObj,
		sens4 : sensObj
	});
}

for ( var i = 0 ; i < count ; i ++){
	G2[i].endDevice.numSens = arryG2NumSens[i];
}

//--- group 3
var G3 = [];
count = arryEndDevice[3]; 
for ( var i = 0 ; i < count ; i ++){
	G3.push({
		endDevice : mastCtrl,
		sens1 : sensObj,
		sens2 : sensObj,
		sens3 : sensObj,
		sens4 : sensObj
	});
}
for ( var i = 0 ; i < count ; i ++){
	G3[i].endDevice.numSens = arryG3NumSens[i];
}

//--- group 4
var G4 = [];
count = arryEndDevice[4]; 
for ( var i = 0 ; i < count ; i ++){
	G4.push({
		endDevice : mastCtrl,
		sens1 : sensObj,
		sens2 : sensObj,
		sens3 : sensObj,
		sens4 : sensObj
	});
}
for ( var i = 0 ; i < count ; i ++){
	G4[i].endDevice.numSens = arryG4NumSens[i];
}

//--- group 5
var G5 = [];
count = arryEndDevice[5]; 
for ( var i = 0 ; i < count ; i ++){
	G5.push({
		endDevice : mastCtrl,
		sens1 : sensObj,
		sens2 : sensObj,
		sens3 : sensObj,
		sens4 : sensObj
	});
}
for ( var i = 0 ; i < count ; i ++){
	G5[i].endDevice.numSens = arryG5NumSens[i];
}

//--- group 6
var G6 = [];
count = arryEndDevice[6]; 
for ( var i = 0 ; i < count ; i ++){
	G6.push({
		endDevice : mastCtrl,
		sens1 : sensObj,
		sens2 : sensObj,
		sens3 : sensObj,
		sens4 : sensObj
	});
}
for ( var i = 0 ; i < count ; i ++){
	G6[i].endDevice.numSens = arryG6NumSens[i];
}

//--- group 7
var G7 = [];
count = arryEndDevice[7]; 
for ( var i = 0 ; i < count ; i ++){
	G7.push({
		endDevice : mastCtrl,
		sens1 : sensObj,
		sens2 : sensObj,
		sens3 : sensObj,
		sens4 : sensObj
	});
}
for ( var i = 0 ; i < count ; i ++){
	G7[i].endDevice.numSens = arryG7NumSens[i];
}

//--- end of sensor table


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
	res.sendFile(__dirname +'/monitor.html');
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

	socket.join('sensornet');

	console.log('Cooool now connected socket.io');
	
	// socket.emit('news',{hello:'world'});
	
	socket.on('CH0',function(from,msg){
		//console.log(msg);
		
		try{

			test1 = msg.split(",");
			if(test1[0]  == 'M'){
				test2 = test1[16]
				console.log(test2);
				var groupNo = Number(test2[1]);
				var deviceNo = Number(test2.slice(2));
 				
				switch(groupNo){
				case 0:
					G0[deviceNo].endDevice.rxData = msg;
					G0[deviceNo].endDevice.oldRxTime = G0[deviceNo].endDevice.oldRxTime;
					G0[deviceNo].endDevice.rxTime = new Date();
					break;
					// G0[deviceNo].endDevice.isGood = ture;
					// G0[deviceNo].endDevice.rxData = msg;
				case 1:
					G1[deviceNo].endDevice.rxData = msg;
					G1[deviceNo].endDevice.oldRxTime = G0[deviceNo].endDevice.oldRxTime;
					G1[deviceNo].endDevice.rxTime = new Date();
					break;
				case 2:
					G2[deviceNo].endDevice.rxData = msg;
					G2[deviceNo].endDevice.oldRxTime = G0[deviceNo].endDevice.oldRxTime;
					G2[deviceNo].endDevice.rxTime = new Date();
					break;
				case 3:
					G3[deviceNo].endDevice.rxData = msg;
					G3[deviceNo].endDevice.oldRxTime = G0[deviceNo].endDevice.oldRxTime;
					G3[deviceNo].endDevice.rxTime = new Date();
					break;
				case 4:
					G4[deviceNo].endDevice.rxData = msg;
					G4[deviceNo].endDevice.oldRxTime = G0[deviceNo].endDevice.oldRxTime;
					G4[deviceNo].endDevice.rxTime = new Date();
					break;
				case 5:
					G5[deviceNo].endDevice.rxData = msg;
					G5[deviceNo].endDevice.oldRxTime = G0[deviceNo].endDevice.oldRxTime;
					G5[deviceNo].endDevice.rxTime = new Date();
					break;
				case 6:
					G6[deviceNo].endDevice.rxData = msg;
					G6[deviceNo].endDevice.oldRxTime = G0[deviceNo].endDevice.oldRxTime;
					G6[deviceNo].endDevice.rxTime = new Date();
					break;
				case 7:
					G7[deviceNo].endDevice.rxData = msg;
					G7[deviceNo].endDevice.oldRxTime = G0[deviceNo].endDevice.oldRxTime;
					G7[deviceNo].endDevice.rxTime = new Date();
					break;
				}				
			} else if(test1[0] == ['L']){
				test2 = test1[12]
				console.log(test2);
				var groupNo = Number(test2[1]);
				var deviceNo = Number(test2.slice(2));

				var sensId = test1[1] * 100 + test1[2];

				var numSensor = Number(test1[14]);

				var temp0, temp1, temp2,temp3,temp4
				temp0 =0;
				temp1 =0;
				temp2 =0;
				temp3 =0;
				temp4 =0;

				if( test1[4] > 100 ) temp0 = 1;
				if( test1[5] > 100 ) temp1 = 1;
				if( test1[6] > 100 ) temp2 = 1;
				if( test1[7] > 100 ) temp3 = 1;
				if( test1[8] > 100 ) temp4 = 1;

				var sensValue  = temp + temp1*2 + temp2 * 4 + temp3 * 8 + temp4 * 16; 

				switch( groupNo){

				case 0 : 				
					G0[deviceNo].sens1.rxData = msg;
					G0[deviceNo].endDevice.numSens = numSensor;
					tempSensId1 =  G0[deviceNo].sens1.sensId;
					tempSensId2 =  G0[deviceNo].sens2.sensId;
					tempSensId3 =  G0[deviceNo].sens3.sensId;
					tempSensId4 =  G0[deviceNo].sens4.sensId;

					if( sensId == tempSensId1){
						temp0 = G0[deviceNo].sens1.oldSensValue;
						temp1 = G0[deviceNo].sens1.sensValue = sensValue;
						G0[deviceNo].sens1.oldSensValue = temp1;
						G0[deviceNo].sens1.sensValue = sensValue;
						if( temp0 != temp1 ){
							G0[deviceNo].sens1.moving = true;
						}
					} else if( sensId == tempSensId2){
						temp0 = G0[deviceNo].sens2.oldSensValue;
						temp1 = G0[deviceNo].sens2.sensValue = sensValue;
						G0[deviceNo].sens2.oldSensValue = temp1;
						G0[deviceNo].sens2.sensValue = sensValue;
						if( temp0 != temp1 ){
							G0[deviceNo].sens2.moving = true;
						}
					} else if( sensId == tempSensId3){
						temp0 = G0[deviceNo].sens3.oldSensValue;
						temp1 = G0[deviceNo].sens3.sensValue = sensValue;
						G0[deviceNo].sens3.oldSensValue = temp1;
						G0[deviceNo].sens3.sensValue = sensValue;
						if( temp0 != temp1 ){
							G0[deviceNo].sens3.moving = true;
						}
					} else if( sensId == tempSensId4){
						temp0 = G0[deviceNo].sens4.oldSensValue;
						temp1 = G0[deviceNo].sens4.sensValue = sensValue;
						G0[deviceNo].sens4.oldSensValue = temp1;
						G0[deviceNo].sens4.sensValue = sensValue;
						if( temp0 != temp1 ){
							G0[deviceNo].sens4.moving = true;
						}
					} else {
						G0[deviceNo].sens1.sensId = sensId;
						G0[deviceNo].sens1.oldSensValue = sensValue;
						G0[deviceNo].sens1.sensValue    = sensValue;
					}
				
					break;

				case 1 : 				
					G1[deviceNo].sens1.rxData = msg;
					G1[deviceNo].endDevice.numSens = numSensor;
					tempSensId1 =  G1[deviceNo].sens1.sensId;
					tempSensId2 =  G1[deviceNo].sens2.sensId;
					tempSensId3 =  G1[deviceNo].sens3.sensId;
					tempSensId4 =  G1[deviceNo].sens4.sensId;

					if( sensId == tempSensId1){
						temp0 = G1[deviceNo].sens1.oldSensValue;
						temp1 = G1[deviceNo].sens1.sensValue = sensValue;
						G1[deviceNo].sens1.oldSensValue = temp1;
						G1[deviceNo].sens1.sensValue = sensValue;
						if( temp0 != temp1 ){
							G1[deviceNo].sens1.moving = true;
						}
					} else if( sensId == tempSensId2){
						temp0 = G1[deviceNo].sens2.oldSensValue;
						temp1 = G1[deviceNo].sens2.sensValue = sensValue;
						G1[deviceNo].sens2.oldSensValue = temp1;
						G1[deviceNo].sens2.sensValue = sensValue;
						if( temp0 != temp1 ){
							G1[deviceNo].sens2.moving = true;
						}
					} else if( sensId == tempSensId3){
						temp0 = G1[deviceNo].sens3.oldSensValue;
						temp1 = G1[deviceNo].sens3.sensValue = sensValue;
						G1[deviceNo].sens3.oldSensValue = temp1;
						G1[deviceNo].sens3.sensValue = sensValue;
						if( temp0 != temp1 ){
							G1[deviceNo].sens3.moving = true;
						}
					} else if( sensId == tempSensId4){
						temp0 = G0[deviceNo].sens4.oldSensValue;
						temp1 = G0[deviceNo].sens4.sensValue = sensValue;
						G1[deviceNo].sens4.oldSensValue = temp1;
						G1[deviceNo].sens4.sensValue = sensValue;
						if( temp0 != temp1 ){
							G1[deviceNo].sens4.moving = true;
						}
					} else {
						G1[deviceNo].sens1.sensId = sensId;
						G1[deviceNo].sens1.oldSensValue = sensValue;
						G1[deviceNo].sens1.sensValue    = sensValue;
					}
				
					break;

				case 2 : 				
					G2[deviceNo].sens1.rxData = msg;
					G2[deviceNo].endDevice.numSens = numSensor;
					tempSensId1 =  G2[deviceNo].sens1.sensId;
					tempSensId2 =  G2[deviceNo].sens2.sensId;
					tempSensId3 =  G2[deviceNo].sens3.sensId;
					tempSensId4 =  G2[deviceNo].sens4.sensId;

					if( sensId == tempSensId1){
						temp0 = G2[deviceNo].sens1.oldSensValue;
						temp1 = G2[deviceNo].sens1.sensValue = sensValue;
						G2[deviceNo].sens1.oldSensValue = temp1;
						G2[deviceNo].sens1.sensValue = sensValue;
						if( temp0 != temp1 ){
							G2[deviceNo].sens1.moving = true;
						}
					} else if( sensId == tempSensId2){
						temp0 = G2[deviceNo].sens2.oldSensValue;
						temp1 = G2[deviceNo].sens2.sensValue = sensValue;
						G2[deviceNo].sens2.oldSensValue = temp1;
						G2[deviceNo].sens2.sensValue = sensValue;
						if( temp0 != temp1 ){
							G2[deviceNo].sens2.moving = true;
						}
					} else if( sensId == tempSensId3){
						temp0 = G2[deviceNo].sens3.oldSensValue;
						temp1 = G2[deviceNo].sens3.sensValue = sensValue;
						G2[deviceNo].sens3.oldSensValue = temp1;
						G2[deviceNo].sens3.sensValue = sensValue;
						if( temp0 != temp1 ){
							G2[deviceNo].sens3.moving = true;
						}
					} else if( sensId == tempSensId4){
						temp0 = G2[deviceNo].sens4.oldSensValue;
						temp1 = G2[deviceNo].sens4.sensValue = sensValue;
						G2[deviceNo].sens4.oldSensValue = temp1;
						G2[deviceNo].sens4.sensValue = sensValue;
						if( temp0 != temp1 ){
							G2[deviceNo].sens4.moving = true;
						}
					} else {
						G2[deviceNo].sens1.sensId = sensId;
						G2[deviceNo].sens1.oldSensValue = sensValue;
						G2[deviceNo].sens1.sensValue    = sensValue;
					}
				
					break;
				case 3 : 				
					G3[deviceNo].sens1.rxData = msg;
					G3[deviceNo].endDevice.numSens = numSensor;
					tempSensId1 =  G3[deviceNo].sens1.sensId;
					tempSensId2 =  G3[deviceNo].sens2.sensId;
					tempSensId3 =  G3[deviceNo].sens3.sensId;
					tempSensId4 =  G3[deviceNo].sens4.sensId;

					if( sensId == tempSensId1){
						temp0 = G3[deviceNo].sens1.oldSensValue;
						temp1 = G3[deviceNo].sens1.sensValue = sensValue;
						G3[deviceNo].sens1.oldSensValue = temp1;
						G3[deviceNo].sens1.sensValue = sensValue;
						if( temp0 != temp1 ){
							G3[deviceNo].sens1.moving = true;
						}
					} else if( sensId == tempSensId2){
						temp0 = G3[deviceNo].sens2.oldSensValue;
						temp1 = G3[deviceNo].sens2.sensValue = sensValue;
						G3[deviceNo].sens2.oldSensValue = temp1;
						G3[deviceNo].sens2.sensValue = sensValue;
						if( temp0 != temp1 ){
							G3[deviceNo].sens2.moving = true;
						}
					} else if( sensId == tempSensId3){
						temp0 = G3[deviceNo].sens3.oldSensValue;
						temp1 = G3[deviceNo].sens3.sensValue = sensValue;
						G3[deviceNo].sens3.oldSensValue = temp1;
						G3[deviceNo].sens3.sensValue = sensValue;
						if( temp0 != temp1 ){
							G3[deviceNo].sens3.moving = true;
						}
					} else if( sensId == tempSensId4){
						temp0 = G3[deviceNo].sens4.oldSensValue;
						temp1 = G3[deviceNo].sens4.sensValue = sensValue;
						G3[deviceNo].sens4.oldSensValue = temp1;
						G3[deviceNo].sens4.sensValue = sensValue;
						if( temp0 != temp1 ){
							G3[deviceNo].sens4.moving = true;
						}
					} else {
						G3[deviceNo].sens1.sensId = sensId;
						G3[deviceNo].sens1.oldSensValue = sensValue;
						G3[deviceNo].sens1.sensValue    = sensValue;
					}
				
					break;
				case 4 : 				
					G4[deviceNo].sens1.rxData = msg;
					G4[deviceNo].endDevice.numSens = numSensor;
					tempSensId1 =  G4[deviceNo].sens1.sensId;
					tempSensId2 =  G4[deviceNo].sens2.sensId;
					tempSensId3 =  G4[deviceNo].sens3.sensId;
					tempSensId4 =  G4[deviceNo].sens4.sensId;

					if( sensId == tempSensId1){
						temp0 = G4[deviceNo].sens1.oldSensValue;
						temp1 = G4[deviceNo].sens1.sensValue = sensValue;
						G4[deviceNo].sens1.oldSensValue = temp1;
						G4[deviceNo].sens1.sensValue = sensValue;
						if( temp0 != temp1 ){
							G4[deviceNo].sens1.moving = true;
						}
					} else if( sensId == tempSensId2){
						temp0 = G4[deviceNo].sens2.oldSensValue;
						temp1 = G4[deviceNo].sens2.sensValue = sensValue;
						G4[deviceNo].sens2.oldSensValue = temp1;
						G4[deviceNo].sens2.sensValue = sensValue;
						if( temp0 != temp1 ){
							G4[deviceNo].sens2.moving = true;
						}
					} else if( sensId == tempSensId3){
						temp0 = G4[deviceNo].sens3.oldSensValue;
						temp1 = G4[deviceNo].sens3.sensValue = sensValue;
						G4[deviceNo].sens3.oldSensValue = temp1;
						G4[deviceNo].sens3.sensValue = sensValue;
						if( temp0 != temp1 ){
							G4[deviceNo].sens3.moving = true;
						}
					} else if( sensId == tempSensId4){
						temp0 = G4[deviceNo].sens4.oldSensValue;
						temp1 = G4[deviceNo].sens4.sensValue = sensValue;
						G4[deviceNo].sens4.oldSensValue = temp1;
						G4[deviceNo].sens4.sensValue = sensValue;
						if( temp0 != temp1 ){
							G4[deviceNo].sens4.moving = true;
						}
					} else {
						G4[deviceNo].sens1.sensId = sensId;
						G4[deviceNo].sens1.oldSensValue = sensValue;
						G4[deviceNo].sens1.sensValue    = sensValue;
					}
				
					break;
				case 5 : 				
					G5[deviceNo].sens1.rxData = msg;
					G5[deviceNo].endDevice.numSens = numSensor;
					tempSensId1 =  G5[deviceNo].sens1.sensId;
					tempSensId2 =  G5[deviceNo].sens2.sensId;
					tempSensId3 =  G5[deviceNo].sens3.sensId;
					tempSensId4 =  G5[deviceNo].sens4.sensId;

					if( sensId == tempSensId1){
						temp0 = G5[deviceNo].sens1.oldSensValue;
						temp1 = G5[deviceNo].sens1.sensValue = sensValue;
						G5[deviceNo].sens1.oldSensValue = temp1;
						G5[deviceNo].sens1.sensValue = sensValue;
						if( temp0 != temp1 ){
							G5[deviceNo].sens1.moving = true;
						}
					} else if( sensId == tempSensId2){
						temp0 = G5[deviceNo].sens2.oldSensValue;
						temp1 = G5[deviceNo].sens2.sensValue = sensValue;
						G5[deviceNo].sens2.oldSensValue = temp1;
						G5[deviceNo].sens2.sensValue = sensValue;
						if( temp0 != temp1 ){
							G5[deviceNo].sens2.moving = true;
						}
					} else if( sensId == tempSensId3){
						temp0 = G5[deviceNo].sens3.oldSensValue;
						temp1 = G5[deviceNo].sens3.sensValue = sensValue;
						G5[deviceNo].sens3.oldSensValue = temp1;
						G5[deviceNo].sens3.sensValue = sensValue;
						if( temp0 != temp1 ){
							G5[deviceNo].sens3.moving = true;
						}
					} else if( sensId == tempSensId4){
						temp0 = G5[deviceNo].sens4.oldSensValue;
						temp1 = G5[deviceNo].sens4.sensValue = sensValue;
						G5[deviceNo].sens4.oldSensValue = temp1;
						G5[deviceNo].sens4.sensValue = sensValue;
						if( temp0 != temp1 ){
							G5[deviceNo].sens4.moving = true;
						}
					} else {
						G5[deviceNo].sens1.sensId = sensId;
						G5[deviceNo].sens1.oldSensValue = sensValue;
						G5[deviceNo].sens1.sensValue    = sensValue;
					}
				
					break;
				case 6 : 				
					G6[deviceNo].sens1.rxData = msg;
					G6[deviceNo].endDevice.numSens = numSensor;
					tempSensId1 =  G6[deviceNo].sens1.sensId;
					tempSensId2 =  G6[deviceNo].sens2.sensId;
					tempSensId3 =  G6[deviceNo].sens3.sensId;
					tempSensId4 =  G6[deviceNo].sens4.sensId;

					if( sensId == tempSensId1){
						temp0 = G6[deviceNo].sens1.oldSensValue;
						temp1 = G6[deviceNo].sens1.sensValue = sensValue;
						G6[deviceNo].sens1.oldSensValue = temp1;
						G6[deviceNo].sens1.sensValue = sensValue;
						if( temp0 != temp1 ){
							G6[deviceNo].sens1.moving = true;
						}
					} else if( sensId == tempSensId2){
						temp0 = G6[deviceNo].sens2.oldSensValue;
						temp1 = G6[deviceNo].sens2.sensValue = sensValue;
						G6[deviceNo].sens2.oldSensValue = temp1;
						G6[deviceNo].sens2.sensValue = sensValue;
						if( temp0 != temp1 ){
							G6[deviceNo].sens2.moving = true;
						}
					} else if( sensId == tempSensId3){
						temp0 = G6[deviceNo].sens3.oldSensValue;
						temp1 = G6[deviceNo].sens3.sensValue = sensValue;
						G6[deviceNo].sens3.oldSensValue = temp1;
						G6[deviceNo].sens3.sensValue = sensValue;
						if( temp0 != temp1 ){
							G6[deviceNo].sens3.moving = true;
						}
					} else if( sensId == tempSensId4){
						temp0 = G6[deviceNo].sens4.oldSensValue;
						temp1 = G6[deviceNo].sens4.sensValue = sensValue;
						G6[deviceNo].sens4.oldSensValue = temp1;
						G6[deviceNo].sens4.sensValue = sensValue;
						if( temp0 != temp1 ){
							G6[deviceNo].sens4.moving = true;
						}
					} else {
						G6[deviceNo].sens1.sensId = sensId;
						G6[deviceNo].sens1.oldSensValue = sensValue;
						G6[deviceNo].sens1.sensValue    = sensValue;
					}
				
					break;
				case 7 : 				
					G7[deviceNo].sens1.rxData = msg;
					G7[deviceNo].endDevice.numSens = numSensor;
					tempSensId1 =  G7[deviceNo].sens1.sensId;
					tempSensId2 =  G7[deviceNo].sens2.sensId;
					tempSensId3 =  G7[deviceNo].sens3.sensId;
					tempSensId4 =  G7[deviceNo].sens4.sensId;

					if( sensId == tempSensId1){
						temp0 = G7[deviceNo].sens1.oldSensValue;
						temp1 = G7[deviceNo].sens1.sensValue = sensValue;
						G7[deviceNo].sens1.oldSensValue = temp1;
						G7[deviceNo].sens1.sensValue = sensValue;
						if( temp0 != temp1 ){
							G7[deviceNo].sens1.moving = true;
						}
					} else if( sensId == tempSensId2){
						temp0 = G7[deviceNo].sens2.oldSensValue;
						temp1 = G7[deviceNo].sens2.sensValue = sensValue;
						G7[deviceNo].sens2.oldSensValue = temp1;
						G7[deviceNo].sens2.sensValue = sensValue;
						if( temp0 != temp1 ){
							G7[deviceNo].sens2.moving = true;
						}
					} else if( sensId == tempSensId3){
						temp0 = G7[deviceNo].sens3.oldSensValue;
						temp1 = G7[deviceNo].sens3.sensValue = sensValue;
						G7[deviceNo].sens3.oldSensValue = temp1;
						G7[deviceNo].sens3.sensValue = sensValue;
						if( temp0 != temp1 ){
							G7[deviceNo].sens3.moving = true;
						}
					} else if( sensId == tempSensId4){
						temp0 = G7[deviceNo].sens4.oldSensValue;
						temp1 = G7[deviceNo].sens4.sensValue = sensValue;
						G7[deviceNo].sens4.oldSensValue = temp1;
						G7[deviceNo].sens4.sensValue = sensValue;
						if( temp0 != temp1 ){
							G7[deviceNo].sens4.moving = true;
						}
					} else {
						G7[deviceNo].sens1.sensId = sensId;
						G7[deviceNo].sens1.oldSensValue = sensValue;
						G7[deviceNo].sens1.sensValue    = sensValue;
					}
				
					break;
				}
					
				if( 

				var data ={ x: 0,y:0};
 				var test2 = test1[12];
				console.log(test2);

				} else if 



				G2[test3].mastCtrl.rxData = msg;
				console.log(G2[test3].mastCtrl.rxData);
				var test3 = Number(test2.slice(2));
				

/*			

			if( test2[0] === 'G'){
				var test3 = Number(test2.slice(2));
				var test4 = Number(test2[1]); // group number
				if((test4 < 0) AND ( test4 > 9){
					// not number 
				} else{
					GroupId = test4;
					
*/				
}

				

			} else if( test2[0] === 'C'){
				var test3 = Number(test2.slice(2));
				//console.log(test3);
				G2[test3].mastCtrl.rxData = msg;
				console.log(G2[test3].mastCtrl.rxData);

				io.to('sensornet').emit('reserve',{
					x: test3,
					y: 2
				});
			
			} else {
				console.log("Invalid Sensor Number");
			}
		}		
	});

	socket.on('reserve',function(data){
		console.log("Receive from html",data);
		//socket.emit('activ',data);
		socket.emit('reserve',{
			x : 10,
			y : 2
		});
	});	
});
//--- end of codinater data
