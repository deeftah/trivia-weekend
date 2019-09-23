import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import LoginButton from '../NavButtons/LoginButton';
import RegisterButton from '../NavButtons/RegisterButton';
import TabPanel from './Tab';
import ScrollableTabsButtonForce from './TabBar';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const ButtonAppBar = ({color}) => {

    const classes = useStyles();

    // const example = (props) => {props.color}

    return (
        <div className={classes.root}>
            <AppBar position="fixed" style={{backgroundColor: color}}>
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton> */}

                    <Typography variant="h6" className={classes.title}>
                        Trivia Weekend
          </Typography>

                    {/* <TabPanel/> */}
                    <ScrollableTabsButtonForce selectedColor={color}/>

                    <LoginButton color={color}/>
                    <RegisterButton color={color}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ButtonAppBar