import { 
    FETCH_POSTS,
    FETCH_POST,
    CREATE_POST,
    EDIT_POST,
    DELETE_POST
 } from './types'
import { jsonPlaceholder } from '../apis/jsonPlaceholder'

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    
    dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const createPost = formValues => async dispatch => {
    const response = await jsonPlaceholder.post('/posts', formValues);

    dispatch({ type: CREATE_POST, payload: response.data });
};

export const fetchPost = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/posts/${id}`);

    dispatch({ type: FETCH_POST, payload: response.data });
};

export const editPost = (id, formValues) => async dispatch => {
    const response = jsonPlaceholder.patch(`/posts/${id}`, formValues);

    dispatch({ type: EDIT_POST, payload: response.data });
};

export const deletePost = id => async dispatch => {
    await jsonPlaceholder.delete(`/posts/${id}`);

    dispatch({ type: DELETE_POST, payload: id });
};