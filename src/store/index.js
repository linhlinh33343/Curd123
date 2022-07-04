
import { createStore } from 'vuex'

import axios from 'axios'
const store = createStore({
    state: {
      checkCreated:false,
      isShowButton:false,
      postEditId:'',
      posts:[],
      columns: [ 'id', 'title', 'body', 'Handle'],
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
        }
        else this.error[name] = "";
          return true;
      },
    }, 
 
    },getters:{
        getdata:(state)=>(state.posts),
        getFiledInput: (state) => state.filed,
        isControlInputValid: (state) => {
          if (state.filed.error.title !== "") return false;
          if (state.filed.error.body !== "") return false;
          return true;
        },
    },
  
    actions: {
       loadPosts({commit}){
            axios
                .get('https://jsonplaceholder.typicode.com/posts?_limit=5')
                .then((res) =>{ 
                    commit('setPost', res.data)
                })
       },
       validate({ commit },name) {
          commit('validator',name)
      },
     async addPost({commit},data){
        try {
          const res  = await axios.post('https://jsonplaceholder.typicode.com/posts/',{data})
          console.log(res);
          commit('addPost',data)
        } catch (error) {
          console.log(error);
        }
      },
      toggleCheckCreate({commit}){
        commit('toggleCheckCreate')
      },
      deletePosts({commit},id){
        commit('deletePosts',id)
      },
      showButtonEdit({commit}){
        commit('showButtonEdit')
      },
      showButtonCreate({commit}){
        commit('showButtonCreate')
      },
      editId({commit},id){
        commit('editId',id)
      },
      updatePost({commit},newPost){
        commit('updatePost',newPost)
      },
      toggleCheckCreated({commit}){
        commit('toggleCheckCreated')
      }
     

    },
    mutations: {
        setPost(state,data){
            state.posts=data;
           
        },
        validator(state,name){
          state.filed.validate(name)
        },
        addPost(state,data){
          
          state.posts.unshift(data);
    
        },
        deletePosts(state,id){
          state.posts=state.posts.filter(post=>post.id!==id)
        },
        showButtonEdit(state){
          state.isShowButton=true;
        },
        showButtonCreate(state){
          state.isShowButton=false;
        },
        editId(state,id){
          state.postEditId=id
        },
        updatePost(state,newPost){
          state.posts.forEach((post,index)=>{
            if(post.id==newPost.id){
              state.posts[index]=newPost;
            }
          })

        },
        toggleCheckCreated(state){
          state.checkCreated=true;
        }
       
    }
  });
  
export default store;