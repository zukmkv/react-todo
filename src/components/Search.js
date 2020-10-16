import React, { Component } from 'react';

class Search extends Component{
    render(){
        return(
            <form className="search">
                <input type="text" placeholder="search todos"/>
            </form>
        )
    }
}

export default Search;

