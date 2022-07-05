<template>
  <div>
    <span v-for="(amountPage, index) in pageNumber" :key="index">
      <button class="btn-page" @click="handleAmountPage(amountPage)">
        {{ amountPage }}
      </button>
    </span>
    <div class="pricing-header">
      <h2>Post Management</h2>
    </div>
    <router-link to="/create" @click="showButtonCreate()"
      ><button type="button" class="btn btn-info btn-add">
        Add New
      </button></router-link
    >
    <div class="container">
      <div class="card-deck">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th v-for="column in columns" :key="column" scope="col">
                {{ column }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="(post, index) in postsOnPage" :key="post.id">
              <td>{{ index + 1 }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.body }}</td>
              <td class="buttonPost">
                <router-link
                  :to="{ name: 'posts.edit', params: { id: post.id } }"
                >
                  <button
                    class="btn btn-primary"
                    style="margin-right: 10px"
                    @click="editPost(post.id)"
                  >
                    Edit
                  </button>
                </router-link>
                <button class="btn btn-danger" @click="deletePost(post.id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ListVue",
  component: {},
  data() {
    return {
      check: true,
      amountPages: 10,
      currentPage: 1,
      postsOnPage: [],
    };
  },

  computed: {
    ...mapState(["posts", "columns", "checkCreated", "startCheck", "backPost"]),
    checkPost() {
      return this.posts;
    },
    checkPage() {
      return this.startCheck.length;
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
  created() {
    if (this.checkCreated == false) {
      this.$store.dispatch("loadPosts");
    }
  },
  watch: {
    checkPost: {
      immediate: true,
      handler() {
        this.handleAmountPage(this.currentPage);
      },
    },
    checkPage() {
      this.handleAmountPage(1);
    },

    backPost() {
      console.log("back");
    },
  },
  methods: {
    handleAmountPage(value) {
      console.log("check value ", value);
      this.currentPage = value;
      this.postsOnPage = this.posts.slice(this.startPost, this.endPost);
    },
    deletePost(id) {
      this.$swal
        .fire({
          title: "Do you want to delete?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Ok",
          denyButtonText: `Don't save`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$store.dispatch("deletePosts", id);
            this.$swal.fire("Deleted", "", "success");
          }
        });
    },
    editPost(id) {
      this.$store.dispatch("showButtonEdit");
      this.$store.dispatch("editId", id);
    },
    showButtonCreate() {
      console.log("123");
      this.$store.dispatch("showButtonCreate");
    },
  },
};
</script>

<style>
.buttonPost {
  border-bottom: none;
}
.btn-add {
  margin-bottom: 20px;
}
.table td {
  vertical-align: middle;
}
.table th:last-child {
  width: 170px;
}

.table th:not(:last-child) {
  width: 300px;
}
.table th:first-child {
  width: 50px;
}

.btn-page {
  cursor: pointer;
  padding: 8px 30px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 40px;
  border: 1px solid transparent;
  outline: 1px solid red;
  border-radius: 25px;
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
