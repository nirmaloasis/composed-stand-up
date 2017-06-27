import React,{Component} from 'react';
import axios from 'axios'
import Home from './Home'
import Loader from './Loader'
import StandUpHome from './stand-up-components/StandUpHome.js'

export default class Router extends Component {
    constructor(props){
        super(props)
        this.state = {route : "loader",standUpData:""}
        this.resetStandUpDataAfterADay = this.resetStandUpDataAfterADay.bind(this)
        this.changeRoute = this.changeRoute.bind(this)
    }

    changeRoute(route){
        console.log("change route to =>>>",route)
        this.setState({route:route})
    }

    componentWillMount(){
        console.log("entry routre")
        axios.get('/sUpdata', {
            params: { }
        })
        .then( (response) => {
            this.resetStandUpDataAfterADay(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log("exit routre")
    }

    resetStandUpDataAfterADay(data){
        var today = new Date().toDateString();
        if(today == data.date){
            this.setState({standUpData : data,route :"home"},()=>console.log("Router State=>>",this.state.standUpData))
        }
        else{
            console.log("posing resetting")
            var resetData = data
            resetData.interestings = []
            resetData.newFaces = ["None"]
            this.setState({standUpData : resetData,route :"home"},()=>{
                console.log("Reset Router State=>>",this.state.standUpData)
                axios.post('/reset-sUpdata',resetData)
                .catch(function (error) {
                    console.log(error);
                });
            })
        }
    }

    render(){
        console.log("route=--->",this.state.route)
        switch(this.state.route){
            case "home" : 
                return (<Home standUpData={this.state.standUpData} changeRoute={this.changeRoute}/>);

            case "standUp" : 
                return (<StandUpHome standUpData={this.state.standUpData}/>);

            case "loader" :
                return(
                    <Loader />
                )
        }
    }
}