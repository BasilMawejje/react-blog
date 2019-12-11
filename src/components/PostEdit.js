import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchPost, editPost } from '../actions'
import PostForm from './PostForm'

class PostEdit extends React.Component {
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editPost(this.props.match.params.id, formValues);
    };
    
    render() {
        if(!this.props.post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h1>Edit Post</h1>
                <PostForm initialValues={_.pick(this.props.post, 'title', 'body')} onSubmit={this.onSubmit}/>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return { post: state.posts[id] }
}

export default connect(mapStateToProps, { fetchPost, editPost })(PostEdit);