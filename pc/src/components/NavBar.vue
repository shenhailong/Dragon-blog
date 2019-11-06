<template>
  <header class="main-header">
    <div class="container">
      <div class="logo">
        <img src="../assets/img/logo.jpg" />
      </div>
      <ul class="bar">
        <li class="item active">文章</li>
        <li class="item">游戏案例</li>
        <li class="item">知识库</li>
        <li class="item">关于我</li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="scss">
@import "../scss/tools/variables.scss";
.main-header{
  background: #ffffff;
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
      top: 0;
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
