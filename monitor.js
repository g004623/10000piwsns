var arryEndDevice = [2,24,36,2,25,36,18,18];
var agn0 = [4,4];
var agn1 = [1,4,4,2,1, 4,4,2,4,1, 4,4,1,4,4, 1,2,2,2,2, 2,2,2,2];
var agn2 = [2,4,2,3,3, 3,3,4,4,4, 4,3,3,3,3, 2,2,4,3,3, 3,3,2,4,2, 3,4,4,3,4, 4,3,3,2,2, 4];
var agn3 = [4,4];
var agn4 = [1,4,4,2,1, 4,4,2,4,1, 4,4,1,4,4, 1,2,2,2,2, 2,2,2,2];
var agn5 = [2,4,2,3,3, 3,3,4,4,4, 4,3,3,3,3, 2,2,4,3,3, 3,3,2,4,2, 3,4,4,3,4, 4,3,3,2,2, 4];
var agn6 = [3,3,3,4,4, 3,2,3,2,3, 2,3,4,4,3, 3,3,2];
var agn7 = [3,3,3,4,4, 3,2,3,2,3, 2,3,4,4,3, 3,3,2];

var fs = require('fs');
var logFile = 'eunwhoData.json';
var content = fs.readFileSync(logFile, 'utf8');
var WSNT = JSON.parse(content);

var tmp = JSON.stringify(WSNT);
//fs.writeFileSync('monitor.txt',O_APPEND,tmp, 'utf8');

var title = ['M','version','group','sensor#','MY', 'MP','SH','SL','DH','DL',
             '%V','S.V','B.V','C.T', 'C.V','DB','D.Id','NI','No.S'];
                                                                            
                                                                            

// tab \t   \n\r

var msg 	= WSNT[groupId][endDeiveId].endDevice.rxData;
var SensNum = WSNT[groupId][endDeiveId].endDevice.numSens;
var msg = WSNT[groupId][endDeiveId].endDevice.rxData;
var msg = WSNT[groupId][endDeiveId].endDevice.rxData;
var msg = WSNT[groupId][endDeiveId].endDevice.rxData;
var msg = WSNT[groupId][endDeiveId].endDevice.rxData;

var tmp = msg.split(",");
console.log("msg :", tmp);
if( tmp[0] === 'M'){
	var a = '';
	for(var i = 4 ; i < 19 ; i++){
		a = a + tmp[i] + '\t';
	}
	a + SensNum + '\t';
	
                                                                                                                   


fs.appendFile('monitor.txt',tmp, function(err){
	if(err)throw err;
	console.log (' The "data to append" was appended to file!);
});


        
