import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class NewContest extends Component {

    render() {

        return (

            <div>
                <b>Create a New Contest</b>
                <br />
                <Button color="primary">New Contest</Button>
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(NewContest));