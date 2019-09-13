import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Paper, Typography } from '@material-ui/core';
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

class AccessCode extends Component {

    componentDidMount() {
        this.getTeamDetails();
    }

    getTeamDetails() {
        this.props.dispatch({
            type: 'FETCH_TEAM_DETAILS'
        })
    }

    render() {

        const { classes } = this.props

        return (

            <div>
                <h2>Team Access Code</h2>
                <span className={classes.accessCode}>{this.props.team.access_id}</span>
                <h4>Your team members will need this to successfully join your team!</h4>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team
});

// export default withRouter(connect(mapStateToProps)(AccessCode));

export default withRouter(connect(mapStateToProps)(withStyles(styles)(AccessCode)));