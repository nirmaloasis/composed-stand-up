import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import './InfoTile.css'

export default class InfoTile extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
            <div className="InfoTilesWrapper" data-id={this.props.id}>
                <div className="EditCloseIcon">
                    <span className="CloseTileIcon">&times;<span className="ToolTipText">remove</span></span>
                    <span className="EditIconSpan"><img className="EditIcon" src="images/edit-icon.png" alt="edit"/><span className="ToolTipText">edit</span></span>
                </div>
                <div className="TileContent">
                    <div id="askingHelpReadOnly">Anish</div> : <span id="helpItemReadOnly">"Pay 200 Rs for birthday celebration"</span>
                </div>
                <div className="ExtraDetails">
                    <span className="DetailIconSpan"><img className="DetialIcon" src="images/view-details.png" alt="details"/><span className="ToolTipText">details</span></span>
                    <span></span>
                </div>
            </div>
        )
    }
}
