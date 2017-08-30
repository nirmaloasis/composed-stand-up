import React, { Component, PropTypes } from 'react';
import './Admin.css'
import axios from 'axios'

export default class ContentEvents extends React.Component {
    constructor(props){
        super(props)
        this.state = {action : "normal",standUpData : this.props.standUpData}
        this.closeModal = this.closeModal.bind(this)
        this.adminLogin = this.adminLogin.bind(this)
        this.enableEnterKey = this.enableEnterKey.bind(this)
        this.addNewMember = this.addNewMember.bind(this)
        this.removeAMember = this.removeAMember.bind(this)
        this.modifyTheData = this.modifyTheData.bind(this)
    }

    componentDidMount(){
        this.adminUser ? this.adminUser.focus() : ""
    } 

    closeModal(event){
        if(event.target.id == "adminModal")
            this.props.resetToNormalUser()
    }

    adminLogin(){
        axios.post('/admin', {
            passkey : this.adminUser.value
        })
        .then((response) => response.data.status ? this.setState({action:"success"}) : this.setState({action:"fail"}) )
        .catch(function (error) {
            console.log(error);
        });
    }

    enableEnterKey(event){
        if(event.keyCode == 13)
            this.adminLogin()
    }

    addNewMember(){
        var standUpData = this.state.standUpData
        standUpData.notDoneList.push(this.newMember.value)
        standUpData.notDoneList.sort()
        standUpData.membersList.push(this.newMember.value)
        standUpData.membersList.sort()
        this.modifyTheData(standUpData,()=>{
            debugger
            document.getElementById('addSuccessMsg').innerText = ' "' + this.newMember.value + '" ' + "has been added to the list !!" 
            document.getElementById('addSuccessMsg').style.color = "green"
            this.newMember.value = ""
            setTimeout(()=>{
                document.getElementById('addSuccessMsg').innerText = ""
            },2000)
        })
    }

    removeAMember(event,listFlag,i,val){
        var standUpData = this.state.standUpData
        standUpData[listFlag].splice(i,1)
        var j
        for(j=0;j<standUpData.membersList.length;j++){
            if(standUpData.membersList[j].match(val))
                break;
        }
        standUpData.membersList.splice(j,1)
        this.modifyTheData(standUpData,()=>{
            debugger
            document.getElementById('addSuccessMsg').innerText = ' "' + val + '" ' + "has been removed from the list !!" 
            document.getElementById('addSuccessMsg').style.color = "red"
            setTimeout(()=>{
                document.getElementById('addSuccessMsg').innerText = ""
            },2000)
        })
    }

    modifyTheData(standUpData,cb){
        axios.post('/reset-sUpdata', {standUpData})
        .then(()=>{
            this.setState({action : "success"},()=> cb())
        })
        .catch(function (error) {
            console.log(error);
        });   
    }
    
    render(){
        this.state.action == "fail" ? this.adminUser.value = "" : ""
        var notDoneList = this.state.standUpData.notDoneList
        var doneList = this.state.standUpData.doneList
        switch(this.state.action){
            case "normal" :
                return(
                    <div className="ModalWrap AdminModal" id="adminModal" onClick={this.closeModal}>    
                        <div className="AdminModalBody">
                            <input className="AdminInput" type="password" placeholder="Enter the passkey" ref={key => this.adminUser=key} onKeyUp={this.enableEnterKey}/>
                            <div className="AdminLoginBtn" onClick={this.adminLogin}>Login</div>
                        </div>
                    </div>
                )

            case "success" :
                return(
                    <div className="ModalWrap AdminModal" id="adminModal" onClick={this.closeModal}>    
                        <div className="AdminModalBody AdminLoginSuccess">
                            <div>
                                <h2 className="AdminSuccessHeading">Manage List of CompoZed-Members</h2>
                                <input className="AdminInput" type="text" placeholder="Name of the new member" ref={key => this.newMember=key}/>
                                <span className="AdminLoginBtn" onClick={this.addNewMember}>Add</span>
                                <span id="addSuccessMsg"></span>
                            </div>
                            <div><span className="AsplColor FontLarge"> Current Facilitator : </span>{this.props.standUpData.currentFacilitator}</div>
                            <div className="NameList">
                                <div className="AsplColor FontLarge"> {"People who have Not done the stand-up ( "+ notDoneList.length + " ) : " }</div>
                                {notDoneList.map((val,i)=><span key={i} className="NameContainerNotDone">{val}<span className="DeleteName" onClick={(event)=>this.removeAMember(event,"notDoneList",i,val)}>&times;</span></span>)}
                            </div>
                             <div className="NameList">
                                <div className="AsplColor FontLarge"> {"People who have done the stand-up ( "+ doneList.length + " ) : " }</div>
                                {doneList.map((val,i)=><span key={i} className="NameContainerDone">{val} <span className="DeleteName" onClick={(event)=>this.removeAMember(event,"doneList",i,val)}>&times;</span></span>)}
                            </div>
                        </div>
                    </div>
                )

            case "fail" :
                return(
                    <div className="ModalWrap AdminModal" id="adminModal" onClick={this.closeModal}>    
                        <div className="AdminModalBody AdminLoginFail">
                            <input className="AdminInput" type="password" placeholder="Enter the passkey" ref={key => this.adminUser=key} onKeyUp={this.enableEnterKey}/>
                            <div className="AdminLoginBtn" onClick={this.adminLogin}>Login</div>
                            <div className="ErrMsg">Login Failed !!!</div>
                        </div>
                    </div>
                )
        }
    }
}
