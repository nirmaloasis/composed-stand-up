import React,{Component} from 'react';
import axios from 'axios'
import './stand-up.css'
import  Header from '../home-components/Header.js'
import NewFaces from "../home-components/NewFaces.js"
import EachItem from './each-item/EachItem.js'

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
        debugger
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
                    document.getElementById('nextFacilitatorGen').style.display = "block"
                    setTimeout(()=>{
                        document.getElementById('nextFacilitatorGen').style.display = "none"
                    },3000)
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
                <div className="ThreeItemsWrap">
                    <div className="LeftItem Width32 MarginLeft"><EachItem heading="Helps"/></div>
                    <div className="MiddleItem Width32 MarginLeft"><EachItem heading="Interestings"/></div>
                    <div className="RightItem Width32"><EachItem heading="Events"/></div>
                </div>
                {/*<div id="clapWrap">
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
                    <div>{"Next Facilitator : " + this.props.standUpData.currentFacilitator} </div>
                </div>*/}
            </div>
        );
    }
}