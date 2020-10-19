import React, { Component } from 'react';
import Header from './components/Header';
import TodoBuilder from './components/TodoBuilder';

class App extends Component {
    render(){
    return(
      <div className="App">
        <Header />
        <TodoBuilder />
      </div>
    );
  }
}

export default App;