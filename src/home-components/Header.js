import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import io from 'socket.io-client'

export default class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {currentFacilitator : this.props.standUpData.currentFacilitator,setFlag : false}
        this.startStandUp = this.startStandUp.bind(this)
        this.startRetro = this.startRetro.bind(this)
        this.facilitatorNotPresent = this.facilitatorNotPresent.bind(this)
    }

    componentDidMount(){
        this.socket = io('/')
        this.socket.on('facilitator',(data)=>{
            this.setState({currentFacilitator : data.currentFacilitator , setFlag : true},()=>{})
        })
    }

    startStandUp(event){
        this.props.changeRoute("standUp")
        axios.get('/start-standUp')
        .then(()=>{

        })
        .catch(function (error) {
            var errorMessage = error
            this.setState({errorMessage})
            console.log(error);
        });
    }

    startRetro(event){
        this.props.changeRoute("retro")
    }

    facilitatorNotPresent(event){
        this.socket.emit('facilitator',{
            notPresent : true
        })
    }

  render() {
      console.log("header()=>>>>")
      var route = this.props.route
      var tabStyleClicked = {
                        background: "white",
                        color : "#254b6e"
                     };
      var tabStyleNormal = {
                        background: "#254b6e",
                        color : "white"
                     };
    var currentFacilitator = (this.state.setFlag )? this.state.currentFacilitator : this.props.standUpData.currentFacilitator
    this.state.setFlag = false 
    return (
        <div id="headerWrapper">
            <div id="header92">
                <span>
                    <span id="compozedLogo">Compozed Stand-Up</span>
                    <span id="menuDiv">
                        <a className="HeaderMenuItems" className="hideMenu" onClick={this.startStandUp} style={route=="standUp" ? tabStyleClicked : tabStyleNormal}>Stand-Up</a>
                        <a className="HeaderMenuItems" className="hideMenu" onClick={this.startRetro} style={route=="retro" ? tabStyleClicked : tabStyleNormal}>Retro</a>
                    </span>
                </span>
                <span id="headerRight">
                    <div id="headerRightAlign">
                        <span id="todaysFacilitator">
                            <span id="rightBar">
                                Facilitator : {currentFacilitator}
                                <span id="notPresent" onClick={this.facilitatorNotPresent}>not present ?</span>
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
