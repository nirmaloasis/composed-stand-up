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
                <Header standUpData={this.props.standUpData} changeRoute={this.props.changeRoute}/>
                <TodayFacilitator standUpData={this.props.standUpData}/>
                <div id="todayDate" className="TextMedium">{new Date().toDateString()}</div>
                <MainBody standUpData={this.props.standUpData}/>
            </div>
        );
    }
}