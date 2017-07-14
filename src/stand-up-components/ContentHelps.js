import React, { Component, PropTypes } from 'react';
import axios from 'axios'
import ModalHelps from './ModalHelps'

export default class ContentHelps extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.addHelp = this.addHelp.bind(this)
        this.addHelpingName = this.addHelpingName.bind(this)
        this.closeHelp = this.closeHelp.bind(this)
        this.enterKeyAddHelp = this.enterKeyAddHelp.bind(this)
        this.enterKeyAddHelper = this.enterKeyAddHelper.bind(this)
        this.zoomInHelp = this.zoomInHelp.bind(this)
    }

    componentWillMount(){
    }
    
    addHelp(event){
        if(this.memberSelected.value == ""){
            this.memberSelected.focus()
        }
        else if(this.textInput.value == ""){
            this.textInput.focus()
        }
        else{
            var askingHelp = this.memberSelected.value
            var helpText = this.textInput.value
            var date = new Date().toDateString()
            var helpedBy = "None"
            var helpItems = this.props.standUpData.helps
            var newHelp = {askingHelp,helpText,date,helpedBy}
            helpItems.push(newHelp)
            this.memberSelected.value = ""
            this.textInput.value = ""
            this.props.loadThenUpdate({content : helpItems , contentType : "helps"})
        }
    }

    addHelpingName(event){
        var helpingPerson = event.target.parentElement.parentElement.querySelector("#helpedByList").value 
        if(helpingPerson == ""){
            event.target.parentElement.parentElement.querySelector("#helpedByList").focus()
        }
        else{
            var helpId = event.target.parentElement.parentElement.querySelector("#helpContent").getAttribute('data-id') -1;
            var helpItems = this.props.standUpData.helps
            helpItems[helpId].helpedBy = helpingPerson
            this.props.loadThenUpdate({content : helpItems , contentType : "helps"})
        }
    }

    closeHelp(event){
        var helpItems = this.props.standUpData.helps
        var id = event.target.parentElement.parentElement.getAttribute("data-id")
        helpItems.splice(id-1 ,1)
        this.props.loadThenUpdate({content : helpItems, contentType : "helps"})          
    }

    enterKeyAddHelp(event){
        if(event.keyCode == 13)
            document.getElementById("addHelp").click()
    }

    enterKeyAddHelper(event){
        if(event.keyCode == 13)
            document.getElementById("addHelper").click()
    }

    zoomInHelp(event){
        document.getElementById('zoomHelp').style.display = "block"
    }

  render() {
    var membersList = [ "None","Abdul","Abhishek","Animesh","Anish","Anusha","Ashish","Bharat","Chandra","Dikshita","Dinesh","Divya","Geeta","Harish","Hemu","Himanshu","Jimit","John","Jotsna","Kapil","KK","Sameer","Lavanya","Meenu","Mukesh","Naveen","Nirmal","Pankaj","Praveen","Raja","Rakesh D","Rakesh S","Raman","Rohit","Senthil","Shashank","Srinivas","Shree","Shrey","Thiru","Vinod","Sumit","Swapnil","Vinit","Vivek"]
    var helpItems = this.props.standUpData.helps
    return (
    <div id="standUpContent">
        <div id="itemsHeading" onClick={this.zoomInHelp}>{this.props.heading}</div>
        {   
            helpItems.length > 0 ?
            helpItems.map((val,i)=>{
                return (
                     <div key={i}>
                         {
                             val.helpedBy == "None" ? 
                             <div id="addHelperSection">
                                <div id="closeHelpDiv"><div id="closeHelp" onClick={this.closeHelp}>+</div></div>
                                <div id="helpContent" data-id={i+1}>
                                    <div id={val.askingHelp.length>6?"askingHelpReadOnlyFont" :"askingHelpReadOnly"}>
                                        {val.askingHelp}
                                    </div> : 
                                    <span id="helpItemReadOnly">{ '"'+ val.helpText + '"'}</span> 
                                </div>
                                <div id="addHelperWrap">
                                    <span id="searchDiv">
                                        <span id="searchSpan"><img id="searchLogo" src="images/search-logo.png" alt="img"/></span>
                                        <input id="helpedByList" list="memberList" placeholder="Volunteer" ref={(input) => { this.memberSelected = input}} onKeyUp={this.enterKeyAddHelper}/>
                                        <datalist id="memberList">
                                            {membersList.map((val,i)=><option key={i} value={val}/>)}
                                        </datalist>
                                    </span>
                                    <span id="addHelper" onClick={this.addHelpingName}>+</span>
                                </div>
                             </div>
                             :
                             <div id="closeHelpSection"  data-id={i+1}>
                                <div id="closeHelpDiv"><div id="closeHelp" onClick={this.closeHelp}>+</div></div>
                                <div id="closeHelpContent">
                                    <div id={val.askingHelp.length>6?"askingHelpReadOnlyFont" :"askingHelpReadOnly"}>
                                        {val.askingHelp}
                                    </div> : 
                                    <span id="helpItemReadOnly">{ '"'+ val.helpText + '"'}</span>
                                </div>
                                <div id="helpedByPerson">
                                    <span>Volunteer</span><span>{" - "+ val.helpedBy}</span>
                                </div>
                            </div>
                         }
                    </div> 
                )
            }) :
            ""
        }
        <div id="helpSection">
            <div id="askingHelp">
                <div id="searchDiv">
                    <span id="searchSpan"><img id="searchLogo" src="images/search-logo.png" alt="img"/></span>
                    <input id="listMembers" list="memberList" placeholder="Name" ref={(input) => { this.memberSelected = input}} onKeyUp={this.enterKeyAddHelp}/>
                    <datalist id="memberList">
                        {membersList.map((val,i)=><option key={i} value={val}/>)}
                    </datalist>
                </div>
            </div> : 
            <input id="helpTextArea" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInput = input}} onKeyUp={this.enterKeyAddHelp} /> 
            <span id="addHelp" onClick={this.addHelp}>+</span>                              
        </div> 
    </div>
    );
  }
}
