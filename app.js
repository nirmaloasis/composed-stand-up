var express = require('express');
var path = require('path');
var http  = require('http')
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const socketIo = require('socket.io')
var fs = require('fs')
var standUpFilePath = __dirname + '/data/stand-up-data.json'

var membersList = [ 
  "Abdul Ahad",
  "Abhishek Kumar",
  "Animesh Parial",
  "Anish Kumar",
  "Anusha Pakalakunja",
  "Ashish Verma",
  "Bharat Rathad",
  "Chandramouli M S",
  "Dikshita Khandke",
  "Dinesh kumar Suvendrian",
  "Divya Chandrasekaran",
  "Geeta Hubli",
  "Harish Onkarappa",
  "Hemasundara Naidu",
  "Himanshu Kumar",
  "Jimit Mehta",
  "John Paul",
  "Jotsna M Babu",
  "Krishn Kant Nayak",
  "Kumar Sameer Ranjan",
  "Lavanya Gowlla",
  "Meenu Sharma",
  "Naveen Telker",
  "Nirmal PS",
  "Pankaj Maurya",
  "Praveen Kumar K",
  "Raja Madhu",
  "Rakesh Dutta",
  "Rakesh Shastry",
  "Ramandeep Kaur",
  "Rohit Kumar",
  "Senthil Basuva Raj",
  "Shashank Goyal",
  "Srinivas Reddy",
  "Shree Lakshmi",
  "Shreyansh Kant",
  "Thirupathi M",
  "Vinod Subramanian",
  "Sumit Kumar",
  "Swapnil Shah",
  "Vinit Rohela",
  "Vivek"
]

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

const server = http.createServer(app)
const io = socketIo(server)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || 8080
app.set('port', port);
var preLoadedData 

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('sUpdata',()=>{
    fs.readFile(standUpFilePath, 'utf8', function readFileCallback(err, data){
      if (err) {
        return console.log(err);
      }
      preLoadedData = JSON.parse(data)
      io.emit('sUpdata', preLoadedData);
    });
  })

  socket.on('add-newFaces', function(standUpData){
    console.log('message: ' , standUpData);
    standUpData.lastModifiedNewFaces = new Date().toDateString()
    json = JSON.stringify(standUpData, null, 3); 
    fs.writeFile(standUpFilePath, json, 'utf8',()=>{
      io.emit('add-newFaces', standUpData);
    });
  });

  socket.on('add-content', function(req){
      preLoadedData[req.contentType] = req.content
      console.log("add = load ===>",preLoadedData)
      req.contentType = "interestings" ? preLoadedData.lastModifiedInterestings = new Date().toDateString() : ""
      var json = JSON.stringify(preLoadedData, null, 3); 
      fs.writeFile(standUpFilePath, json, 'utf8',()=>{
        io.emit('add-content', preLoadedData);
      });
  });

  socket.on('reset-sUpdata', function(standUpData){
    preLoadedData = standUpData
    json = JSON.stringify(standUpData, null, 3); 
    fs.writeFile(standUpFilePath, json, 'utf8',()=>{
      io.emit('reset-sUpdata', standUpData);
    });
  });

  socket.on('facilitator', function(req){
    var standUpData = preLoadedData
    var temp = standUpData.notDoneList
    var doneList= standUpData["doneList"]
    var notDoneList
    if(temp.length > 0 ){
      notDoneList = temp
    }
    else{
      notDoneList = membersList
      doneList = []
    }
    var currentFacilitator = standUpData["currentFacilitator"]
    var randomIndex = Math.floor((notDoneList.length) * Math.random())
    var nextFacilitator = notDoneList[randomIndex];
    temp.splice(randomIndex,1)
    var writeBackObject = standUpData

    if(!req.notPresent){
      (temp.length >0) ? doneList.push(currentFacilitator) : ""
      writeBackObject.date = new Date().toDateString()
    }
    else{
      notDoneList.push(currentFacilitator)
      notDoneList.sort()
    }
    writeBackObject.currentFacilitator = nextFacilitator
    writeBackObject.notDoneList = notDoneList
    writeBackObject.doneList = doneList
    preLoadedData = writeBackObject
    var json = JSON.stringify(writeBackObject, null, 3); 
    fs.writeFile(standUpFilePath, json, 'utf8',()=>{
      io.emit('facilitator', preLoadedData);
    });
  });

  socket.on('letsClap', function(req){
    var standUpData = preLoadedData
    var temp = standUpData.notDoneList
    var doneList= standUpData["doneList"]
    var notDoneList
    if(temp.length > 0 ){
      notDoneList = temp
    }
    else{
      notDoneList = membersList
      doneList = []
    }
    var currentFacilitator = standUpData["currentFacilitator"]
    var randomIndex = Math.floor((notDoneList.length) * Math.random())
    var nextFacilitator = notDoneList[randomIndex];
    temp.splice(randomIndex,1)
    var writeBackObject = standUpData

    if(!req.notPresent){
      (temp.length >0) ? doneList.push(currentFacilitator) : ""
      writeBackObject.date = new Date().toDateString()
    }
    else{
      notDoneList.push(currentFacilitator)
      notDoneList.sort()
    }
    writeBackObject.currentFacilitator = nextFacilitator
    writeBackObject.notDoneList = notDoneList
    writeBackObject.doneList = doneList
    preLoadedData = writeBackObject
    var clapCount = 1 + Math.ceil(3 * Math.random())
    var json = JSON.stringify(writeBackObject, null, 3); 
    fs.writeFile(standUpFilePath, json, 'utf8',()=>{
      io.emit('letsClap', {data : preLoadedData,clapCount});
    });
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
})

server.listen(port)
module.exports = app;