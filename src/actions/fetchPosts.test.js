import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { fetchPosts } from './index'
import { FETCH_POSTS } from './types'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store

describe('fetchPosts action', () => {
  beforeEach(() => {
    moxios.install()
    store = mockStore({ posts: {} })
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetches posts from an external api', () => {
    const response = [
      {
          title: 'Sample title 1',
          body: 'Sample post 1',
          id: 1
      },
      {
          title: 'Sample title 2',
          body: 'Sample post 2',
          id: 2
      }
    ]

  moxios.stubRequest('http://localhost:3001/posts', {
    status: 200,
    response: {
      posts: response
    }
  })

  const expectedActions = [
    { type: FETCH_POSTS, payload: { posts: response } }
    ]
    store.dispatch(fetchPosts())
    .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
