import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { fetchPosts } from '../actions'
import SearchBar from './SearchBar'

class PostList extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            term: '',
            posts_list: props.posts
        }
    }

    componentDidMount() {
       this.props.fetchPosts();
    }

    onSearchSubmit = term => {
        let filteredList = _.filter(this.props.posts, post => post.title.toLowerCase().includes(term) || post.title.toUpperCase().includes(term));

        this.setState({
            posts_list: filteredList
        })
    };

    renderList() {
        return this.state.posts_list.map( post => {
            return (
                <div className="item" key={post.id}>
                    <div className="content">
                            <Link to={`/posts/${post.id}`} className='header'>
                                <h2>{post.title}</h2>
                            </Link>
                        <div className="description">
                            <p>{post.body}</p>
                        </div>
                    </div>
                    <Link to={`/posts/edit/${post.id}`} className='ui button primary'>Edit</Link>
                    <Link to={`/posts/delete/${post.id}`} className='ui button negative'>Delete</Link>
                </div>
            );
        });
    }

    renderCreate() {
        return (
            <div>
                <Link to='/posts/new' className='ui button primary'>
                    Create Post
                </Link>
            </div>
        );
    }

    render() {
        return (
                <div>
                    <h1>List of Posts</h1>
                    <SearchBar onSubmit = {this.onSearchSubmit} />
                    {this.renderCreate()}
                    <div className="ui celled list">{this.renderList()}</div>
                </div>
            );
    }
}

const mapStateToProps = state => {
    return { posts: Object.values(state.posts) }
}

export default connect(mapStateToProps, { fetchPosts })(PostList);