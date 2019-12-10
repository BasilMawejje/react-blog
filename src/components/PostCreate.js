import React from 'react'
import { connect } from 'react-redux'
import { createPost } from '../actions/index'

import PostForm from './PostForm'

class PostCreate extends React.Component {
    onSubmit = (formValues) => {
        this.props.createPost(formValues);
    }

    render() {
        return (
            <div>
                <h1>Create Post</h1>
                <PostForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(null, { createPost })(PostCreate);