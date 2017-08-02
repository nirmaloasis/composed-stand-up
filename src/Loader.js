import React,{Component} from 'react';

export default class Home extends Component {
    render(){
        return (
            <div>
                <div className="loader"></div>
                <div id="loaderText">Loading Data for you .....</div>
            </div>     
        );
    }
}
