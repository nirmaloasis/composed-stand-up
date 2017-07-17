import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import './info-tile/InfoTile.css'

export default class ModalInterestings extends React.Component {
    constructor(props){
        super(props)
        this.state = {action:"normal",helpId:""}
        this.closeModal = this.closeModal.bind(this)
        this.addInterestingModal = this.addInterestingModal.bind(this)
        this.enterKeyAddHelp = this.enterKeyAddHelp.bind(this)
        this.closeHelp = this.closeHelp.bind(this)
        this.editHelp = this.editHelp.bind(this)
        this.helpDetails = this.helpDetails.bind(this)
        this.returnToHomeTile = this.returnToHomeTile.bind(this)
        this.addEditedInteresting = this.addEditedInteresting.bind(this)
        this.addHelpDetails = this.addHelpDetails.bind(this)
    }

    closeModal(event){
        if(event.target.id == 'zoomInterestings' || event.target.id == 'closeModal' )
            document.getElementById('zoomInterestings').style.display = "none"
    }

    addInterestingModal(event){
        if(this.memberInterestingModal.value == "")
            this.memberInterestingModal.focus()
        else if(this.textInputInterestingModal.value == "")
            this.textInputInterestingModal.focus()
        else{
            var interestings = this.props.standUpData.interestings
            var tellingInteresting = this.memberInterestingModal.value
            var interestingText = this.textInputInterestingModal.value
            var interestingDetail = ""
            var newInterestings = {tellingInteresting,interestingText,interestingDetail}
            interestings.push(newInterestings)
            this.memberInterestingModal.value = ""
            this.textInputInterestingModal.value = ""
            this.state.action = "normal"
            this.props.loadThenUpdate({content : interestings, contentType : "interestings"})
        }
    }

    enterKeyAddHelp(event){
        if(event.keyCode == 13)
            document.getElementById("addInterestingModal").click()
    }

    returnToHomeTile(event){
        this.setState({action : "normal"})
    }

    closeHelp(event,i){
        var interestings = this.props.standUpData.interestings
        var id = i
        interestings.splice(id,1)
        this.state.action = "normal"
        this.props.loadThenUpdate({content : interestings, contentType : "interestings"})          
    }

    editHelp(event,i){
        this.setState({action : "edit",intId : i},()=>{
            document.getElementById("InterestingTextAreaModal"+i).focus()
        })
    }

    helpDetails(event,i){
        this.setState({action : "details",intId : i},()=>{
            document.getElementById("interestingDescriptionModal").focus()
        })
    }

    addEditedInteresting(event,i){
        var element = event.target.parentElement
        if(element.querySelector("#interestingTeller").value == "")
            element.querySelector("#interestingTeller").focus()
        else if(element.querySelector("#InterestingTextAreaModal"+i).value == "")
            element.querySelector("#InterestingTextAreaModal"+i).focus()
        else{
            var interestings = this.props.standUpData.interestings
            var tellingInteresting = element.querySelector("#interestingTeller").value
            var interestingText = element.querySelector("#InterestingTextAreaModal"+i).value
            var interestingDetail = interestings[i].interestingDetail
            var newInterestings = {tellingInteresting,interestingText,interestingDetail}
            interestings[i] = newInterestings
            this.state.action = "normal"
            this.props.loadThenUpdate({content : interestings, contentType : "interestings"}) 
        }
    }

    enterKeyEditInteresting(event){
        if(event.keyCode == 13)
            document.getElementById("editInterestingModal").click()
    }

    addHelpDetails(event,i,val){
        if(document.getElementById("interestingDescriptionModal").value == ""){
            document.getElementById("interestingDescriptionModal").focus()
        }
        else{
            val.interestingDetail = document.getElementById("interestingDescriptionModal").value
            var interestings = this.props.standUpData.interestings
            interestings[i] = val
            this.state.action = "normal"
            this.props.loadThenUpdate({content : interestings, contentType : "interestings"})
        }
    }

  render() {
    var membersList = [ "None","Abdul","Abhishek","Animesh","Anish","Anusha","Ashish","Bharat","Chandra","Dikshita","Dinesh","Divya","Geeta","Harish","Hemu","Himanshu","Jimit","John","Jotsna","Kapil","KK","Sameer","Lavanya","Meenu","Mukesh","Naveen","Nirmal","Pankaj","Praveen","Raja","Rakesh D","Rakesh S","Raman","Rohit","Senthil","Shashank","Srinivas","Shree","Shrey","Thiru","Vinod","Sumit","Swapnil","Vinit","Vivek"]
    var interestings = this.props.standUpData.interestings
    return (
    <div className="StandUpContentModal" id="zoomInterestings" onClick={this.closeModal}>
        <div className="modal-dialog">
            <div id="modalHelpHeading">
                {this.props.heading}
                <div id="closeModal" onClick={this.closeModal}>&times;</div>
            </div>
            <div className="modal-body">
                <div className="">  
                { interestings.map((val,i)=>{
                    return (
                        <div key={i} className="InfoTilesWrapper" data-id={i}>
                            <div className="EditCloseIcon">
                                <span className="CloseTileIcon" onClick={(event)=>this.closeHelp(event,i)}>&times;<span className="ToolTipText ModalToolTipFont">remove</span></span>
                                <span className="IconsSpan" onClick={(event)=>this.editHelp(event,i)}><img className="ModalIcons"  src="images/edit-icon.png" alt="edit"/><span className="ToolTipText ModalToolTipFont">edit</span></span>
                                <span className="IconsSpan" onClick={(event)=>this.helpDetails(event,i)}><img className="ModalIcons" src="images/details.png" alt="details" /><span className="ToolTipText ModalToolTipFont">details</span></span>
                                <span className="IconsSpan" onClick={(event)=>this.returnToHomeTile(event,i)}><img className="ModalIcons" src="images/home-icon.png" alt="return" /><span className="ToolTipText ModalToolTipFont">return</span></span>
                            </div>
                            {   
                                this.state.action == "edit" && this.state.intId == i ?
                                <div className="TileContent" id="interestingEditTile">
                                    <input id="interestingTeller" className="MemberList ModalNameListSize MemberListModalFont" defaultValue={val.tellingInteresting} list="memberList" placeholder="Name" onKeyUp={this.enterKeyEditInteresting}/>
                                    <datalist>
                                        {membersList.map((val,i)=><option key={i} value={val}/>)}
                                    </datalist> : 
                                    <input id={"InterestingTextAreaModal"+i} className="MainAddContent ModalContentHelp MemberListModalFont" defaultValue={val.interestingText} placeholder={"Add new " + this.props.heading}  onKeyUp={this.enterKeyEditInteresting} /> 
                                    <span id="editInterestingModal" className="AddItem AddItemModal" onClick={(event)=>this.addEditedInteresting(event,i)}>+</span> 
                                </div>: 
                                this.state.action == "details" && this.state.intId == i ?
                                    <div className="TileContent" id="interestingEditTile">
                                        <textarea id="interestingDescriptionModal" className="itemDetals itemDetalsModal" placeholder="Add description of the Interesting..." defaultValue={val.interestingDetail}></textarea>
                                        <div><span id="addHelpDetails" className="AddItem AddItemModal" onClick={(event)=>this.addHelpDetails(event,i,val)}>+</span></div>
                                    </div> :  
                                <div className="TileContent ContentInteresting">
                                    <div id="askingHelpReadOnly">{val.tellingInteresting}</div> : 
                                    <span id={"interestingItemReadOnly"+i} className="HelpText">
                                        {'"'+val.interestingText+'"'}
                                    </span>
                                </div>
                            }   
                        </div>
                        )
                    })
                 }
                    <div  className="InfoTilesWrapper">
                        <div className="TileContent" id="helpAddTile">
                            <input className="MemberList ModalNameListSize MemberListModalFont" list="memberList" placeholder="Name" ref={(input) => { this.memberInterestingModal = input}} onKeyUp={this.enterKeyAddHelp}/>
                            <datalist>
                                {membersList.map((val,i)=><option key={i} value={val}/>)}
                            </datalist> : 
                            <input id="helpTextArea" className="MainAddContent ModalContentHelp MemberListModalFont" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInputInterestingModal = input}} onKeyUp={this.enterKeyAddHelp} /> 
                            <span id="addInterestingModal" className="AddItem AddItemModal" onClick={this.addInterestingModal}>+</span> 
                        </div>
                    </div>
                </div>     
            </div>
        </div>
    </div>
    );
  }
}
