import React, { Component } from 'react';
import TodoList from './TodoList';
import Search from './Search';
import Menu from './Menu';

class TodoBuilder extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos: (this.getTodos() || []),
            msg: '',
            date: '',
            isCompleted: false,
            msgIsEmpty: false,
            sorted: {
                byNumber: '',
                byText: ''
            },
            filtered: (this.getTodos() || []),
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
        this.handleTimePeriod = this.handleTimePeriod.bind(this);
    }
    getTodos = () => JSON.parse(sessionStorage.getItem('todos'));
    setTodos = todos => sessionStorage.setItem('todos', JSON.stringify(todos));
    isFiltered() {
        if (this.state.filterBy ||
            this.state.timePeriod.start !== '' || 
            this.state.timePeriod.end !== this.state.maxPossibleDate){
            return true;
        } else {
            console.group(this.state.filterBy, this.state.timePeriod.start, this.state.timePeriod.end)
            return false;
        }
    }
    handleSubmit(e){ // Если добавляется todo, не удовлетворяющая текущим фильтрам, она все равно отобразится в списке до первой фильтрации.
        e.preventDefault();
        if (this.state.msg.trim()) {
            const todosCopy = this.state.todos.slice();
            const filtered = this.state.filtered.slice();
            todosCopy.push(
                {   
                    msg: this.state.msg,
                    date: this.state.date, 
                    id: Date.now(),
                    isCompleted: false,
                });
            if (this.state.filterBy ||  
                    (this.state.msg.trim().includes(this.state.filterBy) || 
                    (this.state.date <= this.state.timePeriod.end && this.state.date >= this.state.timePeriod.start))) {
                filtered.push(todosCopy[todosCopy.length-1]);
            }
            this.setState({
                todos: todosCopy,
                filtered,
            });
            this.setTodos(todosCopy);
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
            todos: todosCopy, // В этот момент не меняется значение isCompleted у filtered. И оно не изменится до тех пор, пока в поиске не будет совпадающая строка (см. HandleFilter). Но при вводе любого значения в поиск и после его очистки isCompleted начинает меняться и у filtered, почему?
        });
        this.setTodos(todosCopy);
    }
    handleDelete(id){
        const todosCopy = this.state.todos.filter(item => item.id !== id);
        const filtered = this.state.filtered.filter(item => item.id !== id);
        this.setState({
            todos: todosCopy,
            filtered,
        });
        this.setTodos(todosCopy);
    }
    handleFilter(e){
        const filterBy = e.target.value;
        const filtered = [];
        this.state.todos.forEach(todo => {
            console.log(todo.date)
            if (
                todo.msg.includes(filterBy) &&
                (todo.date >= this.state.timePeriod.start && todo.date <= this.state.timePeriod.end)
                ) {
                filtered.push(todo);
            }
        });
        this.setState({
            filtered,
            filterBy,
        });
    }
    handleTimePeriod(e){
        let start = e.target.name === 'start' ? e.target.value : this.state.timePeriod.start;
        let end = e.target.name === 'end' 
                ? (e.target.value !== '' ? e.target.value : this.state.maxPossibleDate) 
                : this.state.timePeriod.end;
        const todosCopy = this.state.filterBy ? this.state.filtered.slice() : this.state.todos.slice();
        const filtered = [];
        todosCopy.forEach(todo => {
            if (todo.date >= start && todo.date <= end) {
                filtered.push(todo);
            }
        })
        this.setState({
            timePeriod: {
                start,
                end,
            },
            filtered,
        });
    }
    handleSort(e){
        // Не добавил проверку на то, отсортированы ли данные изначально, из-за этого при отсортированных в DESC порядке данных кнопка сработает только со второго раза
        this.isFiltered = this.isFiltered.bind(this);
        let todosCopy = (this.isFiltered()) ? this.state.filtered.slice() : this.state.todos.slice();
        if ((e.target.id || e.target.parentNode.id) === 'text'){
            if (this.state.sorted.byText === ('' || 'asc')) {
                todosCopy.sort((a, b) => a.msg < b.msg ? 1 : -1); // desc
                this.setState({
                    todos: this.isFiltered() ? this.state.todos : todosCopy,
                    filtered: this.isFiltered() ? todosCopy : this.state.todos,
                    sorted: {
                        byText: 'desc',
                    },
                });
            } else {
                todosCopy.sort((a,b) => a.msg > b.msg ? 1 : -1); // asc
                this.setState({
                    todos: this.isFiltered() ? this.state.todos : todosCopy,
                    filtered: this.isFiltered() ? todosCopy : this.state.todos,
                    sorted: {
                        byText: 'asc',
                    },
                });
            }
        } else {
            if (this.state.sorted.byNumber === ('' || 'asc')){
                todosCopy.sort((a, b) => a.date < b.date ? 1 : -1); // desc
                this.setState({
                    todos: this.isFiltered() ? this.state.todos : todosCopy,
                    filtered: this.isFiltered() ? todosCopy : this.state.todos,
                    sorted: {
                        byNumber: 'desc',
                    },
                });
            } else {
                todosCopy.sort((a, b) => a.date > b.date ? 1 : -1); // asc
                this.setState({
                    todos: this.isFiltered() ? this.state.todos : todosCopy,
                    filtered: this.isFiltered() ? todosCopy : this.state.todos,
                    sorted: {
                        byNumber: 'asc',
                    },
                });
            }
        }
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
                    <Search handleChange={this.handleFilter}/>
                    <Menu 
                        todos={this.isFiltered ? this.state.filtered : this.state.todos}
                        handleSort={this.handleSort}
                        handleTimePeriod={this.handleTimePeriod}
                    />
                    <TodoList
                        todos={this.isFiltered() ? this.state.filtered : this.state.todos}
                        handleDelete={this.handleDelete}
                        handleComplete={this.handleComplete}
                    />
                </div>
            </div>
        );
    }
}

export default TodoBuilder;