import React, { Component, PropTypes } from 'react';
import Loader from '../Loader'
import axios from 'axios'

export default class NextFacilitator extends React.Component {
    constructor(props){
        super(props)
        this.state = {action:"normal",nextFacilitator:""}
        this.nextFacilitator = this.nextFacilitator.bind(this)
    }

    nextFacilitator(){
        var standUpData = this.props.standUpData
        var today = new Date().toDateString();
        if(today != standUpData.date){
            axios.post('/next-facilitator', standUpData)
            .then( (response) => {
                console.log("=>>>facili",response)
                this.setState({action:"nextFacilitator",nextFacilitator:response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else{
            this.setState({action:"error"})
        }
    }

  render() {
      switch(this.state.action){
          case "normal" :
            return (
                <span id="nextFacilitator"  onClick={this.nextFacilitator}>
                    Next Facilitator
                </span>
            );
          case "nextFacilitator" :
            return (
                <div id="facilitatorGenerated" >
                    <span>Next Facilitator   : </span><span id="facilitator">{this.state.nextFacilitator}</span>
                </div>
            );
          case "error" :
            return (
                <div id="error" className="TextMedium">
                    Next Facilitator {this.state.nextFacilitator ? '('+this.state.nextFacilitator +')': '('+this.props.standUpData.currentFacilitator +')'} has already been generated.
                </div>
            );
      }
  }
}
