import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {AccountCircle} from '@material-ui/icons';
import AccountButton from './AccountButton';

class RegisterButton extends Component {

state = {
    name: 'anyname'
}

    handleRegister = () => {
        this.props.history.push(`/register`);
    }

    render() {

        return (
            <div>
                {!this.props.user.first_name && <Button onClick={this.handleRegister}>Register</Button>}
                {this.props.user.first_name && <AccountButton name={this.state.name}/>}
                
                {/* <Button aria-controls="simple-menu" aria-haspopup="true"><AccountCircle style={{ marginRight: 5 }}/>{this.props.user.first_name}</Button> */}
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(RegisterButton));