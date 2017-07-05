var express = require('express');
var router = express.Router();
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
  "Kapil Taneja",
  "Krishn Kant Nayak",
  "Kumar Sameer Ranjan",
  "Lavanya Gowlla",
  "Meenu Sharma",
  "Mukesh Pandit",
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
  // console.log("req body>>>>",req.body)
  json = JSON.stringify(req.body, null, 3); 
  fs.writeFile(standUpFilePath, json, 'utf8',()=>{
      fs.readFile(standUpFilePath, 'utf8', function readFileCallback(err, data){
        if (err) {
          return console.log(err);
        }
        var compozedStanUpData = JSON.parse(data)
        // console.log("reset data>>>>",compozedStanUpData)
        res.send(compozedStanUpData);
      });
  });
})

router.post('/add-newFaces', function(req, res, next) {
  debugger
  console.log("add >>>>",req.body)
  json = JSON.stringify(req.body, null, 3); 
  fs.writeFile(standUpFilePath, json, 'utf8',()=>{});
})


router.get('/start-standUp', function(req, res, next) {
  console.log("start standup >>>>")
  res.render('standUp');
})

router.post('/next-facilitator', function(req, res, next) {
    var compozedStanUpData = req.body
    notDoneList = compozedStanUpData["notDoneList"]
    doneList= compozedStanUpData["doneList"]
    currentFacilitator = compozedStanUpData["currentFacilitator"]
    var randomIndex = Math.floor((notDoneList.length) * Math.random())
    var nextFacilitator = notDoneList[randomIndex];
    var temp = notDoneList
    temp.splice(temp.indexOf(nextFacilitator),1)
    var temp1 = doneList.concat([currentFacilitator])
    var writeBackObject = compozedStanUpData
    writeBackObject.currentFacilitator = nextFacilitator
    writeBackObject.notDoneList = (temp.length==0 ? membersList : temp)
    writeBackObject.doneList = (temp.length==0 ? [] : temp1)
    writeBackObject.date = new Date().toDateString()

    var response = nextFacilitator
    var json = JSON.stringify(writeBackObject, null, 3); 
    fs.writeFile(standUpFilePath, json, 'utf8',()=>{
      res.send(response)
    });
})



module.exports = router;
