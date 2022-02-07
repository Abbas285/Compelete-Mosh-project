import React, { Component } from 'react'

export default class Like extends Component {


    
    render() {
        let classes="fa fa-heart";
        if(!this.props.liked) classes += "-o"
        return <i className={classes} aria-hidden="true"onClick={this.props.onclicked}  style={{cursor:"pointer"}}></i>

    }
}
