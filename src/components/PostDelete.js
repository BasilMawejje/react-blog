import React from 'react'
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions'

class PostDelete extends React.Component {
    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id)
    }

    render() {
        if(!this.props.post) {
            return <div>Loading...</div>
        }

        const { title } = this.props.post

        return (
            <div>
                <div>
                    <h1>Are you sure you want to delete this post?</h1>
                    <h5>{title}</h5>
                    <button onClick={() => this.props.deletePost(this.props.post.id)} className='ui button negative'>Delete</button>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    return { post: state.posts[id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostDelete);