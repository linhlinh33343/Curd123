<template>
    <div>
     <div class="pricing-header " >
      <h2>Post Management</h2>
    </div>
      <router-link to="./" @click="showButtonCreate()">Add new</router-link>
      <div class="container">
        <div class="card-deck">
            <table class="table table-bordered">
              <thead>
                <tr >
                  <th v-for="column in columns" :key="column" scope="col">{{column}}</th> 
                </tr>
              </thead>
              <tbody>
                <tr scope="row" v-for="(post,index) in posts " :key="post.id" >
                  <td>{{index+1}}</td>
                  <td>{{post.title}}</td>
                  <td>{{post.body}}</td>
                  <td class="buttonPost">
                    <router-link :to="{name:'posts.edit',params:{id:post.id}}">
                    <button class="btn btn-primary "  style="margin-right:10px" @click="editPost(post.id)">Edit</button>
                    </router-link>
                    <button class="btn btn-danger" @click="deletePost(post.id)" >Delete</button>
                  </td>
                </tr>
              
              </tbody>
            </table>
        </div>
    </div>
    
   
  </div>
  
</template>

<script>

import { mapState} from 'vuex'
export default {
  name:"ListVue",
  data(){
    return {
      newPost:[],
      check:true,
     
    }
  },
  computed:{
   
    ...mapState(['posts','columns','checkCreated']),
    checkPost () {
      return this.posts
      
    }
  },
  created(){
      if(this.checkCreated==false){
        this.$store.dispatch('loadPosts');
      }
        
  },
  watch:{
    checkPost(){
       this.$store.dispatch('toggleCheckCreated');
    }
    
  },
  methods:{
    deletePost(id){
          this.$swal.fire({
            title: 'Do you want to delete?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Ok',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.$store.dispatch('deletePosts',id);
              this.$swal.fire('Deleted','','success')
          
            }
           
          })
    },
    editPost(id){
        this.$store.dispatch('showButtonEdit')
        this.$store.dispatch('editId',id)

    },
    showButtonCreate(){
        this.$store.dispatch('showButtonCreate')
        
    }
  }
}
</script>

<style>
    .buttonPost{
      display: flex;
      border-bottom: none;
    }
</style>