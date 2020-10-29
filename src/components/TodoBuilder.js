import React, { Component } from 'react';
import TodoList from './TodoList';
import Search from './Search';
import Menu from './Menu';

class TodoBuilder extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos: (this.getTodosFromStorage() || []),
            msg: '',
            date: '',
            isCompleted: false,
            msgIsEmpty: false,
            sorted: {
                byNumber: 'desc',
                byText: 'desc'
            },
            filterBy: '',
            maxPossibleDate: '9999-12-31',
            timePeriod: {
                start: '',
                end: '9999-12-31',
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTimePeriod = this.handleTimePeriod.bind(this);
    }
    getTodosFromStorage = () => JSON.parse(sessionStorage.getItem('todos'));
    saveTodosInStorage = todos => sessionStorage.setItem('todos', JSON.stringify(todos));
    shouldBeFiltered() {
        if (this.state.filterBy ||
            this.state.timePeriod.start !== '' || 
            this.state.timePeriod.end !== this.state.maxPossibleDate){
            return true;
        } else {
            return false;
        }
    }
    handleSubmit(e){
        e.preventDefault();
        if (this.state.msg.trim()){
            this.setState(state => {
                let todos = [...state.todos];
                todos.push(
                    {   
                        msg: state.msg,
                        date: state.date, 
                        id: Date.now(),
                        isCompleted: false,
                    });
                this.saveTodosInStorage(todos);
                return { todos }
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
    handleComplete(id){
        this.setState(state => {
            let todos = state.todos.map(todo => {
                if (todo.id === id) {
                    todo.isCompleted = !todo.isCompleted;
                }
                return todo;
            });
            this.saveTodosInStorage(todos);
            return { todos }
        });
    }
    handleDelete(id){
        this.setState(state => {
            const todos = state.todos.filter(item => item.id !== id);
            this.saveTodosInStorage(todos);
            return { todos }
        });
    }
    handleFilter(){
        let filtered = this.state.todos.filter(todo => {
            return (todo.msg.includes(this.state.filterBy) && (todo.date >= this.state.timePeriod.start && todo.date <= this.state.timePeriod.end));
        });
        if (this.state.sorted.byText === 'asc') {
            filtered.sort((a,b) => a.msg > b.msg ? 1 : -1); // asc
        } else if (this.state.sorted.byText === 'desc') {
            filtered.sort((a, b) => a.msg < b.msg ? 1 : -1); // desc
        } else if (this.state.sorted.byNumber === 'asc') {
            filtered.sort((a, b) => a.date > b.date ? 1 : -1); // asc
        } else if (this.state.sorted.byNumber === 'desc') {
            filtered.sort((a, b) => a.date < b.date ? 1 : -1); // desc
        }
        return filtered;
    }
    handleSearch(e){
        this.setState({
            filterBy: e.target.value,
        });
    }
    handleTimePeriod(e){
        e.persist();
        this.setState(state => {
            const start = e.target.name === 'start' ? e.target.value : state.timePeriod.start;
            const end = e.target.name === 'end' 
                ? (e.target.value !== '' ? e.target.value : state.maxPossibleDate) 
                : state.timePeriod.end;
            return {
                timePeriod: { start, end }
            }
        });
    }
    handleSort(e){
        // Не добавил проверку на то, отсортированы ли данные изначально, из-за этого при отсортированных в DESC порядке данных в первый раз произойдет рендер туду в том же порядке
        this.shouldBeFiltered = this.shouldBeFiltered.bind(this);
        let todos = (this.shouldBeFiltered() ? this.handleFilter() : [...this.state.todos]);
        if ((e.target.id || e.target.parentNode.id) === 'text'){
            if (this.state.sorted.byText === 'asc') {
                todos.sort((a, b) => a.msg < b.msg ? 1 : -1); // desc
                this.setState(state => {
                    return {
                        sorted: {
                            byText: 'desc',
                            byNumber: state.sorted.byNumber,
                        }
                    }
                });
            } else {
                todos.sort((a,b) => a.msg > b.msg ? 1 : -1); // asc
                this.setState(state => {
                    return {
                        sorted: {
                            byText: 'asc',
                            byNumber: state.sorted.byNumber,
                        }
                    }
                });
            }
        } else {
            if (this.state.sorted.byNumber === 'asc'){
                todos.sort((a, b) => a.date < b.date ? 1 : -1); // desc
                this.setState(state => {
                    return {
                        sorted: {
                            byNumber: 'desc',
                            byText: state.sorted.byText,
                        },
                    }
                });
            } else {
                todos.sort((a, b) => a.date > b.date ? 1 : -1); // asc
                this.setState(state => {
                    return {
                        sorted: {
                            byNumber: 'asc',
                            byText: state.sorted.byText,
                        },
                    }
                });
            }
        }
        if (!this.shouldBeFiltered()){
            this.setState({
                todos,
            });
        }
        return todos;
    }
    render(){
        return (
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
                    <Search handleChange={this.handleSearch}/>
                    <Menu 
                        todos={this.shouldBeFiltered() ? this.handleFilter() : this.state.todos}
                        handleSort={this.handleSort}
                        handleTimePeriod={this.handleTimePeriod}
                    />
                    <TodoList
                        todos={this.shouldBeFiltered() ? this.handleFilter() : this.state.todos}
                        handleDelete={this.handleDelete}
                        handleComplete={this.handleComplete}
                    />
                </div>
            </div>
        );
    }
}

export default TodoBuilder;