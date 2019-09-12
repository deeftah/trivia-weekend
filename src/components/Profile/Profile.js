import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Profile extends Component {

    state = {
    }

    render() {

        return (
            <div style={{ marginTop: 80, padding: 30 }}>
                This is the Profile page! 
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team
});

export default withRouter(connect(mapStateToProps)(Profile));