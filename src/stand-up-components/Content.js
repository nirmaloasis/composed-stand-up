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
            <div id="closeHelpSection">
                <div id="closeHelpDiv"><div id="closeHelp">+</div></div>
                <div id="closeHelpContent">
                    <div id="askingHelpReadOnly">
                        Divya
                    </div> : 
                    <span id="helpItemReadOnly">"birthday money collection"</span>
                    <span id="helpedByPerson" >
                        {" - "+ "Anish"}
                    </span>
                </div>
            </div>
        </div>
    );
  }
}
