import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class RegisterButton extends Component {

    handleRegister = () => {
        this.props.history.push(`/register`);
    }

    render() {

        return (
            <div>
                <Button onClick={this.handleRegister}>Register</Button>
            </div>
        )

    }

}

export default withRouter(RegisterButton);