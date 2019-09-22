import React, { Component } from 'react';
import { connect } from 'react-redux';

//Navigation
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import UserPage from '../UserPage/UserPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import Home from '../Home/Home';
import Visual from '../Visual/Visual';
import Schedule from '../Schedule/Schedule';
import Live from '../Live/Live';
import Profile from '../Profile/Profile';

//Styling
import { ThemeProvider } from '@material-ui/styles';
import theme from '../Theme/Theme.js';
import blueTheme from '../Theme/BlueTheme.js';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import 'typeface-roboto';

class App extends Component {

  state = {
    color: '#55d685'
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.user.color !== prevProps.user.color) {
  //     this.setState({
  //       color: this.props.user.color
  //     })
  //     // this.colorScheme();
  //   }
  //   console.log('the component did update is hitting', this.props.user.color)
  // }

  // colorScheme() {
  //   if (this.state.color == '#0fefff') {
  //     theme.palette.primary.main = '#0fefff'
  //   }
  // }

  render() {

    // if (this.state.color == '#0fefff') {
    // theme.palette.primary.main = '#0fefff'
    // theme.palette.success.main = '#0fefff'
    // }

    console.log('this is what we have on users', theme)

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div>
            <NavBar/>
            {/* <Switch> */}
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            {/* <Redirect exact from="/" to="/home" /> */}
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <Container>
              <Typography color="secondary">
                <ProtectedRoute
                  exact
                  path="/main"
                  component={UserPage}
                />
                {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
                <ProtectedRoute
                  exact
                  path="/home"
                  component={Home}
                />
                <ProtectedRoute
                  exact
                  path="/visual"
                  component={Visual}
                />
                <ProtectedRoute
                  exact
                  path="/schedule"
                  component={Schedule}
                />
                <ProtectedRoute
                  exact
                  path="/live"
                  component={Live}
                />
                <ProtectedRoute
                  exact
                  path="/profile"
                  component={Profile}
                />
                <Route
                  exact path="/login"
                  component={LoginPage}
                />
                <Route
                  exact path="/register"
                  component={RegisterPage}
                />
                {/* If none of the other routes matched, we will show a 404. */}
                {/* <Route render={() => <h1>404</h1>} /> */}
              </Typography>
            </Container>
            {/* </Switch> */}
          </div>
        </Router>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(App);
