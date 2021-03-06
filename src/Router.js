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
        this.loadLatestData = this.loadLatestData.bind(this)
        this.loadThenUpdate = this.loadThenUpdate.bind(this)
        this.compareNums = this.compareNums.bind(this)
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

    loadLatestData(){
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

    loadThenUpdate(obj){
        axios.post('add-content',obj)
        .then((response)=>{
            this.resetStandUpDataAfterADay(response.data)
        })
        .catch((err)=> console.log(err))
    }

    compareNums(num1 , num2){
        if(num1 == num2)
            return 0;
        else if(num1 > num2)
            return 1;
        else
            return -1;
    }

    refineEventList(events){
        var temp 
        events = events.filter((val)=>{
            var today = new Date()
            var eventDate = new Date(val.date)
            var check
            check = this.compareNums(today.getFullYear(),eventDate.getFullYear())
            if(check == 0)
                check = this.compareNums(today.getMonth(),eventDate.getMonth())
            if(check == 0)
                check = this.compareNums(today.getDate(),eventDate.getDate())
            if(check == 0)
                temp = "Today"
            if(check == -1){
                if((today.getDate()+1) == eventDate.getDate())
                    temp = "Tomorrow"
                else
                    temp = "can'tDetermine"
            }
            if(check !=1){
                if(temp == "Today" || temp == "Tomorrow"){
                    val.refinedDate = temp
                    return val
                }     
                else if(temp == "can'tDetermine")
                    return val
            }
        })
        return events;
    }

    resetStandUpDataAfterADay(data){
        var today = new Date().toDateString();
        if(today == data.date){
            this.setState({standUpData : data,route :"standUp"})
        }
        else{
            var resetData = data
            resetData.lastModifiedNewFaces != today ? resetData.newFaces = ["None"] : ""
            resetData.lastModifiedInterestings != today ? resetData.interestings = [] : ""
            var events = resetData.events
            resetData.events = this.refineEventList(events)
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
                return (<StandUpHome standUpData={this.state.standUpData} route={this.state.route} changeRoute={this.changeRoute} refineEventList={this.refineEventList} loadLatestData={this.loadLatestData} loadThenUpdate={this.loadThenUpdate}/>);

            case "retro" : 
                return (<RetroHome standUpData={this.state.standUpData} route={this.state.route} changeRoute={this.changeRoute}/>);

            case "loader" :
                return(
                    <Loader />
                )
        }
    }
}