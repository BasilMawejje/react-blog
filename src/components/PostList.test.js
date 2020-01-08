import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'

import PostList from './PostList'

configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({posts: 
    [{ id: 1, title: 'Some post', body: 'lorem ipsum ...' },
    { id: 2, title: 'Sample title', body: 'sample description' }]
});

describe('PostList', () => {
    it('renders a list of items', () => {
        const wrapper = shallow(
            <Provider store={store}>
                <PostList />
            </Provider>
        );
        
        expect(wrapper.find(PostList)).toBeTruthy();
        expect(wrapper.find(PostList)).toHaveLength(1);
    });
})