import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import Linkify from 'react-linkify/dist/Linkify'

export default class ContentEvents extends React.Component {
    constructor(props){
        super(props)
        this.state = {action:"normal",helpId:""}
        this.addEvent = this.addEvent.bind(this)
        this.editHelp = this.editHelp.bind(this)
        this.closeHelp = this.closeHelp.bind(this)
        this.helpDetails = this.helpDetails.bind(this)
        this.returnToHomeTile = this.returnToHomeTile.bind(this)
        this.addEditedEvent = this.addEditedEvent.bind(this)
        this.pickDate = this.pickDate.bind(this)
        this.pickDateExtra = this.pickDateExtra.bind(this)
        this.addEventExtra = this.addEventExtra.bind(this)
        this.enterKeyAddEvent = this.enterKeyAddEvent.bind(this)
        this.zoomInEvents = this.zoomInEvents.bind(this)
    }

    enterKeyAddEvent(event){
        if(event.keyCode == 13)
            document.getElementById("addEvent").click()
    }

    enterKeyEditEvent(event){
        if(event.keyCode == 13)
            document.getElementById("addEditedEvent").click()
    }

    addEditedEvent(event,i,val){
       var element = event.target.parentElement.parentElement
        if(element.querySelector("#editEventMember").value== ""){
            element.querySelector("#editEventMember").focus()
        }
        else if(element.querySelector("#editEventText"+i).value== ""){
            element.querySelector("#editEventText"+i).focus()
        }
        else{
            var getDate = element.querySelector("#datepickerEdit").value
            if(getDate =="" || (Object.prototype.toString.call(new Date(getDate)) === '[object Date]' && isFinite(new Date(getDate)))){
                var mentioningEvent = element.querySelector("#editEventMember").value
                var eventText = element.querySelector("#editEventText"+i).value
                var date
                getDate == "" ? date = "" : date = new Date(getDate).toDateString()
                var eventDetails = val.eventDetails
                var newEvent = [{mentioningEvent,eventText,date,eventDetails}]
                var events = this.props.standUpData.events
                getDate == "" ? "" : newEvent = this.props.refineEventList(newEvent)
                if(newEvent.length == 0){
                    element.querySelector("#eventDateExpired").innerText = "Event Date is Expired."
                    element.querySelector("#eventDateExpired").style.display = "block"
                    setTimeout(()=>{
                        element.querySelector("#eventDateExpired").style.display = "none"
                    },2000)
                }
                else{
                    events[i] = newEvent[0]
                    this.state.action = "normal"
                    this.props.loadThenUpdate({content : events, contentType : "events"})  
                } 
            }
            else{
                element.querySelector("#eventDateExpired").innerText = "Invalid Date."
                element.querySelector("#eventDateExpired").style.display = "block"
                    setTimeout(()=>{
                        element.querySelector("#eventDateExpired").style.display = "none"
                },2000)
            }
        }
        this.state.action = "normal"
    }
    
    addEvent(event){
        if(this.memberSelectedEvent.value== ""){
            this.memberSelectedEvent.focus()
        }
        else if(this.textInputEvent.value == ""){
            this.textInputEvent.focus()
        }
        else{
            var getDate = this.dateInput.value
            if(getDate =="" || (Object.prototype.toString.call(new Date(getDate)) === '[object Date]' && isFinite(new Date(getDate)))){
                var mentioningEvent = this.memberSelectedEvent.value
                var eventText = this.textInputEvent.value
                var date
                getDate == "" ? date = "" : date = new Date(getDate).toDateString()
                var eventDetails = ""
                var newEvent = [{mentioningEvent,eventText,date,eventDetails}]
                var events = this.props.standUpData.events
                getDate == "" ? "" : newEvent = this.props.refineEventList(newEvent)
                this.state.action = "normal"
                if(newEvent.length == 0){
                    document.getElementById("eventDateExpired").innerText = "Event Date is Expired."
                    document.getElementById("eventDateExpired").style.display = "block"
                    setTimeout(()=>{
                        document.getElementById("eventDateExpired").style.display = "none"
                    },2000)
                }
                else{
                    events.push(newEvent[0])
                    this.state.action = "normal"
                    this.setState({events},()=>{
                        this.memberSelectedEvent.value = ""
                        this.textInputEvent.value = ""
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
        this.state.action = "normal"
    }

    closeHelp(event,i){
        var events = this.props.standUpData.events
        var id = i
        events.splice(id,1)
        this.state.action = "normal"
        this.props.loadThenUpdate({content : events, contentType : "events"})          
    }

    returnToHomeTile(event){
        this.setState({action : "normal"})
    }

    editHelp(event,i){
        this.setState({action : "edit",helpId : i},()=>{
            document.getElementById("editEventText"+i).focus()
        })
    }

    helpDetails(event,i){
        this.setState({action : "details",helpId : i},()=>{
            document.getElementById("eventDescription").focus()
        })
    }

    pickDate(){
        $("#datepicker").datepicker().datepicker("show")
        document.getElementById("ui-datepicker-div").style.fontSize = "15px"
    }

    datepickerEdit(){
        $("#datepickerEdit").datepicker().datepicker("show")
        document.getElementById("ui-datepicker-div").style.fontSize = "15px"
    }

    pickDateExtra(event){
       var strId = "#"+ event.target.id
        $(strId).datepicker().datepicker("show")
        document.getElementById("ui-datepicker-div").style.fontSize = "15px"
    }

    addEventExtra(event,i,val){
        debugger
        var date = document.getElementById("datepickerExtra"+i).value
        var inputExtra = event.target.parentElement.parentElement.querySelector('#eventDateExpiredExtra')
        if(date == "" || (Object.prototype.toString.call(new Date(date)) === '[object Date]' && isFinite(new Date(date)))){
            var events = this.props.standUpData.events
            var id =  i
            events[id].date = new Date(date).toDateString()
            var temp = this.props.refineEventList(events)
            this.state.action = "normal"
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
        this.state.action = "normal"
    }

    addHelpDetails(event,i,val){
        if(document.getElementById("eventDescription").value == ""){
            document.getElementById("eventDescription").focus()
        }
        else{
            val.eventDetails = document.getElementById("eventDescription").value
            var events = this.props.standUpData.events
            events[i] = val
            this.state.action = "normal"
            this.props.loadThenUpdate({content : events, contentType : "events"})
        }
    }

    zoomInEvents(event){
        document.getElementById('zoomEvents').style.display = "block"       
    }

  render() {
    var membersList = [ "None","Abdul","Abhishek","Animesh","Anish","Anusha","Ashish","Bharat","Chandra","Dikshita","Dinesh","Divya","Geeta","Harish","Hemu","Himanshu","Jimit","John","Jotsna","KK","Sameer","Lavanya","Meenu","Naveen","Nirmal","Pankaj","Praveen","Raja","Rakesh D","Rakesh S","Raman","Rohit","Senthil","Shashank","Srinivas","Shree","Shrey","Thiru","Vinod","Sumit","Swapnil","Vinit","Vivek"]
    var events = this.props.standUpData.events
    return (
        <div id="standUpContent">
            <div id="itemsHeading" onClick={this.zoomInEvents}>{this.props.heading}</div>
            <div className="ForOverFlow"> 
            { events.map((val,i)=>{
                return(
                    <div key={i} className="InfoTilesWrapper EventTilePaddingB" data-id={i}>
                        <div className="EditCloseIcon">
                            <span className="CloseTileIcon" onClick={(event)=>this.closeHelp(event,i)}>&times;<span className="ToolTipText">remove</span></span>
                            <span className="IconsSpan" onClick={(event)=>this.editHelp(event,i)}><img className="Icons"  src="images/edit-icon.png" alt="edit" /><span className="ToolTipText">edit</span></span>
                            <span className="IconsSpan" onClick={(event)=>this.helpDetails(event,i)}>{val.eventDetails ? <img className="NotificationIcon" src="images/comment-icon.png" alt="details" />: ""}<img className="Icons" src="images/details.png" alt="details" /><span className="ToolTipText">details</span></span>
                            <span className="IconsSpan" onClick={(event)=>this.returnToHomeTile(event,i)}><img className="Icons" src="images/home-icon.png" alt="return"/><span className="ToolTipText">return</span></span>
                        </div>
                        {   
                            this.state.action == "edit" && this.state.helpId == i ?
                            <div >
                                <div className="TileContent" id="eventAddTile">
                                    <input  id="editEventMember" className="MemberList" list="memberList" placeholder="Name" defaultValue={val.mentioningEvent}  onKeyUp={this.enterKeyEditEvent}/>
                                    <datalist id="memberList">
                                        {membersList.map((val,i)=><option key={i} value={val}/>)}
                                    </datalist> : 
                                    <input id={"editEventText"+i} className="MainAddContent" defaultValue={val.eventText} placeholder={"Add new " + this.props.heading} onKeyUp={this.enterKeyEditEvent} /> 
                                    <span id="addEditedEvent" className="AddItem" onClick={(event)=>this.addEditedEvent(event,i,val)}>+</span> 
                                </div>
                                <div id="searchDiv">
                                    <input type="text" id={"datepickerEdit"}  className="DatePicker" placeholder="Pick Date" defaultValue={val.date} onClick={this.datepickerEdit} onKeyUp={this.enterKeyEditEvent}/>                    
                                    <span id={"eventDateExpired"} className="ExpiredDate">
                                        Event Date is Expired.
                                    </span>
                                </div>
                            </div> : 
                            this.state.action == "details" && this.state.helpId == i ?
                                <div className="TileContent" id="helpEditTile">
                                    <textarea id="eventDescription" className="itemDetals" placeholder="Add description of the help..." defaultValue={val.eventDetails}></textarea>
                                    <div><span id="addHelpDetails" className="AddItem" onClick={(event)=>this.addHelpDetails(event,i,val)}>+</span></div>
                                </div> :  
                            <div>
                                <div className="TileContent">
                                    <div id="askingHelpReadOnly">{val.mentioningEvent}</div> : 
                                    <span className="HelpText" id="helpItemReadOnly">"<Linkify>{val.eventText}</Linkify>"</span>
                                </div>
                                {val.date != "" ? <div id="eventDate">{ val.refinedDate ? " - "+val.refinedDate : " - "+ val.date}</div> : 
                                <div id="searchDiv">
                                    <span id="searchDivExtra" className="SearchDivExtra">
                                        <input type="text" id={"datepickerExtra"+i} className="PickDateExtra" placeholder="Pick Date" ref={(input) => { this.dateInputExtra = input}} onClick={this.pickDateExtra}/>                    
                                        <span id="addDate" className="AddLittleIcon" onClick={(event)=>this.addEventExtra(event,i,val)}>+</span>
                                    </span>
                                    <span id="eventDateExpiredExtra" className="ExpiredDate">
                                        Event Date is Expired.
                                    </span>
                                </div>}
                            </div>
                        }   
                    </div>
                )
            })
        }
        <div  className="InfoTilesWrapper EventTilePaddingB">
            <div className="TileContent EventPadding">
                <input className="MemberList" list="memberList" placeholder="Name" ref={(input) => { this.memberSelectedEvent = input}} onKeyUp={this.enterKeyAddEvent}/>
                <datalist id="memberList">
                    {membersList.map((val,i)=><option key={i} value={val}/>)}
                </datalist> : 
                <input id="EventTextArea" className="MainAddContent" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInputEvent = input}} onKeyUp={this.enterKeyAddEvent} /> 
                <span id="addEvent" className="AddItem" onClick={this.addEvent}>+</span> 
            </div>
            <div id="searchDiv">
                <input type="text" id="datepicker" className="DatePicker" placeholder="Pick Date" ref={(input) => { this.dateInput = input}} onClick={this.pickDate} onKeyUp={this.enterKeyAddEvent}/>                    
                <span id="eventDateExpired" className="ExpiredDate">
                    Event Date is Expired.
                </span>
            </div>
        </div>
    </div>
</div>
    );
  }
}
