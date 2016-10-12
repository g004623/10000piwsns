//--- mongoose setting

var arryEndDevice = [2,24,36,2,25,36,18,18];

var agn0 = [4,4];
var agn1 = [1,4,4,2,1, 4,4,2,4,1, 4,4,1,4,4, 1,2,2,2,2, 2,2,2,2];
var agn2 = [2,4,2,3,3, 3,3,4,4,4, 4,3,3,3,3, 2,2,4,3,3, 3,3,2,4,2, 3,4,4,3,4, 4,3,3,2,2, 4];

var agn3 = [4,4];
var agn4 = [1,4,4,2,1, 4,4,2,4,1, 4,4,1,4,4, 1,2,2,2,2, 2,2,2,2];
var agn5 = [2,4,2,3,3, 3,3,4,4,4, 4,3,3,3,3, 2,2,4,3,3, 3,3,2,4,2, 3,4,4,3,4, 4,3,3,2,2, 4];
var agn6 = [3,3,3,4,4, 3,2,3,2,3, 2,3,4,4,3, 3,3,2];
var agn7 = [3,3,3,4,4, 3,2,3,2,3, 2,3,4,4,3, 3,3,2];

var arrySensNo = [agn0,agn1,agn2,agn3,agn4,agn5,ang6, agn7]; 

var sensObj = {	enabled: true, sensId: 0, elapsed: new Date(), oldStatus: [1,1,1,1,1], status: [1,1,1,1,1], 
				moving: true, rxData: '0000'
		};

var mastCtrl = { numSens : 0, rxTime : 0, oldRxTime : 0, status : 0, rxData : '00000'};

var G0 = [], G1 = [], G2 = [], G3 = [], G4 = [], G5 = [], G6 = [], G7 = [];

var WSNT = [G0,G1,G2,G3,G4,G5,G6,G7];
var seats = WSNT;

var sensor = [sensObj,sensObj,sensObj,sensObj];

for ( i = 0 ; i < 8 ; i ++ ){
	var count = arryEndDevice[i]; 

	for ( var j = 0 ; j < count ; j ++){
		WSNT[i].push({
			endDevice : mastCtrl,
			sens : sensor
		});
		seats[i].push(0);
	}
	//--- init number of sensor in endDevice.
	for ( var j = 0 ; j < count ; j ++){
		 WSNT[i][j].endDevice.numSensor = arry[i][j];
	}	
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
	db.on('error', console.error.bind(console,'connection error:'));
	db.once('open',function(){
	// we're connected
});

var schema = mongoose.Schema({
	stae : WSNT
	date:{type:Date,default:Date.now}
});

var distribute = mongoose.model('distribute',schema);

var check_now = new distribute;


var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

server.listen(7532);

app.get('/',function ( req,res){
	res.sendFile(__dirname +'/monitor.html');
});

app.get('/wsnObj',function ( request, response, next) {
	response.send(WSNT);
}); 

io.on('connection',function(socket){

	socket.join('sensornet');

	console.log('Cooool now connected socket.io');
	
	// socket.emit('news',{hello:'world'});
	
	socket.on('CH0',function(from,msg){
		var tmp1 = msg.split(",");
		try{
			if(( tmp1[0] === M )&&(tmp1[16][0]==='G')){
/*
M, version, group#, sensor#, MY, MP, SH, SL, DH, DL, %V, solar Volt, battery Volt, coreTemp, chip volt, 
	DB,NI, packet ID, number of sensors
Ex) M,717,5,33,C592,0,13A200,412585D0,0,0,D01,4.454,3.626,281,3.30,2B,ES01,1234,2\r\n   
*/
				var groupNo = Number(tmp1[16][1]);
				var distId = tmp1[16][2] * 10 + tmp1[16][3]*1;

				var timeNow = new Date();
				var timeSaved = WSNT[groupNo][distId].rxTime;  
				if( timeSaved == 0){ 
					WSNT[groupNo][distId].endDevice.rxPeriod =0;
				} else {
					var a_min = (timeNow.getTime() - timeSaved.getTime())/1000/60;						
					WSNT[groupNo][distId].endDevice.rxPeriod = a_min;	// saved minute
				}	
				WSNT[groupNo][distId].endDevice.oldRxTime = timeSaved; 
				WSNT[groupNo][distId].endDevice.rxTime	  = timeNow;  
				
				WSNT[groupNo][distId].endDevice.rxData = msg;  
				WSNT[groupNo][distId].endDevice.numSens = tmp1[19];  

			} else if( (tmp1[0] === 'L')&&(temp[12][0]==='G')){
				// L,2,43,300,620,649,691,722,669,655,281,3.29,CS44,21719,3

				var rxGroupId = Number(tmp1[12][1]);
				var rxDistId = tmp1[12][2] * 10 + tmp1[12][3]*1;
				var rxSensId = tmp1[1]*100 + temp1[2]*1;
				var rxSensNum = tmp1[14] *1;

				var rxStatus = [1,1,1,1,1];
				for( var i = 0 ; i < 5 ; i++){
					if( tmp1[4+i] < 100) rxStatus[i] = 0;
				}

				var notExistId = true;

				for ( var i = 0 ; i < rxSensNum ; i ++ ){  // must be added coding case not equal table of sensor number

					var sensIdSaved = WSNT[rxGroupId][distId].sens.sensor[i].sensId;  

					if( sensIdSaved === rxSensId){

						notExistId = false;						
						statusSaved = WSNT[rxGroupId][distId].sens.sensor[i].status;
						savedDate   = WSNT[rxGroupId][distId].sens.sensor[i].elapsed;
						nowDate     = new Date();

						WSNT[groupNo][distId].sens.sensor[i].rxData = msg;
						WSNT[groupNo][distId].sens.sensor[i].oldStatus = statusSaved;
						WSNT[groupNo][distId].sens.sensor[i].status = rxStatus;						

						//     find algorithm
						if( rxStatus !=  statusSaved ){
//--- sens moving 						
							WSNT[groupNo][distId].sens.sensor[i].elapsed = nowDate();
							WSNT[groupNo][distId].sens.sensor[i].moving = true;

							var j = 0;
							do{
								if ( WSNT[groupNo][distId].sens.sensor[j].moving == false) break;
								j ++;
							} while ( j < rxSensNum );
							
							if( j >= rxSensNum ){
//--- send nomal operation signal
								WSNT[groupNo][distId].endDevice.status = true;
								io.to('sensornet').emit('moving',{x: rxSensId, y:rxGroupId});
							}
							break;
						} else {

							time = dateNow.getTime();
							savedTime = saveDate.getTime();

							elapsed = (time - savedTime())/1000/60/60;  // change to hour
 							
							if(elapsed > 48 ){ 
//--- sens stalled for 2 days 
								WSNT[groupNo][distId].sens.sensor[i].moving == false);
								WSNT[groupNo][distId].endDevice.status == false);
								io.to('sensornet').emit('stalled',{x: rxSensId, y:rxGroupId});
							}
						}	
					}
				}  
				
				// first rx sensor data
				if( notExistId == true){
					for ( var i = 0 ; i < rxSensNum ; i ++ ){  
						// must be added coding case not equal 0 for all sensor id.
						var sensIdSaved = WSNT[rxGroupId][distId].sens.sensor[i].sensId;  
						if( sensIdSaved == 0){
							WSNT[groupNo][distId].sens.sensor[i].sensId = rxSensId;
							WSNT[groupNo][distId].sens.sensor[i].rxData = msg;
							WSNT[groupNo][distId].sens.sensor[i].status = rxStatus;
						}
					}						
					WSNT[groupNo][distId].endDevice.isGood = true;
					io.to('sensornet').emit('rxSensMsg',{x: rxSensId, y:rxGroupId});
				}
			}
		}
		cach{
		}
	});		

	socket.on('reserve',function(data){
		console.log("Receive from html",data);
		//socket.emit('activ',data);
/*
		socket.emit('reserve',{
			x : 10,
			y : 2
		});
*/
	});	

});
//--- end of codinater data
