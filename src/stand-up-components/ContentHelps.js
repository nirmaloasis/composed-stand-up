import React, { Component, PropTypes } from 'react';
import axios from 'axios'

export default class ContentHelps extends React.Component {
    constructor(props){
        super(props)
        this.state = {helpItems:this.props.standUpData.helps}
        this.addHelp = this.addHelp.bind(this)
        this.addHelpingName = this.addHelpingName.bind(this)
        this.closeHelp = this.closeHelp.bind(this)
    }

    componentWillMount(){
        console.log("Content Componenet=>>>>>",this.props)
    }
    addHelp(event){
        var askingHelp = this.memberSelected.value
        var helpText = this.textInput.value
        var date = new Date().toDateString()
        var helpedBy = "None"
        var newHelp = {askingHelp,helpText,date,helpedBy}
        var helpItems = this.props.standUpData.helps
        helpItems.push(newHelp)
        this.setState({helpItems},()=>{
            this.memberSelected.value = ""
            this.textInput.value = ""
        })
    }

    addHelpingName(event){
        var helpingPerson = event.target.parentElement.querySelector('#helpedByList').value
        var helpId = event.target.parentElement.getAttribute('data-id') - 1
        var helpItems = this.props.standUpData.helps
        helpItems[helpId].helpedBy = helpingPerson
        this.setState({},()=>{})
    }

    closeHelp(event){
        event.target.parentElement.parentElement.style.display = "none";

    }

  render() {
    var membersList = [ "None","Abdul","Abhishek","Animesh","Anish","Anusha","Ashish","Bharat","Chandra","Dikshita","Dinesh","Divya","Geeta","Harish","Hemu","Himanshu","Jimit","John","Jotsna","Kapil","KK","Sameer","Lavanya","Meenu","Mukesh","Naveen","Nirmal","Pankaj","Praveen","Raja","Rakesh D","Rakesh S","Raman","Rohit","Senthil","Shashank","Srinivas","Shree","Shrey","Thiru","Vinod","Sumit","Swapnil","Vinit","Vivek"]
    var helpItems = this.state.helpItems
    return (
    <div id="standUpContent">
        <div id="itemsHeading">{this.props.heading}</div>
        {   
            helpItems.length > 0 ?
            helpItems.map((val,i)=>{
                return (
                     <div key={i}>
                         {
                             val.helpedBy == "None" ? 
                             <div id="helpSection" data-id={i+1}>
                                <div id={val.askingHelp.length>6?"askingHelpReadOnlyFont" :"askingHelpReadOnly"}>
                                    {val.askingHelp}
                                </div> : 
                                <span id="helpItemReadOnly">{ '"'+ val.helpText + '"'}</span>
                                <input id="helpedByList" list="memberList" placeholder="Helped By" ref={(input) => { this.memberSelected = input}}/>
                                <datalist id="memberList">
                                    {membersList.map((val,i)=><option key={i} value={val}/>)}
                                </datalist>
                                <span id="addHelper" onClick={this.addHelpingName}>+</span> 
                             </div>
                             :
                             <div id="closeHelpSection"  data-id={i+1}>
                                <div id="closeHelpDiv"><div id="closeHelp" onClick={this.closeHelp}>+</div></div>
                                <div id="closeHelpContent">
                                    <div id={val.askingHelp.length>6?"askingHelpReadOnlyFont" :"askingHelpReadOnly"}>
                                        {val.askingHelp}
                                    </div> : 
                                    <span id="helpItemReadOnly">{ '"'+ val.helpText + '"'}</span>
                                    <span id={val.helpedBy.length >6 ?"helpedByPersonBigName":"helpedByPerson"}>
                                        {" - "+ val.helpedBy}
                                    </span>
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
                <input id="listMembers" list="memberList" placeholder="Search" ref={(input) => { this.memberSelected = input}}/>
                <datalist id="memberList">
                    {membersList.map((val,i)=><option key={i} value={val}/>)}
                </datalist>
            </div> : 
            <input id="helpTextArea" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInput = input}} /> 
            <span id="addHelp" onClick={this.addHelp}>+</span>                              
        </div> 
    </div>
    );
  }
}
