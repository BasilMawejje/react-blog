import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SearchBar from './SearchBar'

configure({ adapter: new Adapter() });

describe('SearchBar', () => {
    const onFormSubmit = jest.fn();
    const onChange = jest.fn();

    let wrapper; 

    beforeEach(() => {
        wrapper = shallow(<SearchBar onChange={onFormSubmit} />);
    });

    it('calls the onFormSubmit function', () => {
        expect(onFormSubmit).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();
        wrapper.find('input').simulate('change', { target: { value: 'mocky' } });
        expect(wrapper.state().term).toBe('mocky');
    });
})