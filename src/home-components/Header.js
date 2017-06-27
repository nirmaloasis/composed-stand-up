import React, { Component, PropTypes } from 'react';
import axios from 'axios'

export default class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.startStandUp = this.startStandUp.bind(this)
    }

    startStandUp(){
        this.props.changeRoute("standUp")
        axios.get('/start-standUp')
        .catch(function (error) {
            console.log(error);
        });
    }

  render() {
    return (
        <div id="headerWrapper">
            <span id="compozedLogo">Compozed Stand-Up</span>
            <span id="adminSpan">
                <a id="adminLink" href="/">Admin-Login</a>
            </span>
            <div id="menuDiv">
                <a id="headerMenuItems" onClick={this.startStandUp}>Start Stand-Up</a>
                <a id="headerMenuItems">Start Retro</a>
            </div>
        </div>
    );
  }
}
