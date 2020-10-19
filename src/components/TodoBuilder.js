import React, { Component } from 'react';
import TodoList from './TodoList';
import Search from './Search';

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
            <div>
                <div className='todoBuilder'>
                    <form className='form'>
                        <input 
                            name="msg"
                            className={'input'}
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input 
                            name="date"
                            className={'input input--date'}
                            type="date"
                            onChange={this.handleChange}
                        />
                        
                        <button 
                            onClick={this.handleSubmit}
                            className='btn'
                        ><b>Add</b></button>
                    </form>
                    <Search/>
                    <TodoList todos={this.state.todos}/>
                </div>
            </div>
        )
    }
}

export default TodoBuilder;

/* 

*/