import React,{Component} from 'react';
import axios from 'axios'
import Header from './home-components/Header'
import TodayFacilitator from './home-components/TodayFacilitator'
import MainBody from './home-components/MainBody'

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
        return (
            <div>
                <Header standUpData={this.props.standUpData} changeRoute={this.props.changeRoute} route={this.props.route}/>
                <div id="newDateWrap">
                    <div  id="div92per">
                        <TodayFacilitator standUpData={this.props.standUpData}/>
                        <span id="todayDate">{new Date().toDateString()}</span>
                    </div>
                </div>
                <MainBody standUpData={this.props.standUpData}/>
            </div>
        );
    }
}