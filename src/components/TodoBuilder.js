import React, { Component } from 'react';
import TodoList from './TodoList';
import Search from './Search';

const getTodos = () => JSON.parse(sessionStorage.getItem('todos'));
const setTodos = todos => sessionStorage.setItem('todos', JSON.stringify(todos));

class TodoBuilder extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos: (getTodos() || []),
            msg: '',
            date: '',
            isCompleted: false,
            msgIsEmpty: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
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
                    isCompleted: false,
                });
            this.setState({
                todos: todosCopy,
            });
            setTodos(todosCopy);
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
    handleComplete(id){
        let todosCopy = this.state.todos.slice();
        todosCopy = todosCopy.map(todo => {
            if (todo.id === id) {
                todo.isCompleted = !todo.isCompleted;
            }
            return todo;
        });
        this.setState({
            todos: todosCopy,
        });
        setTodos(todosCopy);
    }
    handleDelete(id){
        const todosCopy = this.state.todos.filter(item => item.id !== id);
        this.setState({
            todos: todosCopy,
        });
        setTodos(todosCopy);
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
                    <TodoList todos={this.state.todos} handleDelete={this.handleDelete} handleComplete={this.handleComplete}/>
                </div>
            </div>
        )
    }
}

export default TodoBuilder;