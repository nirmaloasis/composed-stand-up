import React,{Component} from 'react';
import axios from 'axios'
import  Header from '../home-components/Header.js'

export default class RetroHome extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    componentWillMount(){
    }

    render(){
        return (
            <div>
                <Header standUpData={this.props.standUpData} changeRoute={this.props.changeRoute} route={this.props.route}/>
                <div id="newDateWrap">
                    <div  id="div92per">
                        <span id="todayDate">{new Date().toDateString()}</span>
                    </div>
                </div>
                <h1>not availbale yet</h1>
            </div>
        );
    }
}