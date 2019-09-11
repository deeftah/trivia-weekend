import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Grid, Typography } from "@material-ui/core";
import { Edit, Undo } from '@material-ui/icons';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class VisualItems extends Component {

    render() {

        return (
            <Grid item sm={4} align="center">
                
                <Card style={{ backgroundColor: "#494A49" }}>
                    <CardContent>
                        <CardActionArea>
                            <ExpansionPanel style={{ backgroundColor: "#777877" }}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography>
                                        <b>Visual #{this.props.visual.image_number}</b> ({this.props.visual.match_level})
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        <p>{this.props.visual.comment}</p>
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </CardActionArea>
                    </CardContent>
                    <CardMedia
                        component="img"
                        alt={this.props.visual.comment}
                        style={{ width: '90%', marginTop: 10 }}
                        image={this.props.visual.url}
                        title={this.props.visual.comment}
                    />
                    <CardActions>
                        <Button>
                            <Edit style={{ marginRight: 3 }} />Edit
                    </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default withRouter(connect()(VisualItems));