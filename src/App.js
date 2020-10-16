import React, { Component } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import TodoBuilder from './components/TodoBuilder';

class App extends Component {
    render(){
    return(
      <div className="App">
        <Header />
        <TodoBuilder />
        <Search />
      </div>
    );
  }
}

export default App;