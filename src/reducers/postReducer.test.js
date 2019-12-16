import postsReducer from './postsReducer'
import { FETCH_POSTS } from '../actions/types'

describe('reduces posts', () => {
  it('defaults to empty list posts if none are fetched', () => {
    expect(postsReducer([], {})).toEqual([]);
  });

  it('reduces posts after getting them', () => {
    expect(
      postsReducer([], {
        type: FETCH_POSTS,
        payload: [{ id: 1, title: 'Some post', body: 'lorem ipsum ...' }]
      })
    ).toEqual({"1": {"body": "lorem ipsum ...", "id": 1, "title": "Some post"}})
  });
});