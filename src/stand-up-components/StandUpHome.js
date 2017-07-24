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
import io from 'socket.io-client'

export default class StandUpHome extends Component {
    constructor(props){
        super(props)
        this.state = {standUpData : this.props.standUpData}
        this.letUsClap = this.letUsClap.bind(this)
        this.counterFunction = this.counterFunction.bind(this)
    }

    componentDidMount(){
        this.socket = io('/')
        this.socket.on('letsClap',(rawData)=>{
            document.getElementById('modalWrap').style.display = "block"
            var clapCount = rawData.clapCount
            document.getElementById('count').innerText = clapCount
            this.counterFunction(clapCount,1,()=>{
                this.setState({standUpData:rawData.data},()=>{
                    document.getElementById('modalWrap').style.display = "none"
                    document.getElementById('nextFacilitatorGen').style.display = "block"
                    setTimeout(()=>{
                        document.getElementById('nextFacilitatorGen').style.display = "none"
                    },3000)
                })
            })
        })
    }

    letUsClap(){
        var today = new Date().toDateString()
        var standUpData = this.state.standUpData
        if(standUpData.date != today){
            this.socket.emit('letsClap',{
                notPresent : false
            })
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
        var disable = (this.state.standUpData.date == today)
        var newFaces = this.state.standUpData.newFaces.map((val,key)=><span key={key}>{" "+val}</span>)
        return (
            <div>
                <Header standUpData={this.state.standUpData} changeRoute={this.props.changeRoute} route={this.props.route} />
                <div id="newDateWrap">
                    <div  id="div92per">
                        <NewFaces standUpData={this.state.standUpData} loadLatestData={this.props.loadLatestData}/>
                    </div>
                </div>
                <div id="standUpcontentWrapper"> 
                    <span id="leftContainer"><ContentHelps heading="Helps" standUpData = {this.state.standUpData}  loadThenUpdate={this.props.loadThenUpdate}/></span>
                    <span id="middleontainer"><ContentInterestings heading="Interestings" standUpData = {this.state.standUpData} loadThenUpdate={this.props.loadThenUpdate}/></span>
                    <span id="rightContainer"><ContentEvents heading="Events"  standUpData = {this.state.standUpData} refineEventList={this.props.refineEventList} loadThenUpdate={this.props.loadThenUpdate}/></span>
                </div>
                <ModalHelps heading="Helps" standUpData = {this.state.standUpData}  loadThenUpdate={this.props.loadThenUpdate}/>
                <ModalInterestings heading="Interestings" standUpData = {this.state.standUpData} loadThenUpdate={this.props.loadThenUpdate}/>
                <ModalEvents heading="Events" letUsClap = {this.letUsClap} standUpData = {this.state.standUpData} refineEventList={this.props.refineEventList} loadThenUpdate={this.props.loadThenUpdate}/>
                <div id="clapWrap">
                    <span className="ClapBtn" id={disable ? "disabledCursor" : "" } title={ disable ? "Todays Stand-up is done" : ""} onClick={this.letUsClap}>
                        <span  id={disable ? "disableClap" : "clap" }>let's clap</span>
                    </span>
                </div>
                <div id="modalWrap" className="ModalWrap">
                    <div className="OnCount">
                        On Count of : <span id="count"></span>
                    </div>
                    <div id="modalContent" className="ModalContent">
                    </div>
                </div>
                <div id="nextFacilitatorGen" className="ModalWrap ModalContent ModalFacilitator">
                    <div>{"Next Facilitator : " + this.state.standUpData.currentFacilitator} </div>
                </div>
            </div>
        );
    }
}