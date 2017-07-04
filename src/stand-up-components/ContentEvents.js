
import React, { Component, PropTypes } from 'react';
import axios from 'axios'

export default class ContentEvents extends React.Component {
    constructor(props){
        super(props)
        this.state = {events : this.props.standUpData.events}
        this.addEvent = this.addEvent.bind(this)
        this.closeInteresting = this.closeInteresting.bind(this)
        this.pickDate = this.pickDate.bind(this)
    }

    componentDidMount(){
         $("#datepicker").datepicker();
    }
    
    addEvent(event){
        debugger
        var mentioningEvent = this.memberSelected.value
        var eventText = this.textInput.value
        var getDate = this.dateInput.value
        var date
        getDate == "" ? date = "" : date = new Date(getDate).toDateString()
        var newEvent = {mentioningEvent,eventText,date}
        var events = this.props.standUpData.events
        events.push(newEvent)
        this.setState({events},()=>{
            this.memberSelected.value = ""
            this.textInput.value = ""
            this.dateInput.value = ""
        })
    }

    closeInteresting(event){
        event.target.parentElement.parentElement.style.display = "none";

    }

    pickDate(){
        $("#datepicker").datepicker();
    }

  render() {
    var membersList = [ "None","Abdul","Abhishek","Animesh","Anish","Anusha","Ashish","Bharat","Chandra","Dikshita","Dinesh","Divya","Geeta","Harish","Hemu","Himanshu","Jimit","John","Jotsna","Kapil","KK","Sameer","Lavanya","Meenu","Mukesh","Naveen","Nirmal","Pankaj","Praveen","Raja","Rakesh D","Rakesh S","Raman","Rohit","Senthil","Shashank","Srinivas","Shree","Shrey","Thiru","Vinod","Sumit","Swapnil","Vinit","Vivek"]
    var events = this.state.events
    return (
    <div id="standUpContent">
        <div id="itemsHeading">{this.props.heading}</div>
        {
            events.map((val,i)=>{
                return(
                <div id="closeHelpSection" className={val.date=="" ?"PickDateWrap":""} key={i} data-id={i+1}>
                    <div id="closeHelpDiv"><div id="closeHelp" onClick={this.closeInteresting}>+</div></div>
                    <div id={val.date=="" ?"closeEventEmptyDate":"closeEventContent"}>
                        <div id={val.mentioningEvent.length>6?"askingHelpReadOnlyFont" :"askingHelpReadOnly"}>
                            {val.mentioningEvent}
                        </div> : 
                        <span id="helpItemReadOnly">{ '"'+ val.eventText + '"'}</span>
                    </div>
                    {val.date != "" ? <div id="eventDate">{ " - "+ val.date}</div> : 
                    <div id="searchDiv">
                        <span id="searchSpan"><img id="searchLogo" src="images/search-logo.png" alt="img"/></span>
                        <input type="text" id="datepicker" placeholder="Pick Date" ref={(input) => { this.dateInput = input}} onClick={this.pickDate}/>                    
                    </div>}
                </div>
                )
            })
        }
        <div id="eventSection">
            <div id="eventContent">
                <div id="askingHelp">
                    <div id="searchDiv">
                        <span id="searchSpan"><img id="searchLogo" src="images/search-logo.png" alt="img"/></span>
                        <input id="listMembers" list="memberList" placeholder="Search" ref={(input) => { this.memberSelected = input}}/>
                        <datalist id="memberList">
                            {membersList.map((val,i)=><option key={i} value={val}/>)}
                        </datalist>
                    </div>
                </div> : 
                <input id="helpTextArea" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInput = input}} />       
                <span id="addHelp" onClick={this.addEvent}>+</span> 
            </div>
            <div id="searchDiv">
                <span id="searchSpan"><img id="searchLogo" src="images/search-logo.png" alt="img"/></span>
                <input type="text" id="datepicker" placeholder="Pick Date" ref={(input) => { this.dateInput = input}} onClick={this.pickDate}/>                    
            </div>
        </div>
    </div>
    );
  }
}
