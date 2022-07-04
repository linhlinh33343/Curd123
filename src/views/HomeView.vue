<template>
  <div class="product-info">
        <div class="pricing-header px-3 py-3 md-5 pb-md-4 nx-auto text-center">
            <h2 class="display-5">Post Infomation</h2>
            <router-link class="linkrouter" to="/list">Back</router-link>
        </div>
        <div>
        <div class="container">
            <form @submit.prevent="save()">
                <div class="form-group row"> 
                    <label for="inputPassword" class="col-sm-3 col-form-label" >Post title</label>
                    <div class="col-sm-9">
                        <input  type="text" class="form-control" :class="[getFiledInput.error.title?'is-invalid':'']" 
                        v-model="getFiledInput.title"
                        @input="isValidator('title')"
                        
                        />
                        <div class="invalid-feedback">{{getFiledInput.error.title}}</div>
                    </div>
                </div>
                <div class="form-group row"> 
                    <label for="inputPassword" class="col-sm-3 col-form-label">Post body</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" :class="[getFiledInput.error.body?'is-invalid':'']"
                        v-model="getFiledInput.body"
                        @input="isValidator('body')"
                      
                        />
                        <div class="invalid-feedback">{{getFiledInput.error.body}}</div>
                    </div>
                </div>
               
                <div class="form-group row"> 
                    <label for="inputPassword" class="col-sm-3 col-form-label"></label>
                    <div class="col-sm-9 text-left">
                        <button type="submit" v-show="!isShowButton"  class="btn btn-primary">Save</button> &nbsp;
                        <button type="reset" v-show="!isShowButton" class="btn btn-danger" @click="clickCancel">Cancel</button>
                        <button type="button" v-show="isShowButton" class="btn btn-success" @click="editPost()">Update</button>
                    </div>
                </div>
                
            </form>
        </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters,mapState } from "vuex";
import { v4 as uuidv4 } from 'uuid';
export default {

  name: 'HomeView',
  data(){
    return{
        newPost:{}
    }
  },
  computed: {
    ...mapState(['isShowButton','postEditId','posts']),
    ...mapGetters([ "getFiledInput",'isControlInputValid']),
  },
  components: {

  },
  created(){
      
      if(this.postEditId){
        console.log('sửa');
          this.getPost(this.postEditId)
      }else{
        console.log('them');
          
      }
  },
  methods:{
    isValidator(name){
        if (name == "title") {
        this.$store.dispatch("validate", "title");

      } else if (name == "body") {
        this.$store.dispatch("validate", "body");
      } else {
        this.$store.dispatch("validate", "title");
        this.$store.dispatch("validate", "body");
      }
      if (!this.isControlInputValid) {
    
        return false;
      } else {
       
        return true;
      }
       
    },
    save(){
        if(!this.isValidator()){
            console.log('co loi');
            return 
        }else{
            let newPost={
                id:uuidv4(),
                title : this.getFiledInput.title,
                body : this.getFiledInput.body,
            } 
            this.$store.dispatch('addPost',newPost)
            this.$router.push({name:"list"})
            this.getFiledInput.title='',
            this.getFiledInput.body=''

        }
    },
    clickCancel(){
          this.getFiledInput.title='',
          this.getFiledInput.body=''
    },
    getPost(id){
        this.posts.forEach(element => {
            if(element.id==id){
              this.getFiledInput.title=element.title
              this.getFiledInput.body=element.body
              
            }
        });
    },
    editPost(){
      if(!this.isValidator()){
            
            return 
        }else{
            let newPost={
                id:this.postEditId,
                title : this.getFiledInput.title,
                body : this.getFiledInput.body,
            } 
            this.getFiledInput.title=''
            this.getFiledInput.body=''
            this.$store.dispatch('updatePost',newPost)
            this.$router.push({name:"list"})
            
        }

      
    }


  }
}
</script>
<style>
 

</style>
