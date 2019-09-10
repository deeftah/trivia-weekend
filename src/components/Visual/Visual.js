import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Visual extends Component {

    render() {

        return (

            <div>
                This is the Visual page!
            </div>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
});
export default withRouter(connect(mapStateToProps)(Visual));