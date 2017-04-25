import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import logo from './logo.svg';
import './App.css';

const Home = () => (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <p className="App-intro">
        Hello World!
      </p>
      <div>
        <Link to="/new-recipe">Add Recipe</Link>
      </div>
    </div>
)

const AddRecipe = () => (
    <div>
      <h2>New Recipe</h2>
        <MuiThemeProvider>
            <TextField hintText="Enter name here" floatingLabelText="Name"/>
        </MuiThemeProvider>
        <MuiThemeProvider>
            <TextField hintText="Enter URL here" floatingLabelText="URL"/>
        </MuiThemeProvider>
        <br/>
        <MuiThemeProvider>
            <TextField hintText="" floatingLabelText="Servings"/>
        </MuiThemeProvider>
        <MuiThemeProvider>
            <TextField hintText="" floatingLabelText="Difficulty"/>
        </MuiThemeProvider>
        <MuiThemeProvider>
            <TextField hintText="" floatingLabelText="Active Time"/>
        </MuiThemeProvider>
        <MuiThemeProvider>
            <TextField hintText="" floatingLabelText="Total Time"/>
        </MuiThemeProvider>
        <br/>
        <h3>Ingredients</h3>
        <MuiThemeProvider>
            <TextField hintText="" floatingLabelText="Sections"/>
        </MuiThemeProvider>
        <br/>
    </div>
)

class App extends Component {
  render() {
    return (
        <Router>
          <div>

            <Route exact path="/" component={Home}/>
            <Route path="/new-recipe" component={AddRecipe}/>
          </div>
        </Router>
    );
  }
}

export default App;
