import React, { Component } from 'react';
import TodoList from './TodoList';
import Search from './Search';
import Sort from './Sort';

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
            sorted: {
                byNumber: '',
                byText: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSort = this.handleSort.bind(this);
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
    handleSort(e){
        let todosCopy = this.state.todos.slice();
        if ((e.target.id || e.target.parentNode.id) === 'text'){
            if (this.state.sorted.byText === ('' || 'asc')) {
                todosCopy.sort((a, b) => a.msg < b.msg ? 1 : -1); // desc
                this.setState({
                    todos: todosCopy,
                    sorted: {
                        byText: 'desc',
                    },
                });
            } else {
                todosCopy.sort((a,b) => a.msg > b.msg ? 1 : -1); // asc
                this.setState({
                    todos: todosCopy,
                    sorted: {
                        byText: 'asc',
                    },
                });
            }
        } else {
            if (this.state.sorted.byNumber === ('' || 'asc')){
                todosCopy.sort((a, b) => a.date < b.date ? 1 : -1); // desc
                this.setState({
                    todos: todosCopy,
                    sorted: {
                        byNumber: 'desc',
                    },
                });
            } else {
                todosCopy.sort((a, b) => a.date > b.date ? 1 : -1); // asc
                this.setState({
                    todos: todosCopy,
                    sorted: {
                        byNumber: 'asc',
                    },
                });
            }
        }
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
                    <Sort todos={this.state.todos} handleSort={this.handleSort}/>
                    <TodoList todos={this.state.todos} handleDelete={this.handleDelete} handleComplete={this.handleComplete}/>
                </div>
            </div>
        )
    }
}

export default TodoBuilder;