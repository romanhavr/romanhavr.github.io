import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import YouViewer from './components/YouViewer';
import DragDrop from './components/DragDrop';

function App() {

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navigation />
        </header>
        <main>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/you-viewer">
            <YouViewer />
          </Route>
          <Route path="/drag-drop">
            <DragDrop />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </main>
        <footer className="App-footer">
          <h4>Created by <i>romanhavr</i></h4>
        </footer>
      </Router>
    </div>
  );
}

export default App;
