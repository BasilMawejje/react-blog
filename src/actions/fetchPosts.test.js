import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureStore from "redux-mock-store";

import { fetchPosts } from "./index";
import { FETCH_POSTS } from "./types";
import { jsonPlaceholder } from "../apis/jsonPlaceholder";

describe("Fetch posts", () => {
  let httpMock;
  let store;
  beforeEach(() => {
    httpMock = new MockAdapter(jsonPlaceholder);
    const mockStore = configureStore([thunk]);
    store = mockStore({});
  });

  it("Should return all posts", () => {
    const response = {
      posts: {
        id: 1,
        title: "Sample title",
        body: "Lorem ipsum. . ."
      }
    };

    const expectedAction = [{ type: FETCH_POSTS, payload: response }];
    httpMock.onGet("/posts").reply(200, response);
    store.dispatch(fetchPosts()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
