
import React, { Component, PropTypes } from 'react';
import axios from 'axios'

export default class ContentEvents extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.addEvent = this.addEvent.bind(this)
        this.closeInteresting = this.closeInteresting.bind(this)
        this.pickDate = this.pickDate.bind(this)
        this.pickDateExtra = this.pickDateExtra.bind(this)
        this.addEventExtra = this.addEventExtra.bind(this)
    }

    componentDidMount(){
        // $("#datepicker").datepicker();
        // $(".PickDateExtra").datepicker()
    }
    
    addEvent(event){
        if(this.memberSelected.value== ""){
            document.getElementById("eventContent").querySelector("#listMembers").focus()
        }
        else if(this.textInput.value == ""){
            document.getElementById("eventTextArea").focus()
        }
        else{
            var getDate = this.dateInput.value
            if(getDate =="" || (Object.prototype.toString.call(new Date(getDate)) === '[object Date]' && isFinite(new Date(getDate)))){
                var mentioningEvent = this.memberSelected.value
                var eventText = this.textInput.value
                var date
                getDate == "" ? date = "" : date = new Date(getDate).toDateString()
                debugger
                var newEvent = [{mentioningEvent,eventText,date}]
                var events = this.props.standUpData.events
                getDate == "" ? "" : newEvent = this.props.refineEventList(newEvent)
                if(newEvent.length == 0){
                    document.getElementById("eventDateExpired").innerText = "Event Date is Expired."
                    document.getElementById("eventDateExpired").style.display = "block"
                    setTimeout(()=>{
                        document.getElementById("eventDateExpired").style.display = "none"
                    },2000)
                }
                else{
                    events.push(newEvent[0])
                    this.setState({events},()=>{
                        this.memberSelected.value = ""
                        this.textInput.value = ""
                        this.dateInput.value = ""
                        this.props.loadThenUpdate({content : events, contentType : "events"}) 
                    }) 
                } 
            }
            else{
                document.getElementById("eventDateExpired").innerText = "Invalid Date."
                document.getElementById("eventDateExpired").style.display = "block"
                    setTimeout(()=>{
                        document.getElementById("eventDateExpired").style.display = "none"
                },2000)
            }
        }
    }

    closeInteresting(event){
        var events = this.props.standUpData.events
        var id = event.target.parentElement.parentElement.getAttribute("data-id")
        events.splice(id-1 ,1)
        this.props.loadThenUpdate({content : events, contentType : "events"})           
    }

    pickDate(){
        $("#datepicker").datepicker().datepicker("show")
    }

    pickDateExtra(event){
       // var strId = "#" + event.target.parentElement.id + " " + "#datepickerExtra"
       var strId = "#"+ event.target.id
        $(strId).datepicker().datepicker("show")
    }

    addEventExtra(event){
        if(this.dateInputExtra.value == ""){
            event.target.parentElement.getElementsByClassName('PickDateExtra')[0].focus()
        }
        else{
            var date = this.dateInputExtra.value
            var inputExtra = event.target.parentElement.parentElement.querySelector('#eventDateExpiredExtra')
            if(date == "" || (Object.prototype.toString.call(new Date(date)) === '[object Date]' && isFinite(new Date(date)))){
                var events = this.props.standUpData.events
                var id =  event.target.parentElement.parentElement.parentElement.getAttribute('data-id') -1;
                events[id].date = new Date(date).toDateString() 
                var temp = this.props.refineEventList(events)
                if(temp.length < events.length){
                    inputExtra.innerText = "Event Date is Expired."
                    inputExtra.style.display = "block"
                    events[id].date = ""
                    setTimeout(()=>{
                        inputExtra.style.display = "none"
                        this.props.loadThenUpdate({content : events, contentType : "events"})
                    },2000)
                }
                else{
                    this.props.loadThenUpdate({content : events, contentType : "events"})
                }  
            }
            else{
                inputExtra.innerText = "Invalid Date."
                inputExtra.style.display = "block"
                    setTimeout(()=>{
                        inputExtra.style.display = "none"
                },2000)        
            }              
        }
    }

  render() {
    var membersList = [ "None","Abdul","Abhishek","Animesh","Anish","Anusha","Ashish","Bharat","Chandra","Dikshita","Dinesh","Divya","Geeta","Harish","Hemu","Himanshu","Jimit","John","Jotsna","Kapil","KK","Sameer","Lavanya","Meenu","Mukesh","Naveen","Nirmal","Pankaj","Praveen","Raja","Rakesh D","Rakesh S","Raman","Rohit","Senthil","Shashank","Srinivas","Shree","Shrey","Thiru","Vinod","Sumit","Swapnil","Vinit","Vivek"]
    var events = this.props.standUpData.events
    return (
    <div id="standUpContent">
        <div id="itemsHeading">{this.props.heading}</div>
        {
            events.map((val,i)=>{
                return(
                <div id="closeEventSection" className={val.date=="" ?"PickDateWrap":""} key={i} data-id={i+1}>
                    <div id="closeHelpDiv"><div id="closeHelp" onClick={this.closeInteresting}>+</div></div>
                    <div id={val.date=="" ?"closeEventEmptyDate":"closeEventContent"}>
                        <div id={val.mentioningEvent.length>6?"askingHelpReadOnlyFont" :"askingHelpReadOnly"}>
                            {val.mentioningEvent}
                        </div> : 
                        <span id="helpItemReadOnly">{ '"'+ val.eventText + '"'}</span>
                    </div>
                    {val.date != "" ? <div id="eventDate">{ val.refinedDate ? " - "+val.refinedDate : " - "+ val.date}</div> : 
                    <div id="searchDiv">
                        <span id="searchDivExtra" className="SearchDivExtra">
                            <span id="searchSpanExtra"><img id="searchLogo" src="images/search-logo.png" alt="img"/></span>
                            <input type="text" id={"datepickerExtra"+i} className="PickDateExtra" placeholder="Pick Date" ref={(input) => { this.dateInputExtra = input}} onClick={this.pickDateExtra}/>                    
                            <span id="addHelper" onClick={this.addEventExtra}>+</span>
                        </span>
                        <span id="eventDateExpiredExtra" className="ExpiredDate">
                            Event Date is Expired.
                        </span>
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
                        <input id="listMembers" list="memberList" placeholder="Name" ref={(input) => { this.memberSelected = input}}/>
                        <datalist id="memberList">
                            {membersList.map((val,i)=><option key={i} value={val}/>)}
                        </datalist>
                    </div>
                </div> : 
                <input id="eventTextArea" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInput = input}} />       
                <span id="addHelp" onClick={this.addEvent}>+</span> 
            </div>
            <div id="searchDiv">
                <span id="searchSpan"><img id="searchLogo" src="images/search-logo.png" alt="img"/></span>
                <input type="text" id="datepicker" placeholder="Pick Date" ref={(input) => { this.dateInput = input}} onClick={this.pickDate}/>                    
                <span id="eventDateExpired" className="ExpiredDate">
                    Event Date is Expired.
                </span>
            </div>
        </div>
    </div>
    );
  }
}
