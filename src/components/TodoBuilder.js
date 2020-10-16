import React, { Component } from 'react';
import TodoList from './TodoList';

const styles = {
    input: {
        width: 200,
        height: 20,
        marginLeft: 5,
    }   
}

class TodoBuilder extends Component{
    constructor(props){
        super(props);
        this.state = {
            todosAmount: 0,
            todos: [],
            msg: '',
            date: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        const todosCopy = this.state.todos.slice();
        todosCopy.push({msg: this.state.msg, date: this.state.date});
        this.setState({
            todos: todosCopy,
            todosAmount: todosCopy.length,
        });
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    render(){
        return(
            <form>
                <input 
                    name="msg"
                    style={styles.input} 
                    type="text"
                    onChange={this.handleChange}
                />
                <input 
                    name="date"
                    style={styles.input} 
                    type="date"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit}>Add</button>
                <TodoList todos={this.state.todos}/>
            </form>
        )
    }
}

export default TodoBuilder;

/* 

*/