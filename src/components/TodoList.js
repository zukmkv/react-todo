import React from 'react';

function TodoList(props) {
    const todos = props.todos;
    const listTodos = todos.map(todo => 
        <li className={'todo'}>
            <div>{todo.msg}</div>
            <div>{todo.date}</div>
        </li>
    );  
    return (
      <ul>{listTodos}</ul>
    );
}

export default TodoList;