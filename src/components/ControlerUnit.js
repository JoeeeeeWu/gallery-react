import React, { Component } from 'react';

class ControlerUnit extends Component {
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(e){
        if(this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }
        e.preventDefault();
        e.stopPropagation();
    }
    
    render(){
        var controlerUnitClassName="controler-unit";
        
        if(this.props.arrange.isCenter){
            controlerUnitClassName+=" is-center";
        }
        
        if(this.props.arrange.isInverse){
            controlerUnitClassName+=" is-inverse";
        }
        
        return (
            <span className={controlerUnitClassName} onClick={this.handleClick}></span>
        );
    }
}

export default ControlerUnit;

