<template>
  <div id="app">
    <div :class="getThemeName">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as THEME from '@store/types/theme'

export default {
  computed: {
    ...mapGetters({
      theme: THEME.GET_THEME
    }),
    getThemeName () {
      return `theme-${this.theme}`
    }
  }
}
</script>

<style lang="scss">
@import './scss/style.scss';
html{
  background: #f4f5f5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
}
</style>
