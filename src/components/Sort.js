import React from 'react';
import arrows from '../img/arrows.png'

function Sort(props){
    if (props.todos.length){
        return (
            <div className='sortMenu'>
                <button className='btn btn--sort' id='text' onClick={props.handleSort}>
                    <img className='arrows' src={arrows} alt=''/>
                    Text
                </button>
                <button className='btn btn--sort' id='date' onClick={props.handleSort}>
                    <img className='arrows' src={arrows} alt=''/>
                    Date
                </button>
            </div>
        );
    } else {
        return null;
    }
}
 
export default Sort;