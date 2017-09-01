var express = require('express');
var router = express.Router();
var fs = require('fs')
var standUpFilePath = process.cwd() + '/data/stand-up-data.json'

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

router.get('/', function(req, res, next) {
  res.render('index', { title: 'compozed' });
});

router.post('/admin', function (req, res) {
  var status = req.body.passkey == process.env.passkey ? true : false
  res.send({status : status})
})

router.get('/sUpdata', function(req, res, next) {
  fs.readFile(standUpFilePath, 'utf8', function readFileCallback(err, data){
    if (err) {
      return console.log(err);
    }
    var compozedStanUpData = JSON.parse(data)
    res.send(compozedStanUpData);
  });
});


router.post('/reset-sUpdata', function(req, res, next) {
  json = JSON.stringify(req.body.standUpData, null, 3); 
  fs.writeFile(standUpFilePath, json, 'utf8',()=>{
    res.send(json);
  });
})

router.post('/add-newFaces', function(req, res, next) {
  req.body.lastModifiedNewFaces = new Date().toDateString()
  json = JSON.stringify(req.body, null, 3); 
  fs.writeFile(standUpFilePath, json, 'utf8',()=>{});
})


router.get('/start-standUp', function(req, res, next) {
  res.render('standUp');
})

router.post('/facilitator', function(req, res, next) {
    var standUpData = req.body.standUpData
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

    if(!req.body.notPresent){
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
    var json = JSON.stringify(writeBackObject, null, 3); 
    fs.writeFile(standUpFilePath, json, 'utf8',()=>{
      res.json(writeBackObject.currentFacilitator)
    });
})

router.post('/add-content',(req, res, next)=>{
  var req = req.body
    fs.readFile(standUpFilePath, 'utf8', function readFileCallback(err, data){
        if (err) {
          return console.log(err);
        }
        var compozedStanUpData = JSON.parse(data)
        var writeBackObject = compozedStanUpData
        writeBackObject[req.contentType] = req.content
        req.contentType = "interestings" ? writeBackObject.lastModifiedInterestings = new Date().toDateString() : ""
        var json = JSON.stringify(writeBackObject, null, 3); 
        fs.writeFile(standUpFilePath, json, 'utf8',()=>{
          res.json(writeBackObject)
        });
    });
})

module.exports = router;
