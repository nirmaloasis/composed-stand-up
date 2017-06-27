import React, { Component, PropTypes } from 'react';

export default class TodayFacilitator extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }

  render() {
    return (
    <div id="todaysFacilitator" className="TextMedium">
        <span>Today's Facilitator  : </span><span id="facilitator">{this.props.standUpData.currentFacilitator}</span>
    </div>
    );
  }
}
