import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPosts } from '../actions'

class PostList extends React.Component{
    componentDidMount() {
        this.props.fetchPosts();
    }

    // componentDidUpdate(prevProps) {
    //     const { posts } = this.props;

    //     if(prevProps.posts !== posts) {
    //         this.props.fetchPosts();
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps) {
    //         this.props.fetchPosts();
    //     }
    // }

    renderList() {
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