import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProfileDetails extends Component {

    render() {

        return (

            <div>
                <b>Profile Details</b>
                <br /><br/>
                {this.props.user.first_name} {this.props.user.last_name}
                <br/>
                Email: {this.props.user.username}
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(ProfileDetails));