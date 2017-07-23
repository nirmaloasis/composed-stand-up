import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import './InfoTile.css'

export default class InfoTile extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.clickDetails = this.clickDetails.bind(this)
    }

    clickDetails(event){
        var element = event.currentTarget.parentElement.parentElement.parentElement
        element.querySelector("#DetailsId").style.display = "block"
        element.querySelector("#rotatingIcon").className = "Icons RotationDown"
 }

    render(){
        return(
            <div>
            <div className="InfoTilesWrapper" data-id={this.props.id}>
                <div className="CloseIconDiv">
                    <span className="CloseTileIcon">&times;<span className="ToolTipText">remove</span></span>
                </div>
                <div className="TileContent">
                    <div className="TalkingPerson">Anish</div> : 
                    <span className="ItemSummary">"Pay 200 Rs for birthday celebration"</span>
                </div>
                <div className="ExtraDetails">
                    <div className="AddDetails" onClick={this.clickDetails}>
                        <img className="Icons RotationRight" id="rotatingIcon" src="images/right-arrow.png" alt=""/>
                        Add Details
                    </div>
                    <div className="BottomRight">
                        <span> - Volunteer : </span>
                        <span>Pankaj</span>
                    </div>
                </div>
            </div>
             <div className="Details" id="DetailsId">
                    {/*<div className="DetailHeading">Help Details : </div>*/}
                    <div className="DetailContent">This is very important.Going good jack is King.This is very important.</div>
                </div>
            </div>
        )
    }
}
