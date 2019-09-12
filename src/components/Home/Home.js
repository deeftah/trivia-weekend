import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Typography } from "@material-ui/core";
import CountDown from '../CountDown/CountDown'
import { Cancel, Edit, Schedule } from '@material-ui/icons';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TeamLogo from './TeamLogo';
import MuiTextArea from './MuiTextArea';

class Home extends Component {

    state = {
        editBoilerplate: false,
        boilerplate: ''
    }

    // componentDidMount() {
    //     this.getTeamDetails();
    // }

    // getTeamDetails() {
    //     this.props.dispatch({
    //         type: 'FETCH_TEAM_DETAILS'
    //     })
    // }

    toggleBoilerplateEdit = () => {
        this.setState({
            editBoilerplate: !this.state.editBoilerplate
        })
    }

    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            
                [propertyName]: event.target.value
            
        });
        console.log('the handle change for is being called!')
    }

    handleBoilerplateSave = () => {
        this.props.dispatch({
            type: 'UPDATE_BOILERPLATE',
            payload: this.state.boilerplate
        })
        this.setState({
            editImage: !this.state.editBoilerplate
        })
    }

    render() {

        return (
            <div style={{ marginTop: 80, padding: 30 }}>
                {/* Establish spacing between cards */}
                <Schedule /> <CountDown />
                <br /><br />
                <Grid container spacing={2} justify="center">
                    <TeamLogo />

                    <Grid item sm={6}>
                        <Card style={{ backgroundColor: "#494A49" }}>
                            <CardContent>
                                <Typography color="secondary" align="center">
                                    <b>Team News</b>
                                    </Typography>
                                    <br/><br/>
                                    <Typography color="secondary">
                                    <p>{this.props.team.boilerplate}</p>
                                    {this.state.editBoilerplate && <MuiTextArea onChange={this.handleChangeFor('boilerplate')}/>}
                                    {this.state.editBoilerplate && <Button color="primary" onClick={this.handleBoilerplateSave}>Save</Button>}
                                </Typography>
                            </CardContent >
                            <CardActions>
                                {!this.state.editBoilerplate &&
                                    <Button color="primary" onClick={this.toggleBoilerplateEdit}>
                                        <Edit style={{ marginRight: 3 }} />Edit
                         </Button>}
                                {this.state.editBoilerplate &&
                                    <Button color="secondary" onClick={this.toggleBoilerplateEdit}>
                                        <Cancel style={{ marginRight: 3 }} />Cancel
                         </Button>}
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