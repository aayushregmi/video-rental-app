import React, { Component } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'; 
import {ToastContainer} from 'react-toastify';
import Movie from './components/movie';
import NavBar from './components/navBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Posts from './components/posts';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';
import auth from "./services/authService";
import './App.css';
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {  }

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({user});
  }

  render() { 
    return (
      <React.Fragment>
      <NavBar user={this.state.user} />
      <ToastContainer />
      <main className="container">
        <Switch>
          <Route path="/posts" component={Posts} />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route path="/movies" render={props => <Movie {...props} user={this.state.user} />} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} /> 
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
      </React.Fragment>
    );
  }
}

export default App;
