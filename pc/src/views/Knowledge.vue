<template>
  <div class="wrap wrap-game">
    <NavBar current="knowledge" />
    <div class="empty"></div>
    <div class="main-container">
      <div class="game-list">
        <div v-for="item in list" :key="item" class="item">
          <img src="http://dragon-blog.oss-cn-beijing.aliyuncs.com/91ea05341f310e200a64e20dc3a6a065.jpg" />
          <div class="title">这是一个小游戏</div>
          <!-- <div class="cover"></div> -->
          <div class="light"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
export default {
  components: {
    NavBar
  },
  data () {
    return {
      list: [1, 2, 3, 4, 5]
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
