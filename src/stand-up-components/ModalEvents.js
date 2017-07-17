import React, { Component, PropTypes } from 'react';
import axios from 'axios'

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
        debugger
       var element = event.target.parentElement.parentElement
        if(element.querySelector("#editEventMember").value== ""){
            element.querySelector("#editEventMember").focus()
        }
        else if(element.querySelector("#editEventText"+i).value== ""){
            element.querySelector("#editEventText"+i).focus()
        }
        else{
            var getDate = element.querySelector("#datepickerModalEdit").value
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
                        this.memberSelectedEventModal.value = ""
                        this.textInputEventModal.value = ""
                        this.dateInputModal.value = ""
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
        })
    }

    helpDetails(event,i){
        this.setState({action : "details",helpId : i},()=>{
            document.getElementById("eventDescriptionModal").focus()
        })
    }

    pickDate(){
        $("#datepickerModal").datepicker().datepicker("show")
    }

    datepickerEdit(){
        $("#datepickerModalEdit").datepicker().datepicker("show")
    }

    pickDateExtra(event){
       // var strId = "#" + event.target.parentElement.id + " " + "#datepickerExtra"
       var strId = "#"+ event.target.id
        $(strId).datepicker().datepicker("show")
    }

    addEventExtra(event,i){
        debugger
        if(this.dateInputExtra.value == ""){
            event.target.parentElement.getElementsByClassName('PickDateExtra')[0].focus()
        }
        else{
            var date = this.dateInputExtra.value
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
        }
        this.state.action = "normal"
    }

    addHelpDetails(event,i,val){
        if(document.getElementById("eventDescriptionModal").value == ""){
            document.getElementById("eventDescriptionModal").focus()
        }
        else{
            val.eventDetails = document.getElementById("eventDescriptionModal").value
            var events = this.props.standUpData.events
            events[i] = val
            this.state.action = "normal"
            this.props.loadThenUpdate({content : events, contentType : "events"})
        }
    }

    closeModal(event){
        if(event.target.id == 'zoomEvents' || event.target.id == 'closeModal' )
            document.getElementById('zoomEvents').style.display = "none"
    }

  render() {
    var membersList = [ "None","Abdul","Abhishek","Animesh","Anish","Anusha","Ashish","Bharat","Chandra","Dikshita","Dinesh","Divya","Geeta","Harish","Hemu","Himanshu","Jimit","John","Jotsna","Kapil","KK","Sameer","Lavanya","Meenu","Mukesh","Naveen","Nirmal","Pankaj","Praveen","Raja","Rakesh D","Rakesh S","Raman","Rohit","Senthil","Shashank","Srinivas","Shree","Shrey","Thiru","Vinod","Sumit","Swapnil","Vinit","Vivek"]
    var events = this.props.standUpData.events
    return (
        <div className="StandUpContentModal" id="zoomEvents" onClick={this.closeModal}>
            <div className="modal-dialog">
                <div id="modalHelpHeading">
                    {this.props.heading}
                    <div id="closeModal" onClick={this.closeModal}>&times;</div>
                </div>
                <div className="modal-body">
            { events.map((val,i)=>{
                return(
                    <div key={i} className="InfoTilesWrapper EventTilePaddingB" data-id={i}>
                        <div className="EditCloseIcon">
                            <span className="CloseTileIcon" onClick={(event)=>this.closeHelp(event,i)}>&times;<span className="ToolTipText ModalToolTipFont">remove</span></span>
                            <span className="IconsSpan" onClick={(event)=>this.editHelp(event,i)}><img className="ModalIcons"  src="images/edit-icon.png" alt="edit" /><span className="ToolTipText ModalToolTipFont">edit</span></span>
                            <span className="IconsSpan" onClick={(event)=>this.helpDetails(event,i)}><img className="ModalIcons" src="images/details.png" alt="details" /><span className="ToolTipText ModalToolTipFont">details</span></span>
                            <span className="IconsSpan" onClick={(event)=>this.returnToHomeTile(event,i)}><img className="ModalIcons" src="images/home-icon.png" alt="return"/><span className="ToolTipText ModalToolTipFont">return</span></span>
                        </div>
                        {   
                            this.state.action == "edit" && this.state.helpId == i ?
                            <div >
                                <div className="TileContent" id="eventAddTile">
                                    <input  id="editEventMember" className="MemberList ModalNameListSize MemberListModalFont" list="memberList" placeholder="Name" defaultValue={val.mentioningEvent}  onKeyUp={this.enterKeyEditEvent}/>
                                    <datalist>
                                        {membersList.map((val,i)=><option key={i} value={val}/>)}
                                    </datalist> : 
                                    <input id={"editEventText"+i} className="MainAddContent ModalContentHelp MemberListModalFont" defaultValue={val.eventText} placeholder={"Add new " + this.props.heading} onKeyUp={this.enterKeyEditEvent} /> 
                                    <span id="addEditedEvent" className="AddItem AddItemModal" onClick={(event)=>this.addEditedEvent(event,i,val)}>+</span> 
                                </div>
                                <div id="searchDiv">
                                    <input type="text" id={"datepickerModalEdit"}  className="DatePicker DatePickerModal" placeholder="Pick Date" defaultValue={val.date} onClick={this.datepickerEdit} onKeyUp={this.enterKeyEditEvent}/>                    
                                    <span id={"eventDateExpired"} className="ExpiredDate">
                                        Event Date is Expired.
                                    </span>
                                </div>
                            </div> : 
                            this.state.action == "details" && this.state.helpId == i ?
                                <div className="TileContent" id="helpEditTile">
                                    <textarea id="eventDescriptionModal" className="itemDetals" placeholder="Add description of the help..." defaultValue={val.eventDetails}></textarea>
                                    <div><span id="addHelpDetails" className="AddItem AddItemModal" onClick={(event)=>this.addHelpDetails(event,i,val)}>+</span></div>
                                </div> :  
                            <div>
                                <div className="TileContent">
                                    <div id="askingHelpReadOnlyFont">{val.mentioningEvent}</div> : 
                                    <span id="helpItemReadOnly">{ '"'+ val.eventText + '"'}</span>
                                </div>
                                {val.date != "" ? <div id="eventDateModal" className="ModalDate"> { val.refinedDate ? " - "+val.refinedDate : " - "+ val.date}</div> : 
                                <div id="searchDiv">
                                    <span id="searchDivExtra" className="SearchDivExtra">
                                        <input type="text" id={"datepickerModalExtra"+i} className="PickDateExtra" placeholder="Pick Date" ref={(input) => { this.dateInputExtra = input}} onClick={this.pickDateExtra}/>                    
                                        <span id="addDate" className="AddLittleIcon" onClick={(event)=>this.addEventExtra(event,i)}>+</span>
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
                <div className="TileContent" id="helpAddTile">
                    <input className="MemberList ModalNameListSize MemberListModalFont" list="memberList" placeholder="Name" ref={(input) => { this.memberSelectedEventModal = input}} onKeyUp={this.enterKeyAddEvent}/>
                    <datalist>
                        {membersList.map((val,i)=><option key={i} value={val}/>)}
                    </datalist> : 
                    <input id="EventTextArea" className="MainAddContent ModalContentHelp MemberListModalFont" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInputEventModal = input}} onKeyUp={this.enterKeyAddEvent} /> 
                    <span id="addEvent" className="AddItem AddItemModal" onClick={this.addEvent}>+</span> 
                </div>
                <div id="searchDiv">
                    <input type="text" id="datepickerModal" className="DatePicker DatePickerModal" placeholder="Pick Date" ref={(input) => { this.dateInputModal = input}} onClick={this.pickDate} onKeyUp={this.enterKeyAddEvent}/>                    
                    <span id="eventDateExpired" className="ExpiredDate">
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
