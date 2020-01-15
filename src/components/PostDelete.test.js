import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'
import { shallowToJson } from 'enzyme-to-json';

import PostDelete from './PostDelete'

configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({posts: 
    [{ id: 1, title: 'Some post', body: 'lorem ipsum ...' }]
});

describe('PostDelete', () => {
    let wrapper; 

    beforeEach(() => {
        wrapper = shallow(
            <Provider store={store}>
                <PostDelete />
            </Provider>
        ).dive();
    });

    it('renders properly', () => { 
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})