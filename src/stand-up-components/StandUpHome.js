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
        this.state = {standUpData : this.props.standUpData,nextFacilitator:""}
        this.letUsClap = this.letUsClap.bind(this)
        this.counterFunction = this.counterFunction.bind(this)
    }
   componentDidMount(){
        var synth = window.speechSynthesis;
        this.socket = io('/')
        this.socket.on('letsClap',(rawData)=>{
            document.getElementById('modalWrap').style.display = "block"
            var clapCount = 3 //rawData.clapCount
            var speechText = "On Count Of , " + clapCount
            this.counterFunction(1,()=>{
                setTimeout(()=>{
                    this.setState({standUpData:rawData.data,nextFacilitator : rawData.data.currentFacilitator},()=>{
                        document.getElementById('modalWrap').style.display = "none"
                        document.getElementById('nextFacilitatorGen').style.display = "block"
                        setTimeout(()=>{
                            document.getElementById('nextFacilitatorGen').style.display = "none"
                        },5000)
                    })
                },1000)
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

    counterFunction(clapCount,cb){
        if(clapCount > 3)
            return cb() 
        return setTimeout(()=>{
            if(clapCount == 3){
                document.getElementById('modalContent').innerText = ""
                document.getElementById('modalContentClapPic').style.display = 'block'
            }
            else{
                document.getElementById('modalContent').innerText = clapCount
            }    
           this.counterFunction(clapCount+1,cb)
        },800)
    }

    render(){
        var today = new Date().toDateString()
        var disable = (this.state.standUpData.date == today)
        var newFaces = this.state.standUpData.newFaces.map((val,key)=><span key={key}>{" "+val}</span>)
        return (
            <div>
                <Header standUpData={this.state.standUpData} nextFacilitator={this.state.nextFacilitator} changeRoute={this.props.changeRoute} route={this.props.route} />
                <div id="newDateWrap">
                    <div  id="div92per">
                        <NewFaces standUpData={this.state.standUpData} loadLatestData={this.props.loadLatestData}/>
                    </div>
                </div>
                <div id="standUpcontentWrapper"> 
                    <span id="leftContainer"><ContentHelps windowHeight={this.props.windowHeight} heading="Helps" standUpData = {this.state.standUpData}  loadThenUpdate={this.props.loadThenUpdate}/></span>
                    <span id="middleontainer"><ContentInterestings windowHeight={this.props.windowHeight} heading="Interestings" standUpData = {this.state.standUpData} loadThenUpdate={this.props.loadThenUpdate}/></span>
                    <span id="rightContainer"><ContentEvents windowHeight={this.props.windowHeight} heading="Events"  standUpData = {this.state.standUpData} refineEventList={this.props.refineEventList} loadThenUpdate={this.props.loadThenUpdate}/></span>
                </div>
                <div id="clapWrap">
                    <span className="ClapBtn" id={disable ? "disabledCursor" : "" } title={ disable ? "Today's Stand-up is done" : ""} onClick={this.letUsClap}>
                        <span  id={disable ? "disableClap" : "clap" }>let's clap on 3</span>
                    </span>
                </div>
                <ModalHelps windowHeight={this.props.windowHeight} heading="Helps" standUpData = {this.state.standUpData}  loadThenUpdate={this.props.loadThenUpdate}/>
                <ModalInterestings windowHeight={this.props.windowHeight} heading="Interestings" standUpData = {this.state.standUpData} loadThenUpdate={this.props.loadThenUpdate}/>
                <ModalEvents windowHeight={this.props.windowHeight} heading="Events" letUsClap = {this.letUsClap} standUpData = {this.state.standUpData} refineEventList={this.props.refineEventList} loadThenUpdate={this.props.loadThenUpdate}/>
                <div id="modalWrap" className="ModalWrap">
                   <div className="OnCount">
                   </div>
                   <div id="modalContent" className="ModalContent">
                   </div>
                   <div id="modalContentClapPic" className="ModalContentClap">
                       <center><img className="ClapPic" src="images/clap.svg" alt="Clap" /></center>
                   </div>
                </div>
                <div id="nextFacilitatorGen" className="ModalWrap ModalContent ModalFacilitator">
                    <div>{"Next Facilitator : " + this.state.standUpData.currentFacilitator} </div>
                </div>
            </div>
        );
    }
}