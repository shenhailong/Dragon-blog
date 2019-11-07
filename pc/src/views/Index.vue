<template>
  <div class="wrap wrap-index">
    <NavBar current="article" />
    <div class="empty"></div>
    <div class="center-container">
      <div class="tag-wrap">
        <div @click="changeCategory(item.id)" v-for="item in category" :key="item.id" class="item">
          {{item.name}}
          </div>
      </div>
    </div>
    <main class="main-container">
      dsdasd
    </main>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import SUCCESS from '@constants/responseCode'
export default {
  components: {
    NavBar
  },
  data () {
    return {
      category: [],
      form: {
        limit: 5,
        offset: 0,
        category: ''
      }
    }
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    // 获取文章分类
    async getCategory () {
      const res = await this.$axios.get('/api/v1/category/all')
      if (res.data.code === SUCCESS) {
        this.category = res.data.data
      }
    },
    // 切换分类
    changeCategory (id) {

    }
  }
}
</script>

<style lang="scss">
@import "../scss/tools/variables.scss";

.empty{
  height: 106px;
  margin-bottom: 20px;
}
.wrap-index{

}
.center-container{
  width: 100%;
  background: #ffffff;
  position: fixed;
  top: 65px;
}
.tag-wrap{
  margin: 0 auto;
  width: 960px;
  display: flex;
  padding: 10px 0;
  .item{
    padding: 5px 20px;
    border: 1px solid #999999;
    border-radius: 10px;
    margin: 0 10px;
    cursor: pointer;
    color: $color-text-title;
    font-size: 16px;
    font-weight: 500;
    &:hover{
      color: $color-primary;
      border: 1px solid $color-primary;
    }
  }
}
.main-container{
  background: #ffffff;
  width: 960px;
  margin: 0 auto;
  min-height: 500px;
}
</style>
