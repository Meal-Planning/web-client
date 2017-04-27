// -- Import core React tools
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

// -- Import Material UI Themes
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// -- Import Material UI Components
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

// -- Import Images
import logo from './logo.svg';

// -- Import Styles
import './App.css';

// -- activate touch capabilities
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

class NoteSection extends React.Component {
    render() {
        return (
            <div>
                <h2>Notes Section</h2>
            </div>
        );
    }
}

class DirectionSection extends React.Component {
    render() {
        return (
            <div>
                <h2>Directions Section</h2>
            </div>
        );
    }
}

class AddSectionButton extends React.Component {
    render() {
        return (
            <FlatButton label="Add New +" onClick={() => this.props.onClick()}/>
        );
    }
}

class SectionRow extends React.Component {
    render() {
        return (
            <ListItem primaryText={this.props.name} rightIcon={<NavigationClose />}/>
        );
    }
}

class SectionTable extends React.Component {
    render() {
        var rows = [];
        this.props.sections.forEach(function (section) {
            rows.push(<SectionRow name={section} key={section}/>);
        });
        return (
            <div>
                <h3>Sections</h3>
                <List className="sections-list">
                    {rows}
                </List>
                <AddSectionButton onClick={() => this.props.onClick()}/>
            </div>
        );
    }
}

class IngredientSection extends React.Component {
    render() {
        return (
            <div>
                <h2>Ingredients Section</h2>
                <SectionTable sections={this.props.sections} onClick={() => this.props.onClick()}/>
            </div>
        );
    }
}

class RecipeInfoSection extends React.Component {
    render() {
        return (
            <div>
                <h2>Recipe Info Section</h2>
                <TextField floatingLabelText="Name"/>
                <TextField floatingLabelText="URL"/>
                <br/>
                <TextField floatingLabelText="Servings"/>
                <TextField floatingLabelText="Difficulty"/>
                <TextField floatingLabelText="Active Time"/>
                <TextField floatingLabelText="Total Time"/>
                <br/>
            </div>
        );
    }
}

class NewRecipePage extends React.Component {
    constructor() {
        super();
        this.state = {
            SECTIONS: ['Main', 'Side']
        };
    }

    handleClick() {
        var sections = this.state.SECTIONS;
        sections.push(this.state.SECTIONS.length + 1);
        this.setState({
            SECTIONS: sections
        });
    }

    render() {
        return (
            <div>
                <h1>New Recipe Page</h1>
                <RecipeInfoSection />
                <IngredientSection sections={this.state.SECTIONS} onClick={() => this.handleClick()}/>
                <DirectionSection />
                <NoteSection />
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <Router>
                <MuiThemeProvider>
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route path="/new-recipe" component={NewRecipePage}/>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default App;
