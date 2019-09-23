import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Card, CardActions, CardContent, Grid, Typography, } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import AccessCodeInfo from './AccessCodeInfo';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    accessId: {
        textAlign: 'center',
        fontSize: 36,
        color: theme.palette.primary.main
    },
});

class AccessCode extends Component {

    state = {
        accessId: 0
    }

    componentDidMount() {
        this.getTeamDetails();
    }

    getTeamDetails() {
        this.props.dispatch({
            type: 'FETCH_TEAM_DETAILS'
        })
    }

    handleResetCode = () => {

        this.generateAccessId()

        this.props.dispatch({
            type: 'UPDATE_ACCESS_ID',
            payload: {
                accessId: this.state.accessId
            }
        })

    }


    generateAccessId() {
        this.state.accessId = Math.floor(Math.random() * 90000000) + 10000000;
    }

    render() {

        const { classes } = this.props

        return (

            <div>
                <CardContent>
                    <AccessCodeInfo />
                     {(this.props.user.clearance_id > 1) 
                     ? <span className={classes.accessId}>{this.props.team.access_id}</span>
                    :<span>Please consult with your team captain for the team access code, which will allow others to join this team.</span>}
                </CardContent>
                <CardActions>
                    {(this.props.user.clearance_id > 1) &&
                        <Button onClick={() => this.handleResetCode()} style={{ marginLeft: "auto", marginRight: 0, color: this.props.user.color }}>
                        <Refresh style={{ marginRight: 3 }} />Reset Code
                         </Button>}
                </CardActions>
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