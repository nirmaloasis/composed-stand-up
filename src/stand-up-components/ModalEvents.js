import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import Linkify from 'react-linkify/dist/Linkify'
import io from 'socket.io-client'

export default class ModalEvents extends React.Component {
    constructor(props){
        super(props)
        this.state = {events : this.props.standUpData.events,action:"normal",helpId:""}
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
        this.clapReplica = this.clapReplica.bind(this)
        this.moveToInteresting = this.moveToInteresting.bind(this)
        this.sortEvents = this.sortEvents.bind(this)
    }

    componentDidMount(){
        this.socket = io('/')
        this.socket.on('add-content',(data)=>{
            this.setState({events : data.events},()=>{})
        })
    }

    enterKeyAddEvent(event){
        if(event.keyCode == 13)
            document.getElementById("addEventModal").click()
    }

    enterKeyEditEvent(event){
        if(event.keyCode == 13)
            document.getElementById("addEditedEvent").click()
    }

    sortEvents(newEvent,events){
        var index=0,newDate = new Date(newEvent.date)                          
        for(var i=0;i<events.length;i++){
            if( newEvent.date == ""){
                index = events.length
                break
            }
            if(events[i].date == "" ||  newDate <= new Date(events[i].date)){
                index = i
                break
            }
            else{
                index=i+1
            }
        }
        events.splice(index, 0, newEvent)
        return events
    }

    addEditedEvent(event,i,val){
       var element = event.target.parentElement.parentElement
        if(element.querySelector("#editEventMember").value== ""){
            element.querySelector("#editEventMember").focus()
        }
        else if(element.querySelector("#editEventTextModal"+i).value== ""){
            element.querySelector("#editEventTextModal"+i).focus()
        }
        else{
            var getDate = element.querySelector("#datepickerModalEdit").value
            if(getDate =="" || (Object.prototype.toString.call(new Date(getDate)) === '[object Date]' && isFinite(new Date(getDate)))){
                var mentioningEvent = element.querySelector("#editEventMember").value
                var eventText = element.querySelector("#editEventTextModal"+i).value
                var date
                getDate == "" ? date = "" : date = new Date(getDate).toDateString()
                var eventDetails = val.eventDetails
                var newEvent = [{mentioningEvent,eventText,date,eventDetails}]
                var events = this.state.events
                getDate == "" ? "" : newEvent = this.props.refineEventList(newEvent)
                if(newEvent.length == 0){
                    element.querySelector("#eventDateExpiredModal").innerText = "Event Date is Expired."
                    element.querySelector("#eventDateExpiredModal").style.display = "block"
                    setTimeout(()=>{
                        element.querySelector("#eventDateExpiredModal").style.display = "none"
                    },2000)
                }
                else{
                    events[i] = newEvent[0]
                    events.splice(i,1)
                    events = this.sortEvents(newEvent[0],events)
                    this.state.action = "normal"
                    this.socket.emit('add-content',{content : events, contentType : "events"})  
                } 
            }
            else{
                element.querySelector("#eventDateExpiredModal").innerText = "Invalid Date."
                element.querySelector("#eventDateExpiredModal").style.display = "block"
                    setTimeout(()=>{
                        element.querySelector("#eventDateExpiredModal").style.display = "none"
                },2000)
            }
        }
        this.state.action = "normal"
    }
    
    addEvent(event){
        if(this.memberSelectedEventModal.value== ""){
            this.memberSelectedEventModal.focus()
        }
        else if(this.textInputEventModal.value == ""){
            this.textInputEventModal.focus()
        }
        else{
            var getDate = this.dateInputModal.value
            if(getDate =="" || (Object.prototype.toString.call(new Date(getDate)) === '[object Date]' && isFinite(new Date(getDate)))){
                var mentioningEvent = this.memberSelectedEventModal.value
                var eventText = this.textInputEventModal.value
                var date
                getDate == "" ? date = "" : date = new Date(getDate).toDateString()
                var eventDetails = ""
                var newEvent = [{mentioningEvent,eventText,date,eventDetails}]
                var events = this.state.events
                getDate == "" ? "" : newEvent = this.props.refineEventList(newEvent)
                this.state.action = "normal"
                if(newEvent.length == 0){
                    document.getElementById("eventDateExpiredModal").innerText = "Event Date is Expired."
                    document.getElementById("eventDateExpiredModal").style.display = "block"
                    setTimeout(()=>{
                        document.getElementById("eventDateExpiredModal").style.display = "none"
                    },2000)
                }
                else{
                    events = this.sortEvents(newEvent[0],events)
                    this.state.action = "normal"
                    this.setState({events},()=>{
                        this.memberSelectedEventModal.value = ""
                        this.textInputEventModal.value = ""
                        this.dateInputModal.value = ""
                        this.socket.emit('add-content',{content : events, contentType : "events"}) 
                    }) 
                } 
            }
            else{
                document.getElementById("eventDateExpiredModal").innerText = "Invalid Date."
                document.getElementById("eventDateExpiredModal").style.display = "block"
                    setTimeout(()=>{
                        document.getElementById("eventDateExpiredModal").style.display = "none"
                },2000)
            }
        }
        this.state.action = "normal"
    }

    closeHelp(event,i){
        var events = this.state.events
        var id = i
        events.splice(id,1)
        this.state.action = "normal"
        this.socket.emit('add-content',{content : events, contentType : "events"})          
    }

    returnToHomeTile(event){
        this.setState({action : "normal"})
    }

    editHelp(event,i){
        this.setState({action : "edit",helpId : i},()=>{
            document.getElementById("editEventTextModal"+i).focus()
        })
    }

    helpDetails(event,i){
        this.setState({action : "details",helpId : i},()=>{
            document.getElementById("eventDescriptionModal").focus()
        })
    }

    pickDate(){
        $("#datepickerModal").datepicker().datepicker("show")
        document.getElementById("ui-datepicker-div").style.fontSize = "30px"
    }

    datepickerEdit(){
        $("#datepickerModalEdit").datepicker().datepicker("show")
        document.getElementById("ui-datepicker-div").style.fontSize = "30px"
    }

    pickDateExtra(event){
       var strId = "#"+ event.target.id
        $(strId).datepicker().datepicker("show")
        document.getElementById("ui-datepicker-div").style.fontSize = "30px"
    }

    addEventExtra(event,i,val){
        var date = document.getElementById("datepickerModalExtra"+i).value
        var inputExtra = event.target.parentElement.parentElement.querySelector('#eventDateExpiredModalExtra')
        if((Object.prototype.toString.call(new Date(date)) === '[object Date]' && isFinite(new Date(date)))){
            var events = this.state.events
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
                    this.socket.emit('add-content',{content : events, contentType : "events"})
                },2000)
            }
            else{
                document.getElementById("datepickerModalExtra"+i).value = ""
                var newEvent = events.splice(i,1)
                events = this.sortEvents(newEvent[0],events)
                this.socket.emit('add-content',{content : events, contentType : "events"})
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
        if(document.getElementById("eventDescriptionModal").value == ""){
            document.getElementById("eventDescriptionModal").focus()
        }
        else{
            val.eventDetails = document.getElementById("eventDescriptionModal").value
            var events = this.state.events
            events[i] = val
            this.state.action = "normal"
            this.socket.emit('add-content',{content : events, contentType : "events"})
        }
    }

    closeModal(event){
        if(event.target.id == 'zoomEvents' || event.target.id == 'closeModal' )
            document.getElementById('zoomEvents').style.display = "none"
    }

    clapReplica(){
        document.getElementById('zoomEvents').style.display = "none"
        this.props.letUsClap()
    }

    moveToInteresting(){
        document.getElementById('zoomEvents').style.display = "none"
        document.getElementById('zoomInterestings').style.display = "block"
    }

  render() {
    var membersList = [ "None","Abdul","Abhishek","Animesh","Anish","Anusha","Ashish","Bharat","Chandra","Dikshita","Dinesh","Divya","Geeta","Harish","Hemu","Himanshu","Jimit","John","Jotsna","KK","Sameer","Lavanya","Meenu","Naveen","Nirmal","Pankaj","Praveen","Raja","Rakesh D","Rakesh S","Raman","Rohit","Senthil","Shashank","Srinivas","Shree","Shrey","Thiru","Vinod","Sumit","Swapnil","Vinit","Vivek"]
    var events = this.state.events
    var bodyHeight = this.props.windowHeight - 150
    return (
        <div className="StandUpContentModal" id="zoomEvents" onClick={this.closeModal}>
            <div className="modal-dialog">
                <div id="modalHelpHeading" className="ModalEventHeading">
                    <span className="MoveToNext MoveToPrev" onClick={this.moveToInteresting}>go back to Interestings</span>
                    {this.props.heading}
                    {/*<div id="closeModal" onClick={this.closeModal}>&times;</div>*/}
                    <span className="ClapBtnExtra" onClick={this.clapReplica}>Let's Clap on 3</span>
                </div>
                <div className="modal-body" style={ {height: bodyHeight}}>
            { events.map((val,i)=>{
                return(
                    <div key={i} className="InfoTilesWrapper EventTilePaddingB" data-id={i}>
                        <div className="EditCloseIcon">
                            <span className="CloseTileIcon" onClick={(event)=>this.closeHelp(event,i)}>&times;<span className="ToolTipText ModalToolTipFont">remove</span></span>
                            <span className="IconsSpan" onClick={(event)=>this.editHelp(event,i)}><img className="ModalIcons"  src="images/edit-icon.png" alt="edit" /><span className="ToolTipText ModalToolTipFont">edit</span></span>
                            <span className="IconsSpan" onClick={(event)=>this.helpDetails(event,i)}>{val.eventDetails ? <img className="NotificationIconModal" src="images/comment-icon.png" alt="details" />: ""}<img className="ModalIcons" src="images/details.png" alt="details" /><span className="ToolTipText ModalToolTipFont">details</span></span>
                            { this.state.helpId == i && (this.state.action == "edit" || this.state.action == "details") ?<span className="IconsSpan" onClick={(event)=>this.returnToHomeTile(event,i)}><img className="ModalIcons" src="images/previous.svg" alt="return"/><span className="ToolTipText ModalToolTipFont">return</span></span>:""}
                        </div>
                        {   
                            this.state.action == "edit" && this.state.helpId == i ?
                            <div >
                                <div className="TileContent" id="eventAddTile">
                                    <input  id="editEventMember" className="MemberList ModalNameListSize MemberListModalFont" list="memberList" placeholder="Name" defaultValue={val.mentioningEvent}  onKeyUp={this.enterKeyEditEvent}/>
                                    <datalist id="memberList">
                                        {membersList.map((val,i)=><option key={i} value={val}/>)}
                                    </datalist> : 
                                    <input id={"editEventTextModal"+i} className="MainAddContent ModalContentHelp MemberListModalFont" defaultValue={val.eventText} placeholder={"Add new " + this.props.heading} onKeyUp={this.enterKeyEditEvent} /> 
                                    <span id="addEditedEvent" className="AddItem AddItemModal" onClick={(event)=>this.addEditedEvent(event,i,val)}>+</span> 
                                </div>
                                <div id="searchDiv">
                                    <input type="text" id={"datepickerModalEdit"}  className="DatePicker DatePickerModal" placeholder="Pick Date" defaultValue={val.date} onClick={this.datepickerEdit} onKeyUp={this.enterKeyEditEvent}/>                    
                                    <span id={"eventDateExpiredModal"} className="ExpiredDateModal">
                                        Event Date is Expired.
                                    </span>
                                </div>
                            </div> : 
                            this.state.action == "details" && this.state.helpId == i ?
                                <div className="TileContent" id="helpEditTile">
                                    <textarea id="eventDescriptionModal" className="itemDetals itemDetalsModal" placeholder="Add description of the Event..." defaultValue={val.eventDetails}></textarea>
                                    <div><span id="addHelpDetails" className="AddItem AddItemModal" onClick={(event)=>this.addHelpDetails(event,i,val)}>+</span></div>
                                </div> :  
                            <div>
                                <div className="TileContent">
                                    <div id="askingHelpReadOnly">{val.mentioningEvent}</div> : 
                                    <span className="HelpText HelpTextModal" id="helpItemReadOnly">
                                        "<Linkify>{val.eventText}</Linkify>"
                                    </span>
                                </div>
                                {val.date != "" ? <div id="eventDateModal" className="ModalDate"> { val.refinedDate ? " - "+val.refinedDate : " - "+ val.date}</div> : 
                                <div id="searchDiv">
                                    <span id="searchDivExtraModal" className="SearchDivExtra">
                                        <input type="text" id={"datepickerModalExtra"+i} className="PickDateExtra DatePickerModal" placeholder="Pick Date" ref={(input) => { this.dateInputExtra = input}} onClick={this.pickDateExtra}/>                    
                                        <span id="addDate" className="AddLittleIcon" onClick={(event)=>this.addEventExtra(event,i)}>+</span>
                                    </span>
                                    <span id="eventDateExpiredModalExtra" className="ExpiredDateModal">
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
                <div className="TileContent EventPaddingModal">
                    <input className="MemberList ModalNameListSize MemberListModalFont" list="memberList" placeholder="Name" ref={(input) => { this.memberSelectedEventModal = input}} onKeyUp={this.enterKeyAddEvent}/>
                    <datalist id="memberList">
                        {membersList.map((val,i)=><option key={i} value={val}/>)}
                    </datalist> : 
                    <input id="EventTextArea" className="MainAddContent ModalContentHelp MemberListModalFont" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInputEventModal = input}} onKeyUp={this.enterKeyAddEvent} /> 
                    <span id="addEventModal" className="AddItem AddItemModal" onClick={this.addEvent}>+</span> 
                </div>
                <div id="searchDiv">
                    <input type="text" id="datepickerModal" className="DatePicker DatePickerModal" placeholder="Pick Date" ref={(input) => { this.dateInputModal = input}} onClick={this.pickDate} onKeyUp={this.enterKeyAddEvent}/>                    
                    <span id="eventDateExpiredModal" className="ExpiredDateModal">
                        Event Date is Expired.
                    </span>
                </div>
            </div>
            </div>  
        </div>  
    </div>  
    );
  }
}
