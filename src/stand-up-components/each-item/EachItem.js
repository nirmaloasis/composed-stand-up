import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import './EachItem.css'
import InfoTile from '../info-tile/InfoTile.js'

export default class EachItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
            <div className="ItemWrap">
                <div className="InnerWrap">
                    <div className="ItemHeading">{this.props.heading}</div>
                    <div className="ItemContent">
                        <InfoTile/>
                        <InfoTile/>
                        <InfoTile/>
                        <InfoTile/>
                        <InfoTile/>
                        <InfoTile/>
                        <InfoTile/>
                    </div>
                </div>    
            </div>
        )
    }
}
