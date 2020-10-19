import React from 'react';

function TodoList(props) {
    if (props.todos.length){
        return (
            <ul className='todo__list'>{
                props.todos.map(todo => 
                    <li key={todo.id} className={todo.isCompleted ? 'todo todo--completed' : 'todo'}>
                        <div className={'todo__content'} onClick={() => props.handleComplete(todo.id)}>
                            <div className={todo.isCompleted ? 'todo__text todo__text--completed' : 'todo__text'}>
                                {todo.msg}
                            </div>
                            {todo.date && <div className='todo__date'>{todo.date}</div>}
                        </div>
                        <div className='todo__delete' onClick={() => props.handleDelete(todo.id)}>X</div>
                    </li>)}
            </ul>
        );
    } else {
        return null;
    }
}

export default TodoList;