import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import CardActions from "@material-ui/core/CardActions";
import { Edit, Undo } from '@material-ui/icons';

class TeamLogo extends Component {

    state = {
        editImage: false,
        newImage: ''
    }

    componentDidMount() {
        this.getTeamDetails();
    }

    getTeamDetails() {
        this.props.dispatch({
            type: 'FETCH_TEAM_DETAILS'
        })
    }

    toggleImageEdit = () => {
        this.setState({
            editImage: !this.state.editImage
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            newImage: {
                [propertyName]: event.target.value
            }
        });
    }

    handleImageSave = () => {
        this.props.dispatch({
            type: 'UPDATE_IMAGE',
            payload: this.state.newImage
        })
        this.setState({
            editImage: !this.state.editImage
        })
    }

    render() {

        return (

            <>
                <Grid item sm={6} align="center">
                    <Card style={{ backgroundColor: "#494A49" }}>
                        <CardContent>
                            <Typography color="secondary">
                                {!this.props.team.logo_url ? <b>Upload a Logo</b> : <b>{this.props.team.name}</b>}
                                <br /><br />
                                {!this.props.team.logo_url ? <img src="https://mk0nationaltodayijln.kinstacdn.com/wp-content/uploads/2019/01/national-trivia-day-640x514.jpg"/>
                                    : <img src={this.props.team.logo_url}/>}
                                {this.state.editImage && <input onChange={this.handleChangeFor('newImage')} placeholder="enter image url" />}
                                {this.state.editImage && <Button onClick={this.handleImageSave}>Save</Button>}
                            </Typography>
                        </CardContent >
                        <CardActions>
                            {!this.state.editImage &&
                                <Button color="primary" onClick={this.toggleImageEdit}>
                                    <Edit style={{ marginRight: 3 }} />Edit
                         </Button>}
                            {this.state.editImage &&
                                <Button onClick={this.toggleImageEdit}>
                                    <Undo style={{ marginRight: 3 }} />Undo
                         </Button>}
                        </CardActions>
                    </Card >
                </Grid >
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team
});
export default withRouter(connect(mapStateToProps)(TeamLogo));