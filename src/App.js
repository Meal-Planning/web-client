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
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

// -- Import Images
import logo from './logo.svg';
import ContentAdd from 'material-ui/svg-icons/content/add';

// -- Import Styles
import './App.css';

// -- Import Nutrition Service
import {GetIngredients} from './services/nutrition-service.js'

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

class NoteListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }

    handleNotesChange(e) {
        this.props.onNoteChange(this.props.index, e.target.value);
    }

    handleDeleteNote(e) {
        this.props.onNoteDelete(this.props.index);
    }

    render() {
        return (
            <li><TextField id={this.props.index.toString()} value={this.props.note} multiLine={true} onChange={this.handleNotesChange}/><FlatButton label="X" onClick={this.handleDeleteNote}/></li>
        );
    }
}

class NoteSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
    }

    handleNotesChange(index, value) {
        this.props.onNotesChange(index, value);
    }

    handleNewNote(e) {
        this.props.onNoteAdded();
    }

    handleDeleteNote(index) {
        this.props.onNoteDeleted(index);
    }

    render() {
        var self = this;
        var rows = [];
        this.props.recipe.notes.forEach(function (note, index) {
            rows.push(<NoteListItem key={index}
                                    index={index}
                                    note={note}
                                    onNoteChange={self.handleNotesChange}
                                    onNoteDelete={self.handleDeleteNote} />);
        });
        return (
            <div>
                <h2>Notes Section</h2>
                <ol>
                    {rows}
                </ol>
                <FlatButton label="Add New +" onClick={this.handleNewNote}/>
            </div>
        );
    }
}

class DirectionListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
        this.handleDeleteDirection = this.handleDeleteDirection.bind(this);
    }

    handleDirectionsChange(e) {
        this.props.onDirectionChange(this.props.index, e.target.value);
    }

    handleDeleteDirection(e) {
        this.props.onDirectionDelete(this.props.index);
    }

    render() {
        return (
            <li><TextField id={this.props.index.toString()} value={this.props.direction} multiLine={true} onChange={this.handleDirectionsChange}/><FlatButton label="X" onClick={this.handleDeleteDirection}/></li>
        );
    }
}

class DirectionSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
        this.handleNewDirection = this.handleNewDirection.bind(this);
        this.handleDeleteDirection = this.handleDeleteDirection.bind(this);
    }

    handleDirectionsChange(index, value) {
        this.props.onDirectionsChange(index, value);
    }

    handleNewDirection(e) {
        this.props.onDirectionAdded();
    }

    handleDeleteDirection(index) {
        this.props.onDirectionDeleted(index);
    }

    render() {
        var self = this;
        var rows = [];
        this.props.recipe.directions.forEach(function (direction, index) {
            rows.push(<DirectionListItem key={index}
                                         index={index}
                                         direction={direction}
                                         onDirectionChange={self.handleDirectionsChange}
                                         onDirectionDelete={self.handleDeleteDirection} />);
        });
        return (
            <div>
                <h2>Directions Section</h2>
                <ol>
                    {rows}
                </ol>
                <FlatButton label="Add New +" onClick={this.handleNewDirection}/>
            </div>
        );
    }
}

class IngredientList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Ingredients List</h3>
            </div>
        );
    }
}

class IngredientSearchItem extends React.Component {
    constructor(props) {
        super(props);
        this.addIngredient = this.addIngredient.bind(this);
    }

    addIngredient(e) {
        //add ingredient to ingredientList
    }

    render() {
        return (
            <ListItem primaryText={this.props.ingredient.name} rightIcon={<ContentAdd />} onClick={this.addIngredient} />
        );
    }
    /*<li><p>{this.props.ingredient.name}</p><FlatButton label="+" onClick={this.addIngredient}/></li>*/
}

class IngredientSearch extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.addNewIngredient = this.addNewIngredient.bind(this);

        this.loadIngredientSource();
    }

    loadIngredientSource() {
        GetIngredients().then((ingredients) => {
            this.setState({searchIngredients: ingredients});
        });
    }

    handleSearchChange(e) {
        //this.props.onSearchChange(e.target.value);
        // can we get values here, without tracing back to parent component?
        // I believe so, but we will have to have a function that handles the selected ingredient, passes it to the parent, and pushes that out to the ingredientList
    }

    addNewIngredient(e) {

    }

    state = {
        searchIngredients: [],
        /*dataSourceConfig: {
            text: 'name',
            value: 'ingredientId'
        }*/
    };

    render() {
        var self = this;
        var rows = [];
        this.state.searchIngredients.forEach(function (ingredient, index) {
            rows.push(<IngredientSearchItem key={ingredient.ingredientId}
                                            index={index}
                                            ingredient={ingredient} />);
        });
        return (
            <div>
                <h3>Ingredients Search</h3>
                <TextField hintText="Search for ingredient..." onChange={this.handleSearchChange} />
                <List className="ingredient-search-list">
                    {rows}
                    <ListItem primaryText="Add new +" onClick={this.addNewIngredient} />
                </List>
            </div>
        );
    }
    /*<AutoComplete
     hintText="Type anything"
     filter={AutoComplete.caseInsensitiveFilter}
     openOnFocus={true}
     dataSource={this.state.dataSource}
     dataSourceConfig={this.state.dataSourceConfig}
     />*/
}

class SectionListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleIngredientSectionChange = this.handleIngredientSectionChange.bind(this);
        this.handleDeleteIngredientSection = this.handleDeleteIngredientSection.bind(this);
    }

    handleIngredientSectionChange(e) {
        this.props.onIngredientSectionChange(this.props.index, e.target.value);
    }

    handleDeleteIngredientSection(e) {
        this.props.onIngredientSectionDeleted(this.props.index);
    }

    render() {
        return (
            <li><TextField id={this.props.section.id.toString()} value={this.props.section.name} onChange={this.handleIngredientSectionChange}/><FlatButton label="X" onClick={this.handleDeleteIngredientSection}/></li>
        );
    }
}

class SectionTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleIngredientSectionChange = this.handleIngredientSectionChange.bind(this);
        this.handleNewIngredientSection = this.handleNewIngredientSection.bind(this);
        this.handleDeleteIngredientSection = this.handleDeleteIngredientSection.bind(this);
    }

    handleIngredientSectionChange(index, value) {
        this.props.onIngredientSectionChange(index, value);
    }

    handleNewIngredientSection(e) {
        this.props.onIngredientSectionAdded();
    }

    handleDeleteIngredientSection(index) {
        this.props.onIngredientSectionDeleted(index);
    }

    render() {
        var self = this;
        var rows = [];
        this.props.sections.forEach(function (section, index) {
            rows.push(<SectionListItem key={section.id}
                                       index={index}
                                       section={section}
                                       onIngredientSectionChange={self.handleIngredientSectionChange}
                                       onIngredientSectionDeleted={self.handleDeleteIngredientSection} />);
        });
        return (
            <div>
                <h3>Sections</h3>
                <ul className="sections-list">
                    {rows}
                </ul>
                <br />
                <FlatButton label="Add New +" onClick={this.handleNewIngredientSection}/>
            </div>
        );
    }
}

class IngredientSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleIngredientSectionChange = this.handleIngredientSectionChange.bind(this);
        this.handleNewIngredientSection = this.handleNewIngredientSection.bind(this);
        this.handleDeleteIngredientSection = this.handleDeleteIngredientSection.bind(this);
    }

    handleIngredientSectionChange(index, value) {
        this.props.onIngredientSectionChange(index, value);
    }

    handleNewIngredientSection(e) {
        this.props.onIngredientSectionAdded();
    }

    handleDeleteIngredientSection(index) {
        this.props.onIngredientSectionDeleted(index);
    }

    render() {
        return (
            <div>
                <h2>Ingredients Section</h2>
                <SectionTable sections={this.props.sections}
                              onIngredientSectionChange={this.handleIngredientSectionChange}
                              onIngredientSectionAdded={this.handleNewIngredientSection}
                              onIngredientSectionDeleted={this.handleDeleteIngredientSection} />
                <div className="add-ingredients-section">
                    <IngredientSearch />
                    <IngredientList />
                </div>
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
            <div className="recipe-info">
                <h2>Recipe Info Section</h2>
                <div className="recipe-info-row">
                    <div>
                        <TextField value={this.props.recipe.name} floatingLabelText="Name" onChange={this.handleNameChange}/>
                    </div>
                    <div>
                        <TextField value={this.props.recipe.url} floatingLabelText="URL" onChange={this.handleURLChange}/>
                    </div>
                    <div />
                    <div />
                </div>
                <div className="recipe-info-row">
                    <div>
                        <TextField value={this.props.recipe.servings} floatingLabelText="Servings" onChange={this.handleServingsChange}/>
                    </div>
                    <div>
                        <TextField value={this.props.recipe.difficultyRating} floatingLabelText="Difficulty" onChange={this.handleDifficultyChange}/>
                    </div>
                    <div>
                        <TextField value={this.props.recipe.time.active} floatingLabelText="Active Time" onChange={this.handleActiveTimeChange}/>
                    </div>
                    <div>
                        <TextField value={this.props.recipe.time.total} floatingLabelText="Total Time" onChange={this.handleTotalTimeChange}/>
                    </div>
                </div>
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
                directions: [''],
                notes: ['']
            }
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleServingsChange = this.handleServingsChange.bind(this);
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.handleActiveTimeChange = this.handleActiveTimeChange.bind(this);
        this.handleTotalTimeChange = this.handleTotalTimeChange.bind(this);
        this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
        this.handleNewDirection = this.handleNewDirection.bind(this);
        this.handleDeleteDirection = this.handleDeleteDirection.bind(this);
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.handleDeleteNote = this.handleDeleteNote.bind(this);
        this.handleIngredientSectionChange = this.handleIngredientSectionChange.bind(this);
        this.handleNewIngredientSection = this.handleNewIngredientSection.bind(this);
        this.handleDeleteIngredientSection = this.handleDeleteIngredientSection.bind(this);
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

    handleDirectionsChange(index, direction) {
        let newDirections = JSON.parse(JSON.stringify(this.state.recipe.directions));
        newDirections[index] = direction;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                directions: newDirections
            })
        });
    }

    handleNewDirection() {
        let newDirections = JSON.parse(JSON.stringify(this.state.recipe.directions));
        newDirections.push('');
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                directions: newDirections
            })
        });
    }

    handleDeleteDirection(index) {
        let newDirections = JSON.parse(JSON.stringify(this.state.recipe.directions));
        newDirections.splice(index,1);
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                directions: newDirections
            })
        });
    }

    handleNotesChange(index, note) {
        let newNotes = JSON.parse(JSON.stringify(this.state.recipe.notes));
        newNotes[index] = note;
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                notes: newNotes
            })
        });
    }

    handleNewNote() {
        let newNotes = JSON.parse(JSON.stringify(this.state.recipe.notes));
        newNotes.push('');
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                notes: newNotes
            })
        });
    }

    handleDeleteNote(index) {
        let newNotes = JSON.parse(JSON.stringify(this.state.recipe.notes));
        newNotes.splice(index,1);
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                notes: newNotes
            })
        });
    }

    handleIngredientSectionChange(index, ingredientSection) {
        let newIngredientsSections = JSON.parse(JSON.stringify(this.state.recipe.ingredientSections));
        newIngredientsSections[index].name = ingredientSection;
        newIngredientsSections[index].id = !ingredientSection ? ingredientSection.toLowerCase().replace(/ /g,"_") : new Date().getUTCMilliseconds();
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                ingredientSections: newIngredientsSections
            })
        });
    }

    handleNewIngredientSection() {
        let newIngredientsSections = JSON.parse(JSON.stringify(this.state.recipe.ingredientSections));
        newIngredientsSections.push({
            name: '',
            id: new Date().getUTCMilliseconds()
        });
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                ingredientSections: newIngredientsSections
            })
        });
    }

    handleDeleteIngredientSection(index) {
        let newIngredientsSections = JSON.parse(JSON.stringify(this.state.recipe.ingredientSections));
        newIngredientsSections.splice(index,1);
        this.setState({
            recipe: Object.assign({}, this.state.recipe, {
                ingredientSections: newIngredientsSections
            })
        });
    }

    render() {
        return (
            <div className="NewRecipePage">
                <h1>New Recipe Page</h1>
                <RecipeInfoSection
                    recipe={this.state.recipe}
                    onNameChange={this.handleNameChange}
                    onURLChange={this.handleURLChange}
                    onServingsChange={this.handleServingsChange}
                    onDifficultyChange={this.handleDifficultyChange}
                    onActiveTimeChange={this.handleActiveTimeChange}
                    onTotalTimeChange={this.handleTotalTimeChange} />

                <IngredientSection
                    sections={this.state.recipe.ingredientSections}
                    onIngredientSectionChange={this.handleIngredientSectionChange}
                    onIngredientSectionAdded={this.handleNewIngredientSection}
                    onIngredientSectionDeleted={this.handleDeleteIngredientSection} />

                <DirectionSection
                    recipe={this.state.recipe}
                    onDirectionsChange={this.handleDirectionsChange}
                    onDirectionAdded={this.handleNewDirection}
                    onDirectionDeleted={this.handleDeleteDirection} />

                <NoteSection
                    recipe={this.state.recipe}
                    onNotesChange={this.handleNotesChange}
                    onNoteAdded={this.handleNewNote}
                    onNoteDeleted={this.handleDeleteNote} />
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
