import React from 'react';

function Search(props){
    return (
        <form className={'form'}>
            <input type="text" placeholder="search todos" className={'input input--search'} onChange={props.handleChange}/>
        </form>
    )
}

export default Search;

