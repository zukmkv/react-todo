import React from 'react';

function TodoList(props) {
    return (
      <ul className='todo__list'>{
        props.todos.map((todo,index) => 
            <li key={index+todo.msg} className={'todo'}>
                <div className={'todo__content'}>
                    <div className={'todo__text'}>
                        {todo.msg}
                    </div>
                    {todo.date && <div className='todo__date'>{todo.date}</div>}
                </div>
                <div className='todo__delete' onClick={this.handleClick}>X</div>
            </li>
        )
      }</ul>
    );
}

export default TodoList;