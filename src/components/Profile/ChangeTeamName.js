import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    teamName: {
        textAlign: 'center',
        fontSize: 18,
        color: theme.palette.primary.main
    },
});

class ChangeTeamName extends Component {

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
                <h3>Change your Team's Name</h3>
                <span className={classes.teamName}>{this.props.team.name}</span>
                <br /><br />
                <Button color="secondary">Change Name</Button>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ChangeTeamName)));