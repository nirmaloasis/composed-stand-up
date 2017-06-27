import React, { Component, PropTypes } from 'react';
import NewFaces from './NewFaces'

export default class MainBody extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    componentWillMount(){
        debugger
        console.log("MainBody Componenet=>>>>>",this.props)
    }
  render() {
      var prevActionItems = this.props.standUpData.actionItems.map((value,index)=>{
          var splitStr = value.split('-->')
          return <div id="prevItemsDiv"><span id="prevItems">{splitStr[0]}  </span><span id="prevDate"> {splitStr[1] ? " --> " + splitStr[1] : ""}</span></div>
      })
      var upcommingEvents = this.props.standUpData.events.map((value,index)=>{
          var splitStr = value.split('-->')
          return <div id="prevItemsDiv"><span id="prevItems">{splitStr[0]}  </span><span id="prevDate"> {splitStr[1] ? " --> " + splitStr[1] : ""}</span></div>
      })

    return (
        <div id="contentWrapper">
            <NewFaces standUpData={this.props.standUpData}/>
            <div id="prevHelp" className="contentStyle">
                <div id="fillColor">Previous Action Items  </div>
                <div id="prevItemsWrap">{prevActionItems}</div>
            </div>
            <div id="upcommingEvents" className="contentStyle">
                <div id="fillColor">Upcoming Events</div>
                <div id="prevItemsWrap">{upcommingEvents}</div>
            </div>
        </div>
    );
  }
}
