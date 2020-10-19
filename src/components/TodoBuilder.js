import React, { Component } from 'react';
import TodoList from './TodoList';
import Search from './Search';

class TodoBuilder extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            msg: '',
            date: '',
            msgIsEmpty: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        if (this.state.msg.trim()) {
            const todosCopy = this.state.todos.slice();
            todosCopy.push(
                {   
                    msg: this.state.msg,
                    date: this.state.date, 
                    id: Date.now(),
                });
            this.setState({
                todos: todosCopy,
            });
        } else {
            this.setState({
                msgIsEmpty: true,
            });
        }
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
            msgIsEmpty: false,
        });
    }
    handleDelete(id){
        const todosCopy = this.state.todos.filter(item => item.id !== id);
        this.setState({
            todos: todosCopy,
        });
    }
    render(){
        return(
            <div>
                <div className='todoBuilder'>
                    <form className='form'>
                        <input 
                            name="msg"
                            className={this.state.msgIsEmpty ? 'input input--empty' : 'input'}
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input 
                            name="date"
                            className='input input--date'
                            type="date"
                            onChange={this.handleChange}
                        />
                        
                        <button 
                            onClick={this.handleSubmit}
                            className='btn'
                        ><b>Add</b></button>
                    </form>
                    <Search/>
                    <TodoList todos={this.state.todos} handleDelete={this.handleDelete}/>
                </div>
            </div>
        )
    }
}

export default TodoBuilder;