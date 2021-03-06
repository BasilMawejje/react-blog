import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureStore from "redux-mock-store";

import { fetchPosts, fetchPost, createPost, editPost } from "./index";
import { FETCH_POSTS, FETCH_POST, CREATE_POST, EDIT_POST } from "./types";
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

  it("Should return a single post", () => {
    const response = {
      posts: {
        id: 1,
        title: "Sample title",
        body: "Lorem ipsum. . ."
      }
    };

    const expectedAction = [{ type: FETCH_POST, payload: response }];
    httpMock.onGet(`/posts/${response.posts.id}`).reply(200, response);
    store.dispatch(fetchPost(response.posts.id)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it("Should create a post", () => {
    const response = {
      posts: {
        id: 1,
        title: "Created title",
        body: "Created body"
      }
    };

    const expectedAction = [{ type: CREATE_POST, payload: response.posts }];
    httpMock
      .onPost("/posts", { id: 1, title: "Created title", body: "Created body" })
      .reply(201, { id: 1, title: "Created title", body: "Created body" });

    store
      .dispatch(
        createPost({ id: 1, title: "Created title", body: "Created body" })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });

  it("Should edit a post", () => {
    const response = {
      posts: {
        id: 1,
        title: "Edited title",
        body: "Edited body"
      }
    };

    const expectedAction = [{ type: EDIT_POST, payload: response.posts }];
    httpMock
      .onPatch(`posts/${response.posts.id}`)
      .reply(204, { id: 1, title: "Edited title", body: "Edited body" });

    store
      .dispatch(
        editPost(response.posts.id, { id: 1, title: "Edited title", body: "Edited body" })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
});