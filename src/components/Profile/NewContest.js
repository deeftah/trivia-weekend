import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Card, CardActions, CardContent, Grid, Typography, } from '@material-ui/core';
import { Cancel, Edit, Save } from '@material-ui/icons';
import NewContestForm from './NewContestForm';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    newContest: {
        textAlign: 'center',
        fontSize: 36,
        color: theme.palette.primary.main
    },
});

class NewContest extends Component {

    // handleNewContest = () => {
    //     this.setState({
    //         contestFormDisplay: !this.state.contestFormDisplay
    //     })
    //     console.log('contest form display', this.state.contestFormDisplay)
    // }

    render() {

        const { classes } = this.props

        return (

            <div>
                <CardContent>
                    <h2>Edit the Current Contest</h2>

                </CardContent>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(NewContest)));