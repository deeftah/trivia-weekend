import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    currentContest: {
        textAlign: 'center',
        fontSize: 18,
        color: theme.palette.primary.main
    },
});

class CurrentContest extends Component {

    componentDidMount() {
        this.getContestDetails();
    }

    getContestDetails() {
        this.props.dispatch({
            type: 'FETCH_CONTEST_DETAILS',
            payload: this.props.user
        })
    }

    render() {

        const { classes } = this.props

        return (

            <div>
                <h3>Change the Current Contest</h3>
                <span className={classes.currentContest}>{this.props.contest.contest_name}</span>
                <br/><br/>
                <i>This will change the current contest for the team.</i>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
    contest: state.contest
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(CurrentContest)));