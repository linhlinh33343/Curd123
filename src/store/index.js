import { createStore } from "vuex";

import axios from "axios";
const store = createStore({
  state: {
    checkCreated: false,
    isShowButton: false,
    postEditId: "",
    startCheck: [],
    posts: [],
    backPost: false,
    columns: ["id", "title", "body", "Handle"],
    filed: {
      title: "",
      body: "",
      error: {
        title: "",
        body: "",
      },
      validate: function (name) {
        if (this[name] === "") {
          this.error[name] = "This field is required!";
          return false;
        } else this.error[name] = "";
        return true;
      },
    },
  },
  getters: {
    getdata: (state) => state.posts,
    getFiledInput: (state) => state.filed,
    isControlInputValid: (state) => {
      if (state.filed.error.title !== "") return false;
      if (state.filed.error.body !== "") return false;
      return true;
    },
  },

  actions: {
    loadPosts({ commit }) {
      axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
        commit("setPost", res.data);
      });
    },
    validate({ commit }, name) {
      commit("validator", name);
    },
    async addPost({ commit }, data) {
      try {
        const res = await axios.post(
          "https://jsonplaceholder.typicode.com/posts/",
          { data }
        );
        console.log(res);
        commit("addPost", data);
      } catch (error) {
        console.log(error);
      }
    },
    toggleCheckCreate({ commit }) {
      commit("TOGGLE_CHECK_CREATE");
    },
    deletePosts({ commit }, id) {
      commit("DELETE_POSTS", id);
    },
    showButtonEdit({ commit }) {
      commit("SHOW_BUTTON_EDIT");
    },
    showButtonCreate({ commit }) {
      commit("SHOW_BUTTON_CREATE");
    },
    editId({ commit }, id) {
      commit("EDIT_ID", id);
    },
    updatePost({ commit }, newPost) {
      commit("UPDATE_POST", newPost);
    },
    toggleCheckCreated({ commit }) {
      commit("TOGLLE_CHECK_CREATED");
    },
    backPost({ commit }) {
      commit("BACK_POST");
    },
  },
  mutations: {
    setPost(state, data) {
      state.posts = data;
    },
    validator(state, name) {
      state.filed.validate(name);
    },
    addPost(state, data) {
      state.posts.unshift(data);
      state.startCheck.push(1);
      console.log(state.startCheck);
    },
    DELETE_POSTS(state, id) {
      state.posts = state.posts.filter((post) => post.id !== id);
    },
    SHOW_BUTTON_EDIT(state) {
      state.isShowButton = true;
    },
    SHOW_BUTTON_CREATE(state) {
      state.isShowButton = false;
    },
    EDIT_ID(state, id) {
      state.postEditId = id;
    },
    UPDATE_POST(state, newPost) {
      state.posts.forEach((post, index) => {
        if (post.id == newPost.id) {
          state.posts[index] = newPost;
        }
      });
    },
    TOGLLE_CHECK_CREATED(state) {
      state.checkCreated = true;
    },
    BACK_POST(state) {
      state.backPost = !state.backPost;
    },
  },
});

export default store;
