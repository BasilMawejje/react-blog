import React from 'react'

class SearchBar extends React.Component {
    state = { 
        term: ''
     }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onChange(this.state.term)
    }

    render(){
        return <div className='ui segment'>
            <form onChange={this.onFormSubmit} className='ui form'>
                <div className='field'>
                    <label>Search Posts</label>
                    <input 
                        type='search'
                        placeholder='Search Posts...'
                        value={this.state.term}
                        onChange={e => this.setState({ term: e.target.value })}
                    />
                </div>
            </form>
        </div>
    }
}

export default SearchBar;