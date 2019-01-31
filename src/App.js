import React, { Component } from 'react';
import logo from './logo.svg';
import { GridComponent } from './components/gridComponent/gridComponent';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <GridComponent/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
