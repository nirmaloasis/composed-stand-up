import React,{Component} from 'react';
import axios from 'axios'
import './stand-up.css'
// import  TodayFacilitator from '../home-components/TodayFacilitator.js'
import Content from './Content'
import NextFacilitator from './NextFacilitator'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    componentWillMount(){
        console.log("Home Componenet=>>>>>",this.props)
        debugger
    }

    render(){
        var newFaces = this.props.standUpData.newFaces.map((val,key)=><span key={key}>{" "+val}</span>)
        return (
            <div>
                <div id="standUpHeader">
                    <span id="heading">Compozed-Stand-Up</span>
                    <NextFacilitator standUpData = {this.props.standUpData}/>
                </div>
                <div id="stFacilitator">Today's Facilitator  : {this.props.standUpData.currentFacilitator}</div>
                <div id="todayDateSUp">
                    <span id="newFaceSt"><span>New Faces  : </span><span id="facilitator">{newFaces}</span></span>
                    <span id="stDate">{new Date().toDateString()}</span>
                </div>
                <div id="standUpcontentWrapper">
                    <span id="leftContainer"><Content heading="Helps" standUpData = {this.props.standUpData}/></span>
                    <span id="middleontainer"><Content heading="Interestings" standUpData = {this.props.standUpData}/></span>
                    <span id="rightContainer"><Content heading="Events" standUpData = {this.props.standUpData}/></span>
                </div>
            </div>
        );
    }
}