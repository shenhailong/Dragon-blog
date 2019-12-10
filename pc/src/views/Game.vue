<template>
  <div class="wrap wrap-game">
    <NavBar current="game" />
    <div class="empty"></div>
    <div class="main-container">
      <div class="game-list">
        <div class="item">
          <img src="" />
          <div class="title">w</div>
          <div class="tag"></div>
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
</style>
