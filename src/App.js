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
            <ListItem primaryText={this.props.name} rightIcon={<NavigationClose />} disabled={true} />
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
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleServingsChange = this.handleServingsChange.bind(this);
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.handleActiveTimeChange = this.handleActiveTimeChange.bind(this);
        this.handleTotalTimeChange = this.handleTotalTimeChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    handleURLChange(e) {
        this.props.onURLChange(e.target.value);
    }

    handleServingsChange(e) {
        this.props.onServingsChange(e.target.value);
    }

    handleDifficultyChange(e) {
        this.props.onDifficultyChange(e.target.value);
    }

    handleActiveTimeChange(e) {
        this.props.onActiveTimeChange(e.target.value);
    }

    handleTotalTimeChange(e) {
        this.props.onTotalTimeChange(e.target.value);
    }

    render() {
        return (
            <div>
                <h2>Recipe Info Section</h2>
                <TextField value={this.props.recipe.name} floatingLabelText="Name" onChange={this.handleNameChange}/>
                <TextField value={this.props.recipe.url} floatingLabelText="URL" onChange={this.handleURLChange}/>
                <br/>
                <TextField value={this.props.recipe.servings} floatingLabelText="Servings" onChange={this.handleServingsChange}/>
                <TextField value={this.props.recipe.difficultyRating} floatingLabelText="Difficulty" onChange={this.handleDifficultyChange}/>
                <TextField value={this.props.recipe.time.active} floatingLabelText="Active Time" onChange={this.handleActiveTimeChange}/>
                <TextField value={this.props.recipe.time.total} floatingLabelText="Total Time" onChange={this.handleTotalTimeChange}/>
                <br/>
            </div>
        );
    }
}

class NewRecipePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                recipeId: 'test-id',
                name: '',
                url: 'test.com',
                time: {
                    active: 0,
                    total: 0
                },
                servings: 0,
                difficultyRating: 0,
                ingredientSections: [
                    {
                        name: 'Main',
                        id: 'main'
                    }
                ],
                ingredients: [],
                directions: [],
                notes: []
            }
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleServingsChange = this.handleServingsChange.bind(this);
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.handleActiveTimeChange = this.handleActiveTimeChange.bind(this);
        this.handleTotalTimeChange = this.handleTotalTimeChange.bind(this);
    }

    handleNameChange(name) {
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                name: name
            })
        });
    }

    handleURLChange(url) {
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                url: url
            })
        });
    }

    handleServingsChange(servings) {
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                servings: servings
            })
        });
    }

    handleDifficultyChange(difficultyRating) {
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                difficultyRating: difficultyRating
            })
        });
    }

    handleActiveTimeChange(activeTime) {
        let newTime = JSON.parse(JSON.stringify(this.state.recipe.time));
        newTime.active = activeTime;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                time: newTime
            })
        });
    }

    handleTotalTimeChange(totalTime) {
        let newTime = JSON.parse(JSON.stringify(this.state.recipe.time));
        newTime.total = totalTime;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                time: newTime
            })
        });
    }

    render() {
        return (
            <div>
                <h1>New Recipe Page</h1>
                <RecipeInfoSection
                    recipe={this.state.recipe}
                    onNameChange={this.handleNameChange}
                    onURLChange={this.handleURLChange}
                    onServingsChange={this.handleServingsChange}
                    onDifficultyChange={this.handleDifficultyChange}
                    onActiveTimeChange={this.handleActiveTimeChange}
                    onTotalTimeChange={this.handleTotalTimeChange} />

                <DirectionSection recipe={this.state.recipe} />
                <NoteSection />
            </div>
        );
    }
    //<IngredientSection sections={this.state.newRecipe} onClick={() => this.handleClick()}/>
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
