import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class LoginButton extends Component {

    handleLogin = () => {
        this.props.history.push(`/login`);
    }

    render() {

        return (
            <div>
                <Button onClick={this.handleLogin}>Login</Button>
            </div>
        )

    }

}

export default withRouter(LoginButton);