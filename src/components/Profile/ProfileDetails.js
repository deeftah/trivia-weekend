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

class ProfileDetails extends Component {

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
                <h2>Team & Email</h2>
                <span className={classes.accessCode}>{this.props.team.name}</span>
                <h4>Username/Email: {this.props.user.username}</h4>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ProfileDetails)));