import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import './info-tile/InfoTile.css'
import Linkify from 'react-linkify/dist/Linkify'
import io from 'socket.io-client'

export default class ModalHelps extends React.Component {
    constructor(props){
        super(props)
        this.state = {helps:this.props.standUpData.helps,action:"normal",helpId:""}
        this.closeModal = this.closeModal.bind(this)
        this.editHelp = this.editHelp.bind(this)
        this.addEditedHelp = this.addEditedHelp.bind(this)
        this.addHelpDetails = this.addHelpDetails.bind(this)
        this.enterKeyEditedHelp = this.enterKeyEditedHelp.bind(this)
        this.helpDetails = this.helpDetails.bind(this)
        this.returnToHomeTile = this.returnToHomeTile.bind(this)
        this.closeHelp = this.closeHelp.bind(this)
        this.addHelpingName = this.addHelpingName.bind(this)
        this.enterKeyAddHelper = this.enterKeyAddHelper.bind(this)
        this.enterKeyAddHelp = this.enterKeyAddHelp.bind(this)
        this.addHelp = this.addHelp.bind(this)
        this.zoomInInterestings = this.zoomInInterestings.bind(this)
    }

    componentWillMount(){
        this.socket = io('/')
        this.socket.on('add-content',(data)=>{
            this.setState({helps : data.helps},()=>{})
        })
    }

    closeModal(event){
        if(event.target.id == 'zoomHelp' || event.target.id == 'closeModal' )
            document.getElementById('zoomHelp').style.display = "none"
    }

    editHelp(event,i){
        var element = event.currentTarget
        this.setState({action : "edit",helpId : i},()=>{
            element.parentElement.parentElement.querySelector("#helpTextArea"+i).focus()
        })
    }

    addEditedHelp(event,i){
        var parentElement  = event.target.parentElement.parentElement
        var askingHelp = parentElement.querySelector("#askingHelp").value
        var helpText = parentElement.querySelector("#helpTextArea"+i).value
        if(askingHelp=="" || askingHelp=="None"){
            parentElement.querySelector("#askingHelp").focus()
        }
        else if(helpText == ""){
            parentElement.querySelector("#helpTextArea"+i).focus()
        }
        else{
            var date = new Date().toDateString()
            var helpedBy = parentElement.querySelector("#helpedBy").value =="" ? "None" : parentElement.querySelector("#helpedBy").value
            var helpItems = this.state.helps
            var helpDetails = helpItems[i].helpDetails
            var newHelp = {askingHelp,helpText,date,helpedBy,helpDetails}
            helpItems[i] = newHelp
            this.state.action = "normal"
            this.socket.emit('add-content',{content : helpItems, contentType : "helps"})
        }
    }

    enterKeyEditedHelp(event){
        if(event.keyCode == 13)
            event.target.parentElement.parentElement.querySelector("#addEditedHelp").click()
    }

    helpDetails(event,i){
        this.setState({action : "details",helpId : i},()=>{
            document.getElementById("helpDescriptionModal").focus()
        })
    }

    addHelpDetails(event,i,val){
        val.helpDetails = document.getElementById("helpDescriptionModal").value
        var helpItems = this.state.helps
        helpItems[i] = val
        this.state.action = "normal"
        this.socket.emit('add-content',{content : helpItems, contentType : "helps"})
    }

    returnToHomeTile(event){
        this.setState({action : "normal"})
    }

    closeHelp(event,i){
        var helpItems = this.state.helps
        var id = i
        helpItems.splice(id,1)
        this.state.action = "normal"
        this.socket.emit('add-content',{content : helpItems, contentType : "helps"})          
    }

    addHelpingName(event,i){
        var helpingPerson = document.getElementById("helpedByModal"+i)
        if( helpingPerson.value == ""){
            helpingPerson.focus()
        }
        else{
            var helpId = i
            var helpItems = this.state.helps
            helpItems[helpId].helpedBy = helpingPerson.value
            this.state.action = "normal"
            this.socket.emit('add-content',{content : helpItems, contentType : "helps"})
        }
    }

    enterKeyAddHelper(event){
        if(event.keyCode == 13)
            event.target.parentElement.querySelector("#addHelperModal").click()
    }

    addHelp(event){
        if(this.memberSelectedHelpModal.value == ""){
            this.memberSelectedHelpModal.focus()
        }
        else if(this.textInputHelpModal.value == ""){
            this.textInputHelpModal.focus()
        }
        else{
            var askingHelp = this.memberSelectedHelpModal.value
            var helpText = this.textInputHelpModal.value
            var date = new Date().toDateString()
            var helpedBy = "None"
            var helpItems = this.state.helps
            var newHelp = {askingHelp,helpText,date,helpedBy,helpDetails:""}
            helpItems.push(newHelp)
            this.memberSelectedHelpModal.value = ""
            this.textInputHelpModal.value = ""
            this.state.action = "normal"
            this.socket.emit('add-content',{content : helpItems, contentType : "helps"})
        }
    }

    enterKeyAddHelp(event){
        if(event.keyCode == 13)
            document.getElementById("addHelpModal").click()
    }

    zoomInInterestings(event){
        document.getElementById('zoomHelp').style.display = "none"
        document.getElementById('zoomInterestings').style.display = "block"
    }

  render() {
    var membersList = [ "None","Abdul","Abhishek","Animesh","Anish","Anusha","Ashish","Bharat","Chandra","Dikshita","Dinesh","Divya","Geeta","Harish","Hemu","Himanshu","Jimit","John","Jotsna","KK","Sameer","Lavanya","Meenu","Naveen","Nirmal","Pankaj","Praveen","Raja","Rakesh D","Rakesh S","Raman","Rohit","Senthil","Shashank","Srinivas","Shree","Shrey","Thiru","Vinod","Sumit","Swapnil","Vinit","Vivek"]
    var helpItems = this.state.helps
    var bodyHeight = this.props.windowHeight - 300
    return (
    <div className="StandUpContentModal" id="zoomHelp" onClick={this.closeModal}>
        <div className="modal-dialog">
            <div id="modalHelpHeading">
                {this.props.heading}
                {/*<div id="closeModal" onClick={this.closeModal}>&times;</div>*/}
                <span className="MoveToNext" onClick={this.zoomInInterestings}>Move to Interestings</span>
            </div>
            <div className="modal-body" style={ {height: bodyHeight}}>
                <div className="">  
                { helpItems.map((val,i)=>{
                    return (
                        <div key={i} className="InfoTilesWrapper" data-id={i}>
                            <div className="EditCloseIcon">
                                <span className="CloseTileIcon" onClick={(event)=>this.closeHelp(event,i)}>&times;<span className="ToolTipText ModalToolTipFont">remove</span></span>
                                <span className="IconsSpan" onClick={(event)=>this.editHelp(event,i)}><img className="ModalIcons"  src="images/edit-icon.png" alt="edit"/><span className="ToolTipText ModalToolTipFont">edit</span></span>
                                <span className="IconsSpan" onClick={(event)=>this.helpDetails(event,i)}>{val.helpDetails ? <img className="NotificationIconModal" src="images/comment-icon.png" alt="details" />: ""}<img className="ModalIcons" src="images/details.png" alt="details" /><span className="ToolTipText ModalToolTipFont">details</span></span>
                                <span className="IconsSpan" onClick={(event)=>this.returnToHomeTile(event,i)}><img className="ModalIcons" src="images/previous.svg" alt="return" /><span className="ToolTipText ModalToolTipFont">return</span></span>
                            </div>
                            {   
                                this.state.action == "edit" && this.state.helpId == i ?
                                    <div>
                                        <div className="TileContent" id="helpEditTile">
                                            <input className="MemberList ModalNameListSize MemberListModalFont" id="askingHelp" list="memberList" placeholder="Name" defaultValue={val.askingHelp} onKeyUp={this.enterKeyEditedHelp}/>
                                            <datalist id="memberList">
                                                {membersList.map((val,i)=><option key={i} value={val}/>)}
                                            </datalist> : 
                                            <input id={"helpTextArea"+i} className="MainAddContent ModalContentHelp MemberListModalFont" defaultValue={val.helpText} onKeyUp={this.enterKeyEditedHelp}/> 
                                            <span id="addEditedHelp" className="AddItem AddItemModal" onClick={(event)=>this.addEditedHelp(event,i)} >+</span> 
                                        </div>
                                        <div id="helpedByPerson">
                                            <input className="MemberList ModalNameListSize MemberListModalFont" id="helpedBy" list="memberList" placeholder="Volunteer" defaultValue={val.helpedBy == "None"?"":val.helpedBy} onKeyUp={this.enterKeyEditedHelp}/>
                                            <datalist id="memberList">
                                            {membersList.map((val,i)=><option key={i} value={val}/>)}
                                            </datalist>
                                        </div>
                                    </div> : 
                                        this.state.action == "details" && this.state.helpId == i ?
                                            <div className="TileContent" id="helpEditTile">
                                                <textarea id="helpDescriptionModal" className="itemDetals itemDetalsModal" placeholder="Add description of the help..." defaultValue={val.helpDetails}></textarea>
                                                <div><span id="addHelpDetails" className="AddItem AddItemModal" onClick={(event)=>this.addHelpDetails(event,i,val)}>+</span></div>
                                            </div> :  
                                        <div>
                                            <div className="TileContent">
                                                <div id="askingHelpReadOnly">{val.askingHelp}</div> : 
                                                <span id={"helpItemReadOnly"+i} className="HelpText HelpTextModal">
                                                    "<Linkify>{val.helpText}</Linkify>"
                                                </span>
                                            </div>
                                            <div id="helpedByPerson">
                                                <span className="DetailsReAdd" onClick={(event)=>this.helpDetails(event,i)}>{val.helpDetails ? "View Details": "Add Details" }</span>
                                                { val.helpedBy == "None" ? 
                                                    <span>
                                                        <input className="MemberList ModalNameListSize MemberListModalFont" id={"helpedByModal"+i} list="memberList" placeholder="Volunteer" onKeyUp={this.enterKeyAddHelper}/>
                                                        <datalist id="memberList">
                                                        {membersList.map((val,i)=><option key={i} value={val}/>)}
                                                        </datalist>
                                                        <span className="AddLittleIcon" id="addHelperModal" onClick={(event)=>this.addHelpingName(event,i)}>+</span>
                                                    </span>
                                                    :
                                                    <span>
                                                        <span>Volunteer</span><span>{" - "+ val.helpedBy}</span>
                                                    </span> 
                                                }
                                            </div>
                                        </div>
                                    }   
                                </div>
                            )
                        })
                    }
                    <div  className="InfoTilesWrapper">
                        <div className="TileContent" id="helpAddTile">
                            <input className="MemberList ModalNameListSize MemberListModalFont" list="memberList" placeholder="Name" ref={(input) => { this.memberSelectedHelpModal = input}} onKeyUp={this.enterKeyAddHelp}/>
                            <datalist id="memberList">
                                {membersList.map((val,i)=><option key={i} value={val}/>)}
                            </datalist> : 
                            <input id="helpTextArea" className="MainAddContent ModalContentHelp MemberListModalFont" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInputHelpModal = input}} onKeyUp={this.enterKeyAddHelp} /> 
                            <span id="addHelpModal" className="AddItem AddItemModal" onClick={this.addHelp}>+</span> 
                        </div>
                    </div>
                </div>     
            </div>
        </div>
    </div>
    );
  }
}
