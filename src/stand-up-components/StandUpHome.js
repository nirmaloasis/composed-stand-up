import React,{Component} from 'react';
import axios from 'axios'
import './stand-up.css'
import  Header from '../home-components/Header.js'
import NewFaces from "../home-components/NewFaces.js"
import ContentHelps from './ContentHelps'
import ContentInterestings from './ContentInterestings'
import ContentEvents from './ContentEvents'
import ModalHelps from './ModalHelps'
import ModalInterestings from './ModalInterestings'
import ModalEvents from './ModalEvents'
import InfoTile from './info-tile/InfoTile'

export default class StandUpHome extends Component {
    constructor(props){
        super(props)
        this.state = {}
        this.letUsClap = this.letUsClap.bind(this)
        this.counterFunction = this.counterFunction.bind(this)
    }

    componentWillMount(){
         console.log("compo standup()=>>>>")
    }

    letUsClap(event){
        var standUpData = this.props.standUpData
        var today = new Date().toDateString()
        if(standUpData.date != today){
            axios.post('/facilitator', {
                standUpData : this.props.standUpData,
                notPresent : false
            })
            .then(()=>{
                document.getElementById('modalWrap').style.display = "block"
                var clapCount = 1 + Math.ceil(4 * Math.random())
                document.getElementById('count').innerText = clapCount
                this.counterFunction(clapCount,1,()=>{
                    this.props.loadLatestData()
                    document.getElementById('modalWrap').style.display = "none"
                })
            })
            .catch(function (error) {
            });
        }
    }

    counterFunction(clapCount,i,cb){
        if(clapCount < 0)
            return cb() 
        return setTimeout(()=>{
           document.getElementById('modalContent').innerText = i
           this.counterFunction(clapCount-1,i+1,cb)
        },1000)
    }

    render(){
        var today = new Date().toDateString()
        var disable = (this.props.standUpData.date == today)
        var newFaces = this.props.standUpData.newFaces.map((val,key)=><span key={key}>{" "+val}</span>)
        return (
            <div>
                <Header standUpData={this.props.standUpData} changeRoute={this.props.changeRoute} route={this.props.route} />
                <div id="newDateWrap">
                    <div  id="div92per">
                        <NewFaces standUpData={this.props.standUpData} loadLatestData={this.props.loadLatestData}/>
                    </div>
                </div>
                <div id="standUpcontentWrapper"> 
                    <span id="leftContainer"><ContentHelps heading="Helps" standUpData = {this.props.standUpData}  loadThenUpdate={this.props.loadThenUpdate}/></span>
                    <span id="middleontainer"><ContentInterestings heading="Interestings" standUpData = {this.props.standUpData} loadThenUpdate={this.props.loadThenUpdate}/></span>
                    <span id="rightContainer"><ContentEvents heading="Events" standUpData = {this.props.standUpData} refineEventList={this.props.refineEventList} loadThenUpdate={this.props.loadThenUpdate}/></span>
                </div>
                <ModalHelps heading="Helps" standUpData = {this.props.standUpData}  loadThenUpdate={this.props.loadThenUpdate}/>
                <ModalInterestings heading="Interestings" standUpData = {this.props.standUpData} loadThenUpdate={this.props.loadThenUpdate}/>
                <ModalEvents heading="Events" standUpData = {this.props.standUpData} refineEventList={this.props.refineEventList} loadThenUpdate={this.props.loadThenUpdate}/>
                <div id="clapWrap">
                    <span className="ClapBtn" id={disable ? "disabledCursor" : "" } title={ disable ? "Todays Stand-up is done" : ""}>
                        <span  id={disable ? "disableClap" : "clap" }  onClick={this.letUsClap}>let's clap</span>
                    </span>
                </div>
                <div id="modalWrap" className="ModalWrap">
                    <div id="onCount">
                        On Count of : <span id="count"></span>
                    </div>
                    <div id="modalContent">
                    </div>
                </div>
            </div>
        );
    }
}