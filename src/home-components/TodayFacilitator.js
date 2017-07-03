import React, { Component, PropTypes } from 'react';

export default class TodayFacilitator extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

  render() {
    return (
    <span>
        <span id="todaysFacilitator">Today's Facilitator  : </span><span id="facilitator">{this.props.standUpData.currentFacilitator}</span>
    </span>
    );
  }
}
