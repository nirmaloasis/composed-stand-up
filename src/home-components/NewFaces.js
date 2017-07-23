import React, { Component, PropTypes } from 'react';
import axios from 'axios'   
import io from 'socket.io-client'

export default class NewFaces extends React.Component {
    constructor(props){
        super(props)
        this.state = {listOfNewFaces : this.props.standUpData.newFaces}
        this.addNewFaces = this.addNewFaces.bind(this)
        this.enterKeyAddNewFaces = this.enterKeyAddNewFaces.bind(this)
    }

    componentDidMount(){
        this.socket = io('/')
        this.socket.on('add-newFaces',(standUpData)=>{
            debugger
            this.setState({listOfNewFaces : standUpData.newFaces})
        })
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
                <span id="todayDate">{new Date().toDateString()}</span>
            </div>
        );
    }
}
