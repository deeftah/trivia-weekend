import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Schedule extends Component {

    render() {

        return (

            <div>
                This is the Schedule page!
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});
export default withRouter(connect(mapStateToProps)(Schedule));