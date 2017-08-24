import React, { Component, PropTypes } from 'react';
import axios from 'axios'   
import io from 'socket.io-client'

export default class NewFaces extends React.Component {
    constructor(props){
        super(props)
        this.state = {listOfNewFaces : this.props.standUpData.newFaces}
        this.addNewFaces = this.addNewFaces.bind(this)
        this.enterKeyAddNewFaces = this.enterKeyAddNewFaces.bind(this)
        this.setTime = this.setTime.bind(this)
        this.checkTime = this.checkTime.bind(this)
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
            this.setState({listOfNewFaces : standUpData.newFaces})
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
            if(hours=="13"&&minutes=="59"&&seconds=="30"){
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
            </div>
        );
    }
}
