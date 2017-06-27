import React, { Component, PropTypes } from 'react';
import axios from 'axios'

export default class NewFaces extends React.Component {
    constructor(props){
        super(props)
        this.state = {listOfNewFaces : this.props.standUpData.newFaces}
        this.addNewFaces = this.addNewFaces.bind(this)
    }

    componentWillMount(){
        console.log("NewFaces Componenet=>>>>>",this.props)
        debugger
    }

    addNewFaces(){
        debugger
        var standUpData = this.props.standUpData;
        var listOfNewFaces = this.state.listOfNewFaces
        listOfNewFaces.push(this.textInput.value)
        listOfNewFaces.indexOf("None") == -1 ?   "" : listOfNewFaces.splice(0,1)
        standUpData.newFaces = listOfNewFaces
        this.setState({listOfNewFaces},() => {
            this.textInput.value = "";
            axios.post('/add-newFaces',standUpData)
            .catch(function (error) {
                console.log(error);
            });
        })
    }

    render() {
        return (
            <div id="newFaces" className="contentStyle">
                <div id="fillColor">Any New Faces ? </div>
                <div id="noNewFaceWrapper">
                    <div id="noNewFace">
                        {this.state.listOfNewFaces.map((value,index) => <div className="NewFaces" key={index}>{value}</div>)}
                    </div>
                    <div>
                        <div id="newFaceList">
                            <input id="inputFace" placeholder="Add new Faces" ref={(input) => { this.textInput = input}} /> 
                            <span id="addSign" onClick={this.addNewFaces}>+</span>                              
                        </div> 
                    </div>
                </div> 
            </div>
        );
    }
}
