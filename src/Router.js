import React,{Component} from 'react';
import axios from 'axios'
import Loader from './Loader'
import StandUpHome from './stand-up-components/StandUpHome.js'
import RetroHome from './retro-components/RetroHome.js'


export default class Router extends Component {
    constructor(props){
        super(props)
        this.state = {route : "loader",standUpData:""}
        this.resetStandUpDataAfterADay = this.resetStandUpDataAfterADay.bind(this)
        this.changeRoute = this.changeRoute.bind(this)
    }

    changeRoute(route){
        console.log("changing route to =>>>",route)
        this.setState({route:route})
    }

    componentWillMount(){
        axios.get('/sUpdata', {
            params: { }
        })
        .then( (response) => {
            this.resetStandUpDataAfterADay(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    resetStandUpDataAfterADay(data){
        var today = new Date().toDateString();
        if(today == data.date){
            this.setState({standUpData : data,route :"standUp"})
        }
        else{
            var resetData = data
            resetData.newFaces = ["None"]
            this.setState({standUpData : resetData,route :"standUp"},()=>{
                axios.post('/reset-sUpdata',resetData)
                .catch(function (error) {
                    console.log(error);
                });
            })
        }
    }

    render(){
        switch(this.state.route){
            case "standUp" : 
                return (<StandUpHome standUpData={this.state.standUpData} route={this.state.route} changeRoute={this.changeRoute}/>);

            case "retro" : 
                return (<RetroHome standUpData={this.state.standUpData} route={this.state.route} changeRoute={this.changeRoute}/>);

            case "loader" :
                return(
                    <Loader />
                )
        }
    }
}