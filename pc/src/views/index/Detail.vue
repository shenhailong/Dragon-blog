<template>
  <div class="wrap wrap-detail">
    <NavBar current="article" />
    <div class="empty"></div>
    <main class="main-container">
      <div class="text-wrap" v-html="contentMarkdown">
        <!-- <div v-html="contentMarkdown"></div> -->
      </div>
      <aside class="aside-box">
        <div class="title-list">
          <div :class="{active: position == item.id}" @click="goAnchor(''+ item.id)" v-for="item in anchorList" :key="item.id" class="item">
            {{item.text}}
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
import NavBar from '@components/NavBar'
import SUCCESS from '@constants/responseCode'
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

export default {
  components: {
    NavBar
  },
  data () {
    return {
      detail: {},
      contentMarkdown: null,
      anchorList: [], // 锚点列表
      positionList: [], // 记录标题的位置
      position: ''
    }
  },
  mounted () {
    this.getCategory()
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    handleScroll () {
      const currentPosition = document.documentElement.scrollTop + 84
      for (let i = 0, len = this.positionList.length; i < len; i++) {
        if (currentPosition > this.positionList[i].position && currentPosition < this.positionList[i + 1].position) {
          this.position = this.positionList[i].id
          break
        }
      }
    },
    goAnchor (selector) {
      this.position = selector
      const anchor = document.getElementById(selector)
      document.documentElement.scrollTop = anchor.offsetTop - 64
      // console.log(anchor.offsetTop)
      // if (!window.requestAnimationFrame) {
      //   window.requestAnimationFrame = function (cb) {
      //     return setTimeout(cb, 10)
      //   }
      // }
      // var scrollTop = document.documentElement.scrollTop
      // console.log(scrollTop)
      // var step = function () {
      //   var distance = 0 - scrollTop
      //   scrollTop = scrollTop + distance / 5
      //   console.log(scrollTop)
      //   if (Math.abs(distance) <= anchor.offsetTop) {
      //     // window.scrollTo(0, anchor.offsetTop)
      //   } else {
      //     window.scrollTo(0, scrollTop)
      //     requestAnimationFrame(step)
      //   }
      // }
      // step()
    },
    // 获取文章分类
    async getCategory () {
      const res = await this.$axios.get(`/api/v1/article/${this.$route.params.id}`)
      if (res.data.code === SUCCESS) {
        this.detail = res.data.data
        this.contentMarkdown = SimpleMDE.prototype.markdown(res.data.data.content)
        let reg = /<h[1-6]\sid="[\S]*">.*<\/h[1-6]>/g // 匹配标题，需要设置锚点
        let textReg = /<[^>]*>/g // 匹配出标签中的内容
        let idReg = /"[\S]*"/g // 匹配出标签中的id
        let title = this.contentMarkdown.match(reg) || [] // 找出所有的标题
        title.forEach(item => {
          let text = item.replace(textReg, '') // 找出标题中的内容
          let id = item.match(idReg)[0].replace(/"/g, '') // 找出id
          this.anchorList.push({
            text: text,
            id: id
          })
        })
        setTimeout(() => {
          this.anchorList.forEach(item => {
            this.positionList.push({
              position: document.getElementById(item.id).offsetTop,
              id: item.id
            })
          })
        }, 1000)
        // this.$nextTick(() => {
        //   this.anchorList.forEach(item => {
        //     console.log(item)
        //     console.log(document.getElementById(item))
        //     console.log(document.getElementById(item).offsetTop)
        //     this.positionList.push({
        //       position: document.getElementById(item).offsetTop,
        //       id: item
        //     })
        //   })
        // })
      }
    }
  }
}
</script>
