import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPosts } from '../actions'
import SearchBar from './SearchBar'

class PostList extends React.Component{
    state = {
        term: '',
        postsList: [],
    }

    componentDidMount() {
       this.props.fetchPosts()
    }

    onSearchSubmit = term => {
        const filteredList = this.props.posts.filter(post => {      
          const postData = `${post.title.toUpperCase().replace(/[0-9]/g, '')}   
          ${post.body.toUpperCase().replace(/[0-9]/g, '')}`;
          
           const inputData = term.toUpperCase();
           return postData.indexOf(inputData) > -1;
        });
        
        this.setState({ postsList: filteredList });
      };

    renderList() {
        if(this.state.postsList.length === 0 || this.state.postsList.length === this.props.posts.length - 1 
            || (this.state.postsList[0] === this.props.posts[0] && this.state.postsList.length === 1) ) {
            return this.props.posts.map( post => {
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

        if(this.state.postsList.length > 0) {
            return this.state.postsList.map( post => {
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
                    <SearchBar onChange = {this.onSearchSubmit} />
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