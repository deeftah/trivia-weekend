import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AccessCode from './AccessCode';
import ProfileDetails from './ProfileDetails';
import NewContest from './NewContest';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {

        textAlign: 'center',
        background: '#494A49',
        color: 'white'

    },
});

class Profile extends Component {

    state = {

    }

    render() {

        const { classes } = this.props

        return (
            <div className={classes.root} style={{ marginTop: 80, padding: 30 }}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}><AccessCode /></Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}><ProfileDetails /></Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><NewContest /></Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>Set the Current Contest</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>Change the Team Name</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>Table with Team Members</Paper>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team
});

// export default withRouter(connect(mapStateToProps)(withStyles(styles)(Profile)));
export default withStyles(styles)(Profile);