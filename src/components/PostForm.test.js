import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import PostForm from './PostForm'

configure({ adapter: new Adapter() });

describe('<PostForm />', () => {
  let postFormWrapper
  const reducers = {
    form: formReducer
  }
  const reducer = combineReducers(reducers)
  const store = createStore(reducer)

  beforeEach(() => {
    postFormWrapper = mount(<Provider store={store} ><PostForm /></Provider>)
  })

  afterEach(() => {
    postFormWrapper.unmount()
  })

  it('has an input field to fill in with the title', () => {
    expect(postFormWrapper.find("input[name='title']").length).toEqual(1)
  })

  it('has an input field to fill in with the description', () => {
    expect(postFormWrapper.find("input[name='body']").length).toEqual(1)
  })

  it('has a button to submit the form', () => {
    expect(postFormWrapper.find('button').length).toEqual(1)
  })

  it('displays an error when the title field is left blank', () => {
    postFormWrapper.find('input').find('[name="title"]').simulate('blur')
    expect(postFormWrapper.find('.error.message').length).toEqual(1)
  })

  it('displays no errors when all the fields have been filled in', () => {
    const inputsWrapper = postFormWrapper.find('input')
    inputsWrapper.not('[type="submit"]').forEach(node => {
      node.simulate('change', { target: { value: 'asdf' } })
      node.simulate('blur')
    })
    expect(postFormWrapper.find('.error.message').length).toEqual(0)
  })
})