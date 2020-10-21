import React from 'react';
import arrows from '../img/arrows.png'

function Menu(props){
        return (
            <div className='menu'>
                <form className='menu__filter'>
                    <input
                        name='start'
                        className='input input--date-menu'
                        type='date'
                        onChange={props.handleTimePeriod}
                    />
                    <input
                        name='end'
                        className='input input--date-menu'
                        type='date'
                        onChange={props.handleTimePeriod}
                    />
                </form>
                <div className='menu__sort'>
                    <button className='btn btn--sort' id='text' onClick={props.handleSort}>
                        <img className='arrows' src={arrows} alt=''/>
                        Text
                    </button>
                    <button className='btn btn--sort' id='date' onClick={props.handleSort}>
                        <img className='arrows' src={arrows} alt=''/>
                        Date
                    </button>
                </div>
            </div>
        );
}
 
export default Menu;