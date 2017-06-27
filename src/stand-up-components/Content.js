import React, { Component, PropTypes } from 'react';
import axios from 'axios'

export default class Content extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    componentWillMount(){
        console.log("Content Componenet=>>>>>",this.props)
    }

  render() {

    return (
    <div id="standUpContent">
        <div id="itemsHeading">{this.props.heading}</div>
        <div id="noNewFaceWrapper">
            <div>
                <div id="newFaceList">
                    <input id="inputFace" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInput = input}} /> 
                    <span id="addSign">+</span>                              
                </div> 
            </div>
        </div> 
    </div>
    );
  }
}
