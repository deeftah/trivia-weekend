import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    accessCode: {
        textAlign: 'center',
        fontSize: 36,
        color: theme.palette.primary.main
    },
});

class TeamMembers extends Component {

    render() {

        const { classes } = this.props

        return (

            <div>
                <h2>Your Team</h2>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(TeamMembers)));