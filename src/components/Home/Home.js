import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Typography } from "@material-ui/core";
import CountDown from '../CountDown/CountDown'
import { Edit, Schedule, Undo } from '@material-ui/icons';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TeamLogo from './TeamLogo';

class Home extends Component {

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
            <div style={{ marginTop: 20, padding: 30 }}>
                {/* Establish spacing between cards */}
                <Schedule /> <CountDown />
                <br /><br />
                <Grid container spacing={2} justify="center">
                    <TeamLogo/>

                    <Grid item sm={6} align="center">
                        <Card>
                            <CardContent>
                                <Typography>
                                    <b>Team News</b>
                                </Typography>
                            </CardContent >
                            <CardActions>
                                <Button color="primary">
                                    <Edit style={{ marginRight: 3 }} />Edit
                         </Button>
                            </CardActions>
                        </Card >
                    </Grid >

                </Grid>


            </div >
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
    team: state.team
});
export default withRouter(connect(mapStateToProps)(Home));