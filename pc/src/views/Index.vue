<template>
  <div class="wrap wrap-index">
    <NavBar />
    <main class="main-container">

    </main>
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
.main-container{
  background: #ffffff;
  width: 960px;
  margin: 0 auto;
  min-height: 1000px;
  margin-top: 20px;
}
</style>
