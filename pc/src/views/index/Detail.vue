<template>
  <div class="wrap wrap-detail">
    <NavBar current="article" />
    <div class="empty"></div>
    <div class="center-container">
      <div v-html="contentMarkdown"></div>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import SUCCESS from '@constants/responseCode'
import SimpleMDE from 'simplemde'

export default {
  components: {
    NavBar
  },
  data () {
    return {
      detail: {},
      contentMarkdown: null
    }
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    // 获取文章分类
    async getCategory () {
      const res = await this.$axios.get(`/api/v1/article/${this.$route.params.id}`)
      if (res.data.code === SUCCESS) {
        this.detail = res.data.data
        this.contentMarkdown = SimpleMDE.prototype.markdown(res.data.data.content)
      }
    }
  }
}
</script>
