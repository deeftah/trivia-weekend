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

class NewContest extends Component {

    render() {

        const { classes } = this.props

        return (

            <div>
                <h3>Create a New Contest</h3>
                <Button color="primary">New Contest</Button>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(NewContest)));