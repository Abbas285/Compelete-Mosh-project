import React, { Component } from 'react';

class curentuser extends Component {
    render() {
        const curentuser=this.props.user
      let name=curentuser.name
        return (
            <div>
                <h3>
                    User Profile
                </h3>
                <h4>Name = {name}</h4>
            </div>
        );
    }
}

export default curentuser;