import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import logo from './logo.svg';
import './App.css';

injectTapEventPlugin();

const Home = () => (
    <div className="App">
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>

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
        <TextField floatingLabelText="Name"/>
        <TextField floatingLabelText="URL"/>
        <br/>
        <TextField floatingLabelText="Servings"/>
        <TextField floatingLabelText="Difficulty"/>
        <TextField floatingLabelText="Active Time"/>
        <TextField floatingLabelText="Total Time"/>
        <br/>

        <h3>Ingredients</h3>
        <TextField floatingLabelText="Sections"/>
        <br/>
    </div>
)

class App extends Component {
    render() {
        return (
            <Router>

                <MuiThemeProvider>
                    <div>

                        <Route exact path="/" component={Home}/>

                        <Route path="/new-recipe" component={AddRecipe}/>

                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;
