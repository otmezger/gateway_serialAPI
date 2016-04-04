var debugWithoutMongo = false;
var SerialPort = require("serialport");

/*
  ============================================================ DEFINITIONS
*/
var serialPort_1 = new SerialPort.SerialPort("/dev/serial/by-path/platform-3f980000.usb-usb-0:1.3:1.0-port0", {
  baudrate: 9600,
  parser: SerialPort.parsers.readline("\n")
  //parser: SerialPort.parsers.raw
});

var serialPort_2 = new SerialPort.SerialPort("/dev/serial/by-path/platform-3f980000.usb-usb-0:1.4:1.0-port0", {
  baudrate: 9600,
  parser: SerialPort.parsers.readline("\n")
  //parser: SerialPort.parsers.raw
});

//There is an openImmediately flag, defaults to true

if(!debugWithoutMongo){
    var mongoose = require('mongoose');
    var db = mongoose.connect('mongodb://localhost/sensors');
    //var db = mongoose.connect('mongodb://192.168.1.123/sensors');
    var DataPoint = require('./models/dataPointModel');
}
else{
    console.log("Starting without Mongo");
}


/*
  ============================================================ SERIAL 1
*/
serialPort_1.on("open", function () {
  console.log('open');
  serialPort_1.on('data', function(data) {
    processData(data);
  });
});

serialPort_1.on("close", function () {
  console.log('closed');
  reconnectArd(serialPort_1);
});

serialPort_1.on("error", function (err) {
  console.log('we had an error');
  console.log(err);
});




/*
  ============================================================ SERIAL 2
*/

serialPort_2.on("open", function () {
  console.log('open');
  serialPort_2.on('data', function(data) {
    processData(data);
  });
});

serialPort_2.on("close", function () {
  console.log('closed');
  reconnectArd(serialPort_2);
});

serialPort_2.on("error", function (err) {
  console.log('we had an error');
  console.log(err);
});

/*
  ============================================================ HELPERS
*/
var processData= function(data){
  if (data.length > 1){
    //deprecate all "empty" messages
    //console.log('######################### data received: ');
    console.log(new Date() + ' - ' + data);
    //console.log(data);
    try {
      dataParsed = JSON.parse(data);
      //console.log(new Date() + ' - ' + dataParsed);
      if (dataParsed.type == "status"){
        //console.log(dataParsed.data);
      }else if (dataParsed.type=="dataPoint"){
          dataParsed.data.value = dataParsed.data.value/100;
          if(!debugWithoutMongo){
              var dataPoint = new DataPoint(dataParsed.data);
              dataPoint.timestamp = new Date();
              //console.log(dataPoint);
              dataPoint.save();
          }
          else{
              console.log(" Data parsed not stored NO MONGO "+dataParsed);
          }
      }
    }catch(error){
      console.log('could not parse data');
      console.log(error);
    }

  }else{
    console.log('deprecated message too short');
  }
}



var reconnectArd = function (serialPort) {
  console.log('INITIATING RECONNECT');
  var tries = 10000;
  var success = false;
      do{
      setTimeout(function(){
    console.log('RECONNECTING TO ARDUINO');


	try{
    serialPort.open();
    success = true;
      }
	  catch(error){console.log(error); reconnectArd();}}

    //connectArd();
  , 2000);}while(tries-- && !success)
};
