<template>
  <div class="wrap-header">
    <header class="main-header">
      <div class="container">
        <div class="logo">
          <img src="../assets/img/logo.jpg" />
        </div>
        <ul class="bar">
          <li v-for="(item, index) in list" :key="index" @click="changePage(item.url)" :class="{active: current === item.value }" class="item">{{item.name}}</li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: String,
      default: 'article'
    }
  },
  data () {
    return {
      list: [
        {
          url: '/',
          name: '文章',
          value: 'article'
        },
        {
          url: '/game',
          name: '游戏案例',
          value: 'game'
        },
        {
          url: '/knowledge',
          name: '知识库',
          value: 'knowledge'
        },
        {
          url: '/about',
          name: '关于我',
          value: 'about'
        }
      ]
    }
  },
  methods: {
    changePage (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss">
@import "../scss/tools/variables.scss";
.wrap-header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.main-header{
  background: #ffffff;
  border-bottom: 1px solid #eeeeee;
  .logo{
    height: 50px;
    width: 50px;
    margin-right: 50px;
    cursor: pointer;
    img{
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
  }

  .container{
    width: 960px;
    margin: 0 auto;
    height: 64px;
    display: flex;
    justify-items: center;
    align-items: center;
  }

  .bar{
    display: flex;
    .item{
      font-size: 18px;
      font-weight: 400;
      position: relative;
      height: 64px;
      line-height: 64px;
      padding: 0 20px;
      cursor: pointer;
      &.active{
        color: $color-primary
      }
      &.active:before {
        width: 100%;
        left: 0;
      }
    }

    .item:hover{
      color: $color-primary
    }

    .item::before {
      content: "";
      position: absolute;
      top: -3px;
      left: 100%;
      width: 0;
      height: 100%;
      border-bottom: 4px solid $color-primary;
      transition: 0.1s all linear;
    }
    .item:hover::before {
      width: 100%;
      left: 0;
    }
    .item:hover ~ .item::before {
      left: 0;
    }
  }
}
</style>
