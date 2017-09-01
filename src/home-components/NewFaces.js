import React, { Component, PropTypes } from 'react';
import axios from 'axios'   
import io from 'socket.io-client'

export default class NewFaces extends React.Component {
    constructor(props){
        super(props)
        this.state = {listOfNewFaces : this.props.standUpData.newFaces,action:"normal",startsAt : this.props.standUpData.startsAt,standUpData:this.props.standUpData}
        this.addNewFaces = this.addNewFaces.bind(this)
        this.enterKeyAddNewFaces = this.enterKeyAddNewFaces.bind(this)
        this.setTime = this.setTime.bind(this)
        this.checkTime = this.checkTime.bind(this)
        this.scheduleAt = this.scheduleAt.bind(this)
        this.invalidTimeMsg = this.invalidTimeMsg.bind(this)
        this.keyUpTimeScheduler = this.keyUpTimeScheduler.bind(this)
        this.onBlurTimeScheduler = this.onBlurTimeScheduler.bind(this)
    }

    componentWillMount(){
        this.setTime();
    }

    componentDidMount(){
        window.setInterval(function () {
        this.setTime();
        }.bind(this), 1000);
        this.socket = io('/')
        this.socket.on('add-newFaces',(standUpData)=>{
            this.setState({listOfNewFaces : standUpData.newFaces,startsAt : standUpData.startsAt,standUpData:standUpData,action:"normal"})
        })
    }

    setTime(){
        var currentdate = new Date();
        var hours = this.checkTime(currentdate.getHours())   
        var minutes = this.checkTime(currentdate.getMinutes())
        var seconds = this.checkTime(currentdate.getSeconds())
        this.setState({
            hours: hours,
            minutes: minutes,
            seconds: seconds
        },()=>{
            var hh,mm,ss,arr
            arr = this.state.startsAt.split(":")
            hh = arr[0]
            mm = arr[1]
            ss = arr[2]
            if(hours==hh && minutes==mm && seconds==ss){
                var audio = new Audio('audio/alarm.mp3');
                audio.play();
            }
        });
    }  

    checkTime(time){
        time = time < 10 ? '0' + time : time
        return time
    }

    enterKeyAddNewFaces(event){
        if(event.keyCode == 13)
            document.getElementById("addFace").click()
    }

    addNewFaces(event){
        if(this.textInput.value == ""){
            document.getElementById('inputAddFace').focus()
        }
        else{
            var standUpData = this.props.standUpData;
            var listOfNewFaces = this.state.listOfNewFaces
            listOfNewFaces.push(this.textInput.value)
            listOfNewFaces.indexOf("None") == -1 ?   "" : listOfNewFaces.splice(0,1)
            standUpData.newFaces = listOfNewFaces
            this.textInput.value = "";
            this.socket.emit('add-newFaces',standUpData)
        }
    }

    scheduleAt(){
        this.setState({action:"reSchedule"})
    }

    keyUpTimeScheduler(event){
        if(event.target.value.length > 8){
             this.invalidTimeMsg()
        }
        else if(event.target.value.length == 8){
            this.validateTimeAndSave(event.target.value)
        }
    }

    onBlurTimeScheduler(event){
        if(event.target.value.length == 8){
            this.validateTimeAndSave(event.target.value)
        }
        else{
            this.setState({action : "normal"})
        }
    }

    validateTimeAndSave(val){
        var arr = val.split(":")
        if(arr.length == 3 && arr[0].length == 2 && arr[1].length == 2 && arr[2].length == 2 && parseInt(arr[0])!= NaN && parseInt(arr[1])!= NaN && parseInt(arr[2])!= NaN && parseInt(arr[0]) < 24 && parseInt(arr[1]) < 60 && parseInt(arr[2]) < 60){
            var standUpData = this.state.standUpData
            standUpData.startsAt = val
            this.socket.emit('add-newFaces',standUpData)
        }
        else
            this.invalidTimeMsg()
    }

    invalidTimeMsg(){
        document.getElementById('invalidTime').innerText = "Invalid-Time!!!"
        setTimeout(()=>{
            this.setState({action : "normal"})
        },1000)
    }

    componentDidUpdate(){
        document.getElementById('timeInput') ? document.getElementById('timeInput').focus() : ""
    }

    render() {
        return (
            <div id="noNewFaceWrapper">
                <span>
                    <span className="newFaceHead">
                        New Faces : 
                    </span>
                    <span>
                        {this.state.listOfNewFaces.map((value,index) => <span className="NewFaces" key={index}>{index ? ' , '+ value : value}</span>)}
                    </span>
                </span>
                <span id="addNewFaces">
                    <input id="inputAddFace" type="text" name="newFace" required placeholder="Add new Faces" ref={(input) => { this.textInput = input}} onKeyUp={this.enterKeyAddNewFaces}/> 
                    <span id="addFace" onClick={this.addNewFaces}>+</span> 
                </span>
                <span id="todayDate">{this.state.hours}:{this.state.minutes}:{this.state.seconds} {" "+new Date().toDateString()}</span>
                <span className="StandUpScheduled">
                    <span>Starts At - </span>
                    {
                        this.state.action == "normal" ? <span onClick={this.scheduleAt} className="Cursor">{this.state.startsAt}</span>:
                        <span><input id="timeInput" type="text" placeholder="hh:mm:ss" onKeyUp={this.keyUpTimeScheduler} onBlur={this.onBlurTimeScheduler} title="Enter in 24hrs Format"/><span id="invalidTime"></span></span>
                    }
                    
                </span>
            </div>
        );
    }
}
