import React, { Component } from 'react';

class Search extends Component{
    render(){
        return(
            <form className={'form'}>
                <input type="text" placeholder="search todos" className={'input input--search'}/>
            </form>
        )
    }
}

export default Search;

