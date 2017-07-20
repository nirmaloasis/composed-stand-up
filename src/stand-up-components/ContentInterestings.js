
import React, { Component, PropTypes } from 'react';
import axios from 'axios'

export default class ContentInterestings extends React.Component {
    constructor(props){
        super(props)
        this.state = {action : "normal",intId:""}
        this.closeHelp = this.closeHelp.bind(this)
        this.editHelp = this.editHelp.bind(this)
        this.helpDetails = this.helpDetails.bind(this)
        this.returnToHomeTile = this.returnToHomeTile.bind(this)
        this.addEditedInteresting = this.addEditedInteresting.bind(this)
        this.addHelpDetails = this.addHelpDetails.bind(this)
        this.enterKeyEditInteresting =this.enterKeyEditInteresting.bind(this)
        this.addInteresting = this.addInteresting.bind(this)
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
            document.getElementById("InterestingTextArea"+i).focus()
        })
    }

    helpDetails(event,i){
        this.setState({action : "details",intId : i},()=>{
            document.getElementById("interestingDescription").focus()
        })
    }

    addEditedInteresting(event,i){
        var element = event.target.parentElement
        if(element.querySelector("#interestingTeller").value == "")
            element.querySelector("#interestingTeller").focus()
        else if(element.querySelector("#InterestingTextArea"+i).value == "")
            element.querySelector("#InterestingTextArea"+i).focus()
        else{
            var interestings = this.props.standUpData.interestings
            var tellingInteresting = element.querySelector("#interestingTeller").value
            var interestingText = element.querySelector("#InterestingTextArea"+i).value
            var interestingDetail = interestings[i].interestingDetail
            var newInterestings = {tellingInteresting,interestingText,interestingDetail}
            interestings[i] = newInterestings
            this.state.action = "normal"
            this.props.loadThenUpdate({content : interestings, contentType : "interestings"}) 
        }
    }

    addHelpDetails(event,i,val){
        if(document.getElementById("interestingDescription").value == ""){
            document.getElementById("interestingDescription").focus()
        }
        else{
            val.interestingDetail = document.getElementById("interestingDescription").value
            var interestings = this.props.standUpData.interestings
            interestings[i] = val
            this.state.action = "normal"
            this.props.loadThenUpdate({content : interestings, contentType : "interestings"})
        }
    }

    enterKeyEditInteresting(event){
        if(event.keyCode == 13)
            document.getElementById("editInteresting").click()
    }

    zoomInInterestings(event){
        document.getElementById('zoomInterestings').style.display = "block"
    }

    addInteresting(event){
        debugger
        if(this.memberSelectedInteresting.value == "")
            this.memberSelectedInteresting.focus()
        else if(this.textInputInteresing.value == "")
            this.textInputInteresing.focus()
        else{
            var interestings = this.props.standUpData.interestings
            var tellingInteresting = this.memberSelectedInteresting.value
            var interestingText = this.textInputInteresing.value
            var interestingDetail = ""
            var newInterestings = {tellingInteresting,interestingText,interestingDetail}
            interestings.push(newInterestings)
            this.memberSelectedInteresting.value = ""
            this.textInputInteresing.value = ""
            this.state.action = "normal"
            this.props.loadThenUpdate({content : interestings, contentType : "interestings"}) 
        }
    }

    enterKeyAddInteresting(event){
        if(event.keyCode == 13)
            document.getElementById("addInteresting").click()
    }

  render() {
    var membersList = [ "None","Abdul","Abhishek","Animesh","Anish","Anusha","Ashish","Bharat","Chandra","Dikshita","Dinesh","Divya","Geeta","Harish","Hemu","Himanshu","Jimit","John","Jotsna","KK","Sameer","Lavanya","Meenu","Naveen","Nirmal","Pankaj","Praveen","Raja","Rakesh D","Rakesh S","Raman","Rohit","Senthil","Shashank","Srinivas","Shree","Shrey","Thiru","Vinod","Sumit","Swapnil","Vinit","Vivek"]
    var interestings = this.props.standUpData.interestings
    return (
    <div id="standUpContent">
        <div id="itemsHeading" onClick={this.zoomInInterestings}>{this.props.heading}</div>
        <div className="ForOverFlow"> 
        {
            interestings.map((val,i)=>{
                return(
                    <div key={i} className="InfoTilesWrapper" data-id={i}>
                        <div className="EditCloseIcon">
                            <span className="CloseTileIcon" onClick={(event)=>this.closeHelp(event,i)}>&times;<span className="ToolTipText">remove</span></span>
                            <span className="IconsSpan" onClick={(event)=>this.editHelp(event,i)}><img className="Icons"  src="images/edit-icon.png" alt="edit" /><span className="ToolTipText">edit</span></span>
                            <span className="IconsSpan" onClick={(event)=>this.helpDetails(event,i)}>{val.interestingDetail ? <img className="NotificationIcon" src="images/comment-icon.png" alt="details" />: ""}<img className="Icons" src="images/details.png" alt="details" /><span className="ToolTipText">details</span></span>
                            <span className="IconsSpan" onClick={(event)=>this.returnToHomeTile(event,i)}><img className="Icons" src="images/home-icon.png" alt="return"/><span className="ToolTipText">return</span></span>
                        </div>
                            {   
                                this.state.action == "edit" && this.state.intId == i ?
                                <div className="TileContent" id="interestingEditTile">
                                    <input id="interestingTeller" className="MemberList" defaultValue={val.tellingInteresting} list="memberList" placeholder="Name" onKeyUp={this.enterKeyEditInteresting}/>
                                    <datalist id="memberList">
                                        {membersList.map((val,i)=><option key={i} value={val}/>)}
                                    </datalist> : 
                                    <input id={"InterestingTextArea"+i} className="MainAddContent" defaultValue={val.interestingText} placeholder={"Add new " + this.props.heading}  onKeyUp={this.enterKeyEditInteresting} /> 
                                    <span id="editInteresting" className="AddItem" onClick={(event)=>this.addEditedInteresting(event,i)}>+</span> 
                                </div>: 
                                this.state.action == "details" && this.state.intId == i ?
                                    <div className="TileContent" id="interestingEditTile">
                                        <textarea id="interestingDescription" className="itemDetals" placeholder="Add description of the Interesting..." defaultValue={val.interestingDetail}></textarea>
                                        <div><span id="addHelpDetails" className="AddItem" onClick={(event)=>this.addHelpDetails(event,i,val)}>+</span></div>
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
                <div className="TileContent" id="interestingAddTile">
                    <input className="MemberList" list="memberList" placeholder="Name" ref={(input) => { this.memberSelectedInteresting = input}} onKeyUp={this.enterKeyAddInteresting}/>
                    <datalist id="memberList">
                        {membersList.map((val,i)=><option key={i} value={val}/>)}
                    </datalist> : 
                    <input id="InterestingTextArea" className="MainAddContent" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInputInteresing = input}} onKeyUp={this.enterKeyAddInteresting} /> 
                    <span id="addInteresting" className="AddItem" onClick={this.addInteresting}>+</span> 
                </div>
            </div>
        </div>
    </div>
    );
  }
}
