//--- mongoose setting
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/wsns0');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'mongoose connection error'));
db.once('open',function(){
	console.log('Ok db connected');
});

var wsnSchema = mongoose.Schema({
	wsnData: String,
	date:{type:Date,default:Date.now}
});

var wsnDB1 = mongoose.model('wsnDB1',wsnSchema);

var arryEndDevice = [2,24,36,2,25,36,18,18];
var agn0 = [4,4];
var agn1 = [1,4,4,2,1, 4,4,2,4,1, 4,4,1,4,4, 1,2,2,2,2, 2,2,2,2];
var agn2 = [2,4,2,3,3, 3,3,4,4,4, 4,3,3,3,3, 2,2,4,3,3, 3,3,2,4,2, 3,4,4,3,4, 4,3,3,2,2, 4];

var agn3 = [4,4];
var agn4 = [1,4,4,2,1, 4,4,2,4,1, 4,4,1,4,4, 1,2,2,2,2, 2,2,2,2];
var agn5 = [2,4,2,3,3, 3,3,4,4,4, 4,3,3,3,3, 2,2,4,3,3, 3,3,2,4,2, 3,4,4,3,4, 4,3,3,2,2, 4];

var agn6 = [3,3,3,4,4, 3,2,3,2,3, 2,3,4,4,3, 3,3,2];
var agn7 = [2,3,3,3,4, 3,2,2,3,2, 3,2,2,4,3, 3,3,2];

var now = new Date(); 
var arrySensNo = [agn0,agn1,agn2,agn3,agn4,agn5,agn6, agn7]; 
var sensObj = {	enabled: true, sensId: 0, elapsed: now, oldStatus: [0,0,0,0,0,0], status: [0,0,0,0,0,0], 
				moving: true, rxData:'0000'};

var sensor = [sensObj,sensObj,sensObj,sensObj];

var mastCtrl = { numSens : 0, rxTime : now, oldRxTime : now, status : 0, rxData :'0000'};

var G0 = [], G1 = [], G2 = [], G3 = [], G4 = [], G5 = [], G6 = [], G7 = [];

var WSNT = [G0,G1,G2,G3,G4,G5,G6,G7];

for ( var i = 0 ; i < 8 ; i ++ ){

	var count = arryEndDevice[i]; 
	for ( var j = 0 ; j < count ; j ++){
		WSNT[i].push({
			endDevice : mastCtrl,
			sens : sensor
		});
	}
}

var fs = require('fs');


var now = new Date();
var logfile_name = now.getFullYear() +'_'+ now.getMonth() + "_" + now.getDay() +'.json';
var logFile = 'eunwhoData.json';
// Check that the file exists locally
if(!fs.existsSync(logFile)) {

  	console.log("File not found");

	var test = JSON.stringify(WSNT);
	fs.writeFileSync(logFile,test, 'utf8');
	fs.writeFileSync(logfile_name,test, 'utf8');

} else {
  // Read the file and do anything you want
	var content = fs.readFileSync(logFile, 'utf8');
	WSNT = JSON.parse(content);
}

// Pre-exit scripts
var preExit = [];
// Catch exit
process.stdin.resume();
process.on('exit',function(code) {
	var i;
	console.log('Process exit');

	for( i = 0; i < preExit.length; i++){
		preExit[i](code);
	}
	process.exit(code);
});

// Catch CTRL+C
process.on ('SIGINT', function () {
	
	console.log ('\nCTRL+C...');

	var test = JSON.stringify(WSNT);
	fs.writeFileSync(logfile_name,test, 'utf8');
	fs.writeFileSync(logFile,test, 'utf8');

	process.exit (0);
});

// Catch uncaught exception
process.on ('uncaughtException', function (err) {
  console.dir (err, { depth: null });
  process.exit (1);
});
// INSERT CODE
console.log ('App ready - hit CTRL+C ;)');

// Add pre-exit script
preExit.push (function (code) {
  console.log ('Whoa! Exit code %d, cleaning up...', code);
  // i.e. close database
});

// serve
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(7532);

app.get('/',function ( req,res){
	res.sendFile(__dirname +'/monitor.html');
});

app.get('/app.css', function (req, res) {
  res.sendfile(__dirname + '/app.css');  
});

app.get('/wsnObj',function ( request, response, next) {
	response.send(WSNT);
}); 


function sensProc(msg,x,y){

	var tmp1 = msg.split(",");

	var timeNow = new Date();

// L,2,43,300,620,649,691,722,669,655,281,3.29,CS44,21719,3
	var rxSensId = tmp1[1]*100 + tmp1[2]*1;
	var rxCount = tmp1[13] *1;
	var rxSensNum = tmp1[14] *1;
	var rxStatus = [0,0,0,0,0,0];
	var sensNum = arrySensNo[x][y];

	var notExistId = true;

	for ( var si = 0 ; si < sensNum ; si ++ ){  // must be added coding case not equal table of sensor number
		var sensIdSaved = WSNT[x][y].sens[si].sensId;  
		if( sensIdSaved === rxSensId){
			var notExistId = false;						
			var statusSaved = WSNT[x][y].sens[si].status;
			var savedDate   = new Date(WSNT[x][y].sens[si].elapsed);

			WSNT[x][y].sens[si].rxData = msg;
			WSNT[x][y].sens[si].oldStatus = statusSaved;
			WSNT[x][y].sens[si].status = rxStatus;						

			var msgSensSaved = WSNT[x][y].sens[si].rxData;
			var tmp2 = msgSensSaved.split(",");


			for( var k = 0 ; k < 6 ; k++){
				if( tmp1[4+k] < 100){ 
					rxStatus[k] = 1;
				} else if( tmp1[4+k] < (tmp2[4+k]-100)){ 
					rxStatus[k] = 1;
				}
			}
	//     find algorithm
			if( rxStatus ===  statusSaved ){
				console.log("Pin state not chaged");
				time = timeNow.getTime();
				savedTime = saveDate.getTime();
				elapsed = (time - savedTime())/1000/60/60;  // change to hour
 							
				if(elapsed > 48 ){ 
//--- sens stalled for 2 days 
					WSNT[x][y].sens[si].moving == false;
					WSNT[x][y].endDevice.status == 2;
					io.to('sensornet').emit('stalled',{x: y, y:x});
				}
			}else{
//--- sens moving 						
				console.log(" Group %d Id %d Pin %d moved",x,y,si+1);

				WSNT[x][y].sens[si].elapsed = timeNow;
				WSNT[x][y].sens[si].moving = true;
				var j = 0;
				do{
					if ( WSNT[x][y].sens[j].moving == false) break;				
					j ++;
				} while ( j < sensNum );
				if( j >= sensNum ){
//--- send nomal operation signal
					WSNT[x][y].endDevice.status = 1;
					break;
				}
				 io.to('sensornet').emit('endDevice',WSNT[x][y]);
				// io.to('sensornet').emit('received',{x: y, y:x});
			}	
		}
	}  
			// first rx sensor data
	if( notExistId == true){
		var temp = rxCount % rxSensNum;
		WSNT[x][y].sens[temp].sensId = rxSensId;
		WSNT[x][y].sens[temp].rxData = msg;
		WSNT[x][y].sens[temp].status = rxStatus;
	}
	io.to('sensornet').emit('received',{x: y, y:x});
}

function endDeviceProc(msg,x,y){
/*
M, version, group#, sensor#, MY, MP, SH, SL, DH, DL, %V, solar Volt, battery Volt, coreTemp, chip volt, 
	DB,NI, packet ID, number of sensors
Ex) M,717,5,33,C592,0,13A200,412585D0,0,0,D01,4.454,3.626,281,3.30,2B,ES01,1234,2\r\n   
*/
			
	var tmp1 = msg.split(",");
	var timeNow = new Date();
	var timeSaved =new Date( WSNT[x][x].endDevice.rxTime);  
	var a_min = (timeNow.getTime() - timeSaved.getTime()) /1000/60;


	console.log( 'elapsed time1 :',a_min); 						
	WSNT[x][y].endDevice.rxPeriod = a_min;	// saved minute
	WSNT[x][y].endDevice.oldRxTime = timeSaved; 
	WSNT[x][y].endDevice.rxTime	  = timeNow;  
	WSNT[x][y].endDevice.rxData = msg;  
	WSNT[x][y].endDevice.numSens = tmp1[18];  

	io.to('sensornet').emit('endDevice',WSNT[x][y]);
}


function socketProc(from,msg){

	var tmp1 = msg.split(",");
	var timeNow = new Date();

	try{
		if(( tmp1[0] === 'M' )&&(tmp1[16][0]==='G')){
			var x = Number(tmp1[16][1]);
			var y = tmp1[16][2] * 10 + tmp1[16][3]*1 - 1;

			endDeviceProc(msg,x,y);

			if(( x == 4 )&&(y == 11)){
				endDeviceProc(msg,1,11);
				endDeviceProc(msg,2,9);
			}
			if( (x==5)&&( y == 14 )){
					endDeviceProc(msg,2,26);
					endDeviceProc(msg,5,15);
			}
			if((x==1) && ( y == 22 )){
				endDeviceProc(msg,1,17);
				endDeviceProc(msg,2,35);
				endDeviceProc(msg,6,13);
			}
			if(( x == 4) && ( y == 14)){
				endDeviceProc(msg,4,10);
			}							
		}else if(( tmp1[0] === 'L') && (tmp1[12][0] === 'G')){
			var x = Number(tmp1[12][1]);
			var y = tmp1[12][2] * 10 + tmp1[12][3]*1 -1;

			sensProc(msg,x,y);

			if(( x == 4 )&&(y == 11)){
				sensProc(msg,1,11);
				sensProc(msg,2,9);
			}
			if( (x==5)&&( y == 14 )){
				sensProc(msg,2,26);
				sensProc(msg,5,15);
			}
			if((x==1) && ( y == 22 )){
				sensProc(msg,1,17);
				sensProc(msg,2,35);
				sensProc(msg,6,13);
			}
			if(( x == 4) && ( y == 13)){
				sensProc(msg,4,10);
			}							
		}

	}
	catch(error){
		console.log('try cach error', error.message);
	}
} 


io.on('connection',function(socket){

	socket.join('sensornet');

	console.log('Cooool now connected socket.io');
	
	// socket.emit('news',{hello:'world'});
	
	socket.on('CH0',function(from,msg){  // from backstay
		var wsnIn = new wsnDB1({wsnData:msg});
		wsnIn.save(function(err,wsnIn){
			if(err){
				console.log(err);
				return console.error(err);
			}else{
				console.log('CH0 SAVED :'+msg);
			}
		});
		socketProc(from,msg);
	});		

	socket.on('CH1',function(from,msg){  // from backstay
		var wsnIn = new wsnDB1({wsnData:msg});
		wsnIn.save(function(err,wsnIn){
			if(err){
				console.log(err);
				return console.error(err);
			}else{
				console.log('CH1 SAVED :'+msg);
			}
		});
		socketProc(from,msg);
	});		

	socket.on('clickDevice',function(data){
		console.log("sens1 Data: ",WSNT[data.y][data.x]);
		//console.log("sens3 Data: ",WSNT[data.y][data.x].sens[2].status);
		//console.log("sens4 Data: ",WSNT[data.y][data.x].snes[3].status);
		socket.emit('endDevice1',WSNT[data.y][data.x]);
	});	

	socket.on('reqGraph',function(data){
		console.log("reqGraph: ",data);
		// send db find data
	
		wsnDB1.find({$and:[{ "date" : {$lte:new Date(), $gte: new Date( new Date().setDate( new Date().getDate()-7))}},
			{"wsnData":{$regex:"L,4,3"}},
			{"wsnData":{$regex:".G718.*"}}]},
			{'wsnData':true,_id:false,'date':true},function( err, docs ){
        		if(err) {
            		console.log(err);
        		}else{
            		//console.log(docs[0].wsnData);
					//var test1 =[];
					var test = [];

					console.log(docs);
					for(var key in docs){
						
						var tmp1 = docs[key].wsnData.split(",");
						//test.push(test1);
						test.push([(docs[key].date)*1]);
						test[key].push( tmp1[4]*1);
						test[key].push( tmp1[5]*1);
						test[key].push( tmp1[6]*1);
						test[key].push( tmp1[7]*1);
						test[key].push( tmp1[8]*1);
						test[key].push( tmp1[9]*1);
					}

					for( var key in test[0]){
						test[0][key] = 0*1;
					}

					var timeNow = new Date();
					 
					test[0][0] = timeNow.getTime();
					console.log(test[0]);

					for( var key in test[1]){
						test[1][key] = 1000*1;
					}
					test[1][0] = timeNow.getTime() - 1000*60*60*24*7;
					console.log(test[1]);

					//socket.emit('graphData',docs);
					socket.emit('graphData',test);
        		}
    		}
		);
	});	
});
//--- end of codinater data
