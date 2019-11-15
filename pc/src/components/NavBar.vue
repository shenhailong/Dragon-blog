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
        <div class="theme-box">
          <div class="theme-button">切换主题</div>
          <div class="theme-list">
            <div @click="onChangeTheme(item)" v-for="item in theme" :key="item" :class="['theme-' + item]" class="item"></div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as THEME from '@store/types/theme'
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
      ],
      theme: [
        'cyan',
        'blue',
        'red',
        'yellow',
        'violet'
      ]
    }
  },
  methods: {
    changePage (url) {
      this.$router.push(url)
    },
    ...mapMutations({
      onChangeTheme: THEME.UPDATE_THEME
    })
  }
}
</script>
