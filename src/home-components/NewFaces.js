import React, { Component, PropTypes } from 'react';
import axios from 'axios'

export default class NewFaces extends React.Component {
    constructor(props){
        super(props)
        this.state = {listOfNewFaces : this.props.standUpData.newFaces}
        this.addNewFaces = this.addNewFaces.bind(this)
    }

    componentWillMount(){

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
            this.setState({listOfNewFaces},() => {
                this.textInput.value = "";
                axios.post('/add-newFaces',standUpData)
                .catch(function (error) {
                    var errorMessage = error
                    this.setState({errorMessage})
                    console.log(error);
                });
            })
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
                    <input id="inputAddFace" type="text" name="newFace" required placeholder="Add new Faces" ref={(input) => { this.textInput = input}}/> 
                    <span id="addFace" onClick={this.addNewFaces}>+</span> 
                </span>
                <span id="todayDate">{new Date().toDateString()}</span>
            </div>
        );
    }
}
