import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class LoginButton extends Component {

    handleLogin = () => {
        this.props.history.push(`/home`);
    }

    render() {

        return (
            
            <div>
                {!this.props.user.first_name && <Button onClick={this.handleLogin}>Login</Button>}
                {!this.props.user.first_name && <span>/</span>}
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});
export default withRouter(connect(mapStateToProps)(LoginButton));