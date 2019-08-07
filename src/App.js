import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "./components/Header";
import FolderList from "./components/FolderList";
import NoteList from "./components/NoteList";
import NotePage from "./components/NotePage";
import NoteSidebar from "./components/NoteSidebar";
import AppContext from "./context/AppContext";

import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null
  };

  deleteNote = async id => {
    try {
      await fetch(`http://localhost:9090/notes/${id}`, { method: "DELETE" });
      this.setState({ notes: this.state.notes.filter(note => note.id !== id) });
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    Promise.all([
      fetch("http://localhost:9090/folders"),
      fetch("http://localhost:9090/notes")
    ])
      .then(responses => {
        console.log(responses);
        responses.forEach(response => {
          if (!response.ok) {
            Promise.reject("sorry there was an issue");
          }
        });
        return responses;
      })
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(responses =>
        this.setState({ folders: responses[0], notes: responses[1] })
      )
      .catch(error => console.error(error));
  }

  render() {
    const { folders, notes } = this.state;
    return (
      <div className="App">
        <AppContext.Provider
          value={{ folders, notes, deleteNote: this.deleteNote }}
        >
          <Header />
          <div className="sidebar">
            <Switch>
              <Route
                exact
                path="/notes/:noteId"
                render={props => <NoteSidebar {...props} />}
              />
              <Route render={props => <FolderList {...props} />} />
            </Switch>
          </div>
          <div className="main">
            <Switch>
              <Route exact path="/" render={props => <NoteList {...props} />} />
              <Route
                exact
                path="/folders/:folderId"
                render={props => <NoteList {...props} />}
              />
              <Route
                exact
                path="/notes/:notesId"
                render={props => <NotePage {...props} />}
              />
            </Switch>
          </div>
        </AppContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
