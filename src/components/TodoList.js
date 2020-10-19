import React from 'react';

function TodoList(props) {
    return (
      <ul className='todo__list'>{
        props.todos.map(todo => 
            <li className={'todo'}>
                <div className={'todo__content'}>
                    <div className={'todo__text'}>
                        {todo.msg}
                    </div>
                    {todo.date && <div className='todo__date'>{todo.date}</div>}
                </div>
                <div className='todo__delete'>X</div>
            </li>
        )
      }</ul>
    );
}

export default TodoList;