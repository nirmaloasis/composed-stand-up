import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import ModalHelps from './ModalHelps'

export default class ContentHelps extends React.Component {
    constructor(props){
        super(props)
        this.state = {action:"normal",helpId:""}
        this.addHelp = this.addHelp.bind(this)
        this.addHelpingName = this.addHelpingName.bind(this)
        this.closeHelp = this.closeHelp.bind(this)
        this.enterKeyAddHelp = this.enterKeyAddHelp.bind(this)
        this.enterKeyAddHelper = this.enterKeyAddHelper.bind(this)
        this.editHelp = this.editHelp.bind(this)
        this.addEditedHelp = this.addEditedHelp.bind(this)
        this.enterKeyEditedHelp = this.enterKeyEditedHelp.bind(this)
        this.helpDetails = this.helpDetails.bind(this)
        this.addHelpDetails = this.addHelpDetails.bind(this)
        this.zoomInHelp = this.zoomInHelp.bind(this)
    }

    componentWillMount(){
    }
    
    addHelp(event){
        if(this.memberSelectedHelp.value == ""){
            this.memberSelectedHelp.focus()
        }
        else if(this.textInputHelp.value == ""){
            this.textInputHelp.focus()
        }
        else{
            var askingHelp = this.memberSelectedHelp.value
            var helpText = this.textInputHelp.value
            var date = new Date().toDateString()
            var helpedBy = "None"
            var helpItems = this.props.standUpData.helps
            var newHelp = {askingHelp,helpText,date,helpedBy,helpDetails:""}
            helpItems.push(newHelp)
            this.memberSelectedHelp.value = ""
            this.textInputHelp.value = ""
            this.state.action = "normal"
            this.props.loadThenUpdate({content : helpItems , contentType : "helps"})
        }
    }

    addHelpingName(event,i){
        var helpingPerson = document.getElementById("memberListHelp"+i)
        if( helpingPerson.value == ""){
            helpingPerson.focus()
        }
        else{
            var helpId = i
            var helpItems = this.props.standUpData.helps
            helpItems[helpId].helpedBy = helpingPerson.value
            this.state.action = "normal"
            this.props.loadThenUpdate({content : helpItems , contentType : "helps"})
        }
    }

    closeHelp(event,i){
        var helpItems = this.props.standUpData.helps
        var id = i
        helpItems.splice(id,1)
        this.state.action = "normal"
        this.props.loadThenUpdate({content : helpItems, contentType : "helps"})          
    }

    enterKeyAddHelp(event){
        if(event.keyCode == 13)
            document.getElementById("addHelp").click()
    }

    enterKeyAddHelper(event){
        if(event.keyCode == 13)
            event.target.parentElement.querySelector("#addHelper").click()
    }

    editHelp(event,i){
        this.setState({action : "edit",helpId : i},()=>{
            document.getElementById("helpTextArea"+i).focus()
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
            var helpItems = this.props.standUpData.helps
            var helpDetails = helpItems[i].helpDetails
            var newHelp = {askingHelp,helpText,date,helpedBy,helpDetails}
            helpItems[i] = newHelp
            this.state.action = "normal"
            this.props.loadThenUpdate({content : helpItems , contentType : "helps"})
        }
    }

    enterKeyEditedHelp(event){
        if(event.keyCode == 13)
            event.target.parentElement.parentElement.querySelector("#addEditedHelp").click()
    }

    helpDetails(event,i){
        this.setState({action : "details",helpId : i},()=>{
            document.getElementById("helpDescription").focus()
        })
    }

    addHelpDetails(event,i,val){
        if(document.getElementById("helpDescription").value == ""){
            document.getElementById("helpDescription").focus()
        }
        else{
            val.helpDetails = document.getElementById("helpDescription").value
            var helpItems = this.props.standUpData.helps
            helpItems[i] = val
            this.state.action = "normal"
            this.props.loadThenUpdate({content : helpItems , contentType : "helps"})
        }
    }

    returnToHomeTile(event){
        this.setState({action : "normal"})
    }

    zoomInHelp(event){
        document.getElementById('zoomHelp').style.display = "block"
    }

  render() {
    var membersList = [ "None","Abdul","Abhishek","Animesh","Anish","Anusha","Ashish","Bharat","Chandra","Dikshita","Dinesh","Divya","Geeta","Harish","Hemu","Himanshu","Jimit","John","Jotsna","KK","Sameer","Lavanya","Meenu","Naveen","Nirmal","Pankaj","Praveen","Raja","Rakesh D","Rakesh S","Raman","Rohit","Senthil","Shashank","Srinivas","Shree","Shrey","Thiru","Vinod","Sumit","Swapnil","Vinit","Vivek"]
    var helpItems = this.props.standUpData.helps
    return (
        <div id="standUpContent">
            <div id="itemsHeading" onClick={this.zoomInHelp}>{this.props.heading}</div>
            <div className="ForOverFlow">  
                { helpItems.map((val,i)=>{
                    return (
                        <div key={i} className="InfoTilesWrapper" data-id={i}>
                            <div className="EditCloseIcon">
                                <span className="CloseTileIcon" onClick={(event)=>this.closeHelp(event,i)}>&times;<span className="ToolTipText">remove</span></span>
                                <span className="IconsSpan" onClick={(event)=>this.editHelp(event,i)}><img className="Icons"  src="images/edit-icon.png" alt="edit" /><span className="ToolTipText">edit</span></span>
                                <span className="IconsSpan" onClick={(event)=>this.helpDetails(event,i)}><img className="Icons" src="images/details.png" alt="details" /><span className="ToolTipText">details</span></span>
                                <span className="IconsSpan" onClick={(event)=>this.returnToHomeTile(event,i)}><img className="Icons" src="images/home-icon.png" alt="return"/><span className="ToolTipText">return</span></span>
                            </div>
                            {   
                                this.state.action == "edit" && this.state.helpId == i ?
                                    <div>
                                        <div className="TileContent" id="helpEditTile">
                                            <input className="MemberList" id="askingHelp" list="memberList" placeholder="Name" defaultValue={val.askingHelp} onKeyUp={this.enterKeyEditedHelp}/>
                                            <datalist id="memberList">
                                                {membersList.map((val,i)=><option key={i} value={val}/>)}
                                            </datalist> : 
                                            <input id={"helpTextArea"+i} className="MainAddContent" defaultValue={val.helpText} onKeyUp={this.enterKeyEditedHelp}/> 
                                            <span id="addEditedHelp" className="AddItem" onClick={(event)=>this.addEditedHelp(event,i)} >+</span> 
                                        </div>
                                        <div id="helpedByPerson">
                                            <input className="MemberList" id="helpedBy" list="memberList" placeholder="Volunteer" defaultValue={val.helpedBy == "None"?"":val.helpedBy} onKeyUp={this.enterKeyEditedHelp}/>
                                            <datalist id="memberList">
                                            {membersList.map((val,i)=><option key={i} value={val}/>)}
                                            </datalist>
                                        </div>
                                    </div> : 
                                this.state.action == "details" && this.state.helpId == i ?
                                    <div className="TileContent" id="helpEditTile">
                                        <textarea id="helpDescription" className="itemDetals" placeholder="Add description of the help..." defaultValue={val.helpDetails}></textarea>
                                        <div><span id="addHelpDetails" className="AddItem" onClick={(event)=>this.addHelpDetails(event,i,val)}>+</span></div>
                                    </div> :  
                                <div>
                                    <div className="TileContent">
                                        <div id="askingHelpReadOnly">{val.askingHelp}</div> : 
                                        <span id={"helpItemReadOnly"+i} className="HelpText">
                                            {'"'+val.helpText+'"'}
                                        </span>
                                    </div>
                                    <div id="helpedByPerson">
                                        { val.helpedBy == "None" ? 
                                            <span>
                                                <input className="MemberList" id={"memberListHelp"+i} list="memberList" placeholder="Volunteer" onKeyUp={this.enterKeyAddHelper}/>
                                                <datalist id="memberList">
                                                {membersList.map((val,i)=><option key={i} value={val}/>)}
                                                </datalist>
                                                <span className="AddLittleIcon" id="addHelper" onClick={(event)=>this.addHelpingName(event,i)}>+</span>
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
                    <input className="MemberList" list="memberList" placeholder="Name" ref={(input) => { this.memberSelectedHelp = input}} onKeyUp={this.enterKeyAddHelp}/>
                    <datalist>
                        {membersList.map((val,i)=><option key={i} value={val}/>)}
                    </datalist> : 
                    <input id="helpTextArea" className="MainAddContent" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInputHelp = input}} onKeyUp={this.enterKeyAddHelp} /> 
                    <span id="addHelp" className="AddItem" onClick={this.addHelp}>+</span> 
                </div>
            </div>
        </div>     
    </div>
    );
  }
}
