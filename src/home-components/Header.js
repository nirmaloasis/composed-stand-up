import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import  TodayFacilitator from './TodayFacilitator.js'

export default class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.startStandUp = this.startStandUp.bind(this)
        this.startRetro = this.startRetro.bind(this)
    }

    startStandUp(event){
        this.props.changeRoute("standUp")
        axios.get('/start-standUp')
        .then(()=>{

        })
        .catch(function (error) {
            console.log(error);
        });
    }

    startRetro(event){
        this.props.changeRoute("retro")
    }


  render() {
      var route = this.props.route
      var tabStyleClicked = {
                        background: "white",
                        color : "#254b6e"
                     };
      var tabStyleNormal = {
                        background: "#254b6e",
                        color : "white"
                     };
    return (
        <div id="headerWrapper">
            <div id="header92">
                <span>
                    <span id="compozedLogo">Compozed Activities</span>
                    <span id="menuDiv">
                        <a className="HeaderMenuItems" onClick={this.startStandUp} style={route=="standUp" ? tabStyleClicked : tabStyleNormal}>Stand-Up</a>
                        <a className="HeaderMenuItems" onClick={this.startRetro} style={route=="retro" ? tabStyleClicked : tabStyleNormal}>Retro</a>
                    </span>
                </span>
                <span id="headerRight">
                    <div id="headerRightAlign">
                        <span id="todaysFacilitator">
                            <span id="rightBar">
                                Today's Facilitator : Dikshita Khandke
                                <span id="notPresent">not present ?</span>
                            </span>
                        </span>
                        <span id="adminSpan">
                            <img id="adminLogo" src="images/admin-logo.svg" alt="#"/>
                            <a id="adminLink" >Admin</a>
                        </span>
                    </div>
                </span>
            </div>
        </div>
    );
  }
}
