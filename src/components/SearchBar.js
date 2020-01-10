import React from 'react'
import { connect } from 'react-redux'

import { fetchPosts } from '../actions'

class SearchBar extends React.Component {
    state = { 
        term: ''
     }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.term)
    }

    render(){
        return <div className='ui segment'>
            <form onSubmit={this.onFormSubmit} className='ui form'>
                <div className='field'>
                    <label>Search Posts</label>
                    <input 
                        type='text'
                        value={this.state.term}
                        onChange={e => this.setState({ term: e.target.value })}
                    />
                </div>
            </form>
        </div>
    }
}

const mapStateToProps = state => {
    return { posts: Object.values(state.posts) }
}

export default connect(mapStateToProps, { fetchPosts })(SearchBar);