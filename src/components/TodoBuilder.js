import React, { useState } from 'react';
import TodoList from './TodoList';
import Search from './Search';
import Menu from './Menu';

function TodoBuilder(){
    const getTodosFromStorage = () => JSON.parse(sessionStorage.getItem('todos'));
    const saveTodosInStorage = todos => sessionStorage.setItem('todos', JSON.stringify(todos));
    const [todos, setTodos] = useState((getTodosFromStorage() || []));
    const [msg, setMsg] = useState('');
    const [date, setDate] = useState('');
    const [msgIsEmpty, setMsgIsEmpty] = useState(false);
    const [sorted, setSorted] = useState({byNumber: 'desc', byText: 'desc'});
    const [filterBy, setFilterBy] = useState('');
    const maxPossibleDate = '9999-12-31';
    const [timePeriod, setTimePeriod] = useState({start: '', end: '9999-12-31'});

    const shouldBeFiltered = () => {
        if (filterBy ||
            timePeriod.start !== '' || 
            timePeriod.end !== maxPossibleDate){
            return true;
        } else {
            return false;
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (msg.trim()){
                let todosCopy = [...todos];
                todosCopy.push(
                    {   
                        msg: msg,
                        date: date, 
                        id: Date.now(),
                        isCompleted: false,
                    });
                saveTodosInStorage(todosCopy);
                setTodos(todosCopy);
        } else {
            setMsgIsEmpty(true);
        }
    }
    const handleChange = e => {
        if (e.target.name === 'msg') {
            setMsg(e.target.value);
        } else if (e.target.name === 'date'){
            setDate(e.target.value);
        }
    }
    const handleComplete = id => {
        let todosCopy = todos.map(todo => {
            if (todo.id === id) {
                todo.isCompleted = !todo.isCompleted;
            }
            return todo;
        });
        saveTodosInStorage(todosCopy);
        setTodos(todosCopy);
    }
    const handleDelete = id => {
        const todosCopy = todos.filter(item => item.id !== id);
        saveTodosInStorage(todosCopy);
        setTodos(todosCopy);
    }
    const handleFilter = () => {
        let filtered = todos.filter(todo => {
            return (todo.msg.includes(filterBy) && (todo.date >= timePeriod.start && todo.date <= timePeriod.end));
        });
        if (sorted.byText === 'asc') {
            filtered.sort((a,b) => a.msg > b.msg ? 1 : -1); // asc
        } else if (sorted.byText === 'desc') {
            filtered.sort((a, b) => a.msg < b.msg ? 1 : -1); // desc
        } else if (sorted.byNumber === 'asc') {
            filtered.sort((a, b) => a.date > b.date ? 1 : -1); // asc
        } else if (sorted.byNumber === 'desc') {
            filtered.sort((a, b) => a.date < b.date ? 1 : -1); // desc
        }
        return filtered;
    }
    const handleSearch = e => {
        setFilterBy(e.target.value);
    }
    const handleTimePeriod = e => {
        e.persist();
        const start = e.target.name === 'start' ? e.target.value : timePeriod.start;
        const end = e.target.name === 'end' 
            ? (e.target.value !== '' ? e.target.value : maxPossibleDate) 
            : timePeriod.end;
        setTimePeriod({ start, end });
    }
    const handleSort = e => {
        // Не добавил проверку на то, отсортированы ли данные изначально, из-за этого при отсортированных в DESC порядке данных в первый раз произойдет рендер туду в том же порядке
        let todosCopy = (shouldBeFiltered() ? handleFilter() : [...todos]);
        if ((e.target.id || e.target.parentNode.id) === 'text'){
            if (sorted.byText === 'asc') {
                todosCopy.sort((a, b) => a.msg < b.msg ? 1 : -1); // desc
                setSorted({
                    byText: 'desc',
                    byNumber: sorted.byNumber,
                });
            } else {
                todosCopy.sort((a,b) => a.msg > b.msg ? 1 : -1); // asc
                setSorted({
                    byText: 'asc',
                    byNumber: sorted.byNumber,
                });
            }
        } else {
            if (sorted.byNumber === 'asc'){
                todosCopy.sort((a, b) => a.date < b.date ? 1 : -1); // desc
                setSorted({
                    byNumber: 'desc',
                    byText: sorted.byText,
                });
            } else {
                todosCopy.sort((a, b) => a.date > b.date ? 1 : -1); // asc
                setSorted({
                    byNumber: 'asc',
                    byText: sorted.byText,
                });
            }
        }
        if (!shouldBeFiltered()){
            setTodos(todosCopy);
        }
        return todosCopy;
    }
        return (
            <div>
                <div className='todoBuilder'>
                    <form className='form'>
                        <input 
                            name="msg"
                            className={msgIsEmpty ? 'input input--empty' : 'input'}
                            type="text"
                            onChange={handleChange}
                        />
                        <input 
                            name="date"
                            className='input input--date'
                            type="date"
                            onChange={handleChange}
                        />
                        <button 
                            onClick={handleSubmit}
                            className='btn'
                        ><b>Add</b></button>
                    </form>
                    <Search handleChange={handleSearch}/>
                    <Menu 
                        todos={shouldBeFiltered() ? handleFilter() : todos}
                        handleSort={handleSort}
                        handleTimePeriod={handleTimePeriod}
                    />
                    <TodoList
                        todos={shouldBeFiltered() ? handleFilter() : todos}
                        handleDelete={handleDelete}
                        handleComplete={handleComplete}
                    />
                </div>
            </div>
        );
}
export default TodoBuilder;