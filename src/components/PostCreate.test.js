import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'
import { shallowToJson } from 'enzyme-to-json';

import PostCreate from './PostCreate'
import PostForm from './PostForm'

configure({ adapter: new Adapter() });

const mockStore = configureStore();
const store = mockStore({});

describe('PostCreate', () => {
    let wrapper; 

    beforeEach(() => {
        wrapper = shallow(
            <Provider store={store}>
                <PostCreate>
                    <PostForm />
                </PostCreate>
            </Provider>
        ).dive();
    });

    it('renders properly', () => { 
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
})