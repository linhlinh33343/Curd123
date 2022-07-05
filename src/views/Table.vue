<template>
  <div>
    <ListVue
      :postsOnPage="postsOnPage"
     
     
    ></ListVue>
    <span v-for="(amountPage, index) in pageNumber" :key="index">
      <button class="btn-page" @click="handleAmountPage(amountPage)">
        {{ amountPage }}
      </button>
    </span>
  </div>
</template>

<script>
import ListVue from "./ListVue.vue";
import { mapState } from "vuex";
export default {
  name: "TableVue",
  component: {ListVue},
  data() {
    return {
      amountPages: 10,
      currentPage: 1,
      postsOnPage: [],
    };
  },

  computed:{
     ...mapState(["posts"]),
     checkPost() {
      return this.posts;
        },
    startPost() {
      const startPost = (this.currentPage - 1) * this.amountPages;
      return startPost;
    },
    endPost() {
      const endPost = this.startPost + this.amountPages;

      return endPost;
    },
    postAmount() {
      let postAmount = this.posts.length;
      return postAmount;
    },
    pageNumber() {
      let pageNumber = this.postAmount / this.amountPages;
      return Math.ceil(pageNumber);
    },
  },  
  methods: {
    handleAmountPage(value) {
      console.log("check value ", value);
      this.currentPage = value;
      this.postsOnPage = this.posts.slice(this.startPost, this.endPost);
    },
  },
  watch: {
    checkPost() {
        console.log('thay doi');

        this.handleAmountPage(this.currentPage);
    },
  },
};
</script>

<style scoped>
.btn-page {
  cursor: pointer;
  padding: 8px 30px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 40px;
}
.btn-add-post {
  padding: 10px 20px;
  border: none;
  background: #198754;
  border-radius: 4px;
  cursor: pointer;
  color: #ffff;
}
</style>
