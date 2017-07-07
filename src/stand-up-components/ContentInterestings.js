
import React, { Component, PropTypes } from 'react';
import axios from 'axios'

export default class ContentInterestings extends React.Component {
    constructor(props){
        super(props)
        this.state = {interestings:this.props.standUpData.interestings}
        this.addInteresting = this.addInteresting.bind(this)
        this.closeInteresting = this.closeInteresting.bind(this)
    }

    componentWillMount(){
        console.log("Content Componenet=>>>>>",this.props)
    }
    
    addInteresting(event){
        debugger
        var tellingInteresting = this.memberSelected.value
        var interestingText = this.textInput.value
        var newInteresting = {tellingInteresting,interestingText}
        var interestings = this.props.standUpData.interestings
        interestings.push(newInteresting)
        this.setState({interestings},()=>{
            this.memberSelected.value = ""
            this.textInput.value = ""
        })
    }

    closeInteresting(event){
        event.target.parentElement.parentElement.style.display = "none";

    }

  render() {
    var membersList = [ "None","Abdul","Abhishek","Animesh","Anish","Anusha","Ashish","Bharat","Chandra","Dikshita","Dinesh","Divya","Geeta","Harish","Hemu","Himanshu","Jimit","John","Jotsna","Kapil","KK","Sameer","Lavanya","Meenu","Mukesh","Naveen","Nirmal","Pankaj","Praveen","Raja","Rakesh D","Rakesh S","Raman","Rohit","Senthil","Shashank","Srinivas","Shree","Shrey","Thiru","Vinod","Sumit","Swapnil","Vinit","Vivek"]
    var interestings = this.state.interestings
    return (
    <div id="standUpContent">
        <div id="itemsHeading">{this.props.heading}</div>
        {
            interestings.map((val,i)=>{
                return(
                <div id="closeHelpSection" key={i} data-id={i+1}>
                    <div id="closeHelpDiv"><div id="closeHelp" onClick={this.closeInteresting}>+</div></div>
                    <div id="closeInterestingContent">
                        <div id={val.tellingInteresting.length>6?"askingHelpReadOnlyFont" :"askingHelpReadOnly"}>
                            {val.tellingInteresting}
                        </div> : 
                        <span id="helpItemReadOnly">{ '"'+ val.interestingText + '"'}</span>
                    </div>
                </div>
                )
            })
        }
        <div id="helpSection">
            <div id="askingHelp">
                <div id="searchDiv">
                    <span id="searchSpan"><img id="searchLogo" src="images/search-logo.png" alt="img"/></span>
                    <input id="listMembers" list="memberList" placeholder="Name" ref={(input) => { this.memberSelected = input}}/>
                    <datalist id="memberList">
                        {membersList.map((val,i)=><option key={i} value={val}/>)}
                    </datalist>
                </div>
            </div> : 
            <input id="helpTextArea" placeholder={"Add new " + this.props.heading} ref={(input) => { this.textInput = input}} /> 
            <span id="addHelp" onClick={this.addInteresting}>+</span>                              
        </div> 
    </div>
    );
  }
}