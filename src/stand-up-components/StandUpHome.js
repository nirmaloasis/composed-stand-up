import React,{Component} from 'react';
import axios from 'axios'
import './stand-up.css'
import  TodayFacilitator from '../home-components/TodayFacilitator.js'
import  Header from '../home-components/Header.js'
import NextFacilitator from './NextFacilitator'
import NewFaces from "../home-components/NewFaces.js"
import ContentHelps from './ContentHelps'
import ContentInterestings from './ContentInterestings'
import ContentEvents from './ContentEvents'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {errorMessage : ""}
        this.letUsClap = this.letUsClap.bind(this)
    }

    componentWillMount(){
    }

    letUsClap(event){
        var standUpData = this.props.standUpData
        var today = new Date().toDateString()
        if(standUpData.date != today){
            axios.post('/facilitator', {
                standUpData : this.props.standUpData,
                notPresent : false
            })
            .then((response)=>{
                axios.get('/')
                .catch(()=>{
                    var errorMessage = error
                    this.setState({errorMessage})
                    console.log(error);        
                })
            })
            .catch(function (error) {
                var errorMessage = error
                this.setState({errorMessage})
                console.log(error);
            });
        }
        else{
            var errorMessage = "Today's Stand-Up is already Done"
            this.setState({errorMessage})
        }
    }

    render(){
        var newFaces = this.props.standUpData.newFaces.map((val,key)=><span key={key}>{" "+val}</span>)
        return (
            <div>
                <Header standUpData={this.props.standUpData} changeRoute={this.props.changeRoute} route={this.props.route}/>
                <div id="newDateWrap">
                    <div  id="div92per">
                        <NewFaces standUpData={this.props.standUpData}/>
                    </div>
                </div>
                <div id="standUpcontentWrapper"> 
                    <span id="leftContainer"><ContentHelps heading="Helps" standUpData = {this.props.standUpData}/></span>
                    <span id="middleontainer"><ContentInterestings heading="Interestings" standUpData = {this.props.standUpData}/></span>
                    <span id="rightContainer"><ContentEvents heading="Events" standUpData = {this.props.standUpData} refineEventList={this.props.refineEventList}/></span>
                </div>
                <div id="clapWrap"><span id="clap" onClick={this.letUsClap}>let's clap</span></div>
                <div id="errorMsg"><span>{this.state.errorMessage}</span></div>
            </div>
        );
    }
}