import React from 'react';

function TodoList(props) {
    if (props.todos.length){
        return (
            <ul className='todo__list'>{
                props.todos.map(todo => 
                    <li key={todo.id} className={'todo'}>
                        <div className={'todo__content'}>
                            <div className={'todo__text'}>
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