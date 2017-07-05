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
        this.refineEventList = this.refineEventList.bind(this)
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

    changeRoute(route){
        this.setState({route:route})
    }

    refineEventList(events){
        var temp 
        events = events.filter((val)=>{
            var today = new Date()
            var eventDate = new Date(val.date)
            if(today.getFullYear()>eventDate.getFullYear())
                temp = "false";
            else if (today.getMonth()>eventDate.getMonth())
                temp = "false";
            else if(today.getDate()>eventDate.getDate())
                temp = "false";
            else if(today.getDate() == eventDate.getDate())
                temp = "Today"
            else if((today.getDate()+1) == eventDate.getDate())
                temp = "Tomorrow"
            else 
                temp = "true"
            if(temp == "Today" || temp == "Tomorrow"){
                val.date = temp
                return val
            }     
            else if(temp == "true")
                return val
        })
        return events;
    }

    resetStandUpDataAfterADay(data){
        debugger
        var today = new Date().toDateString();
        if(today == data.date){
            this.setState({standUpData : data,route :"standUp"})
        }
        else{
            var resetData = data
            resetData.newFaces = ["None"]
            resetData.interestings = []
            var events = resetData.events
            resetData.events = this.refineEventList(events)
            debugger
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
                return (<StandUpHome standUpData={this.state.standUpData} route={this.state.route} changeRoute={this.changeRoute} refineEventList={this.refineEventList}/>);

            case "retro" : 
                return (<RetroHome standUpData={this.state.standUpData} route={this.state.route} changeRoute={this.changeRoute}/>);

            case "loader" :
                return(
                    <Loader />
                )
        }
    }
}