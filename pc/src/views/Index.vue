<template>
  <div class="wrap wrap-index">
    <NavBar current="article" />
    <MouseMove />
    <div class="empty"></div>
    <div class="center-container">
      <div class="tag-wrap">
        <div
          @click="changeCategory(item.id)"
          v-for="item in category"
          :key="item.id"
          class="item"
          :class="{active: form.categoryId === item.id }"
        >
          {{item.name}}
        </div>
      </div>
    </div>

    <main class="main-container">
      <div>
      <mescroll-vue
        ref="mescroll"
        :up="mescrollUp"
        @init="mescrollInit"
      >
        <div class="article-list-wrap">
          <div
            @click="goDetail(item.id)"
            v-for="item in articleList"
            :key="item.id"
            class="article-list"
          >
            <div class="article-item-left">
              <div class="header">
                分类:
                <span class="tag">{{item.category.name}}</span>
              </div>
              <div class="title">{{item.title}}</div>
              <div class="subtitle">阅读量: （20） 发布日期：{{item.createdAt}}</div>
            </div>
            <div class="article-item-right">
              <img
                :imgurl="item.img"
                src="../assets/img/lazy.jpg"
              />
            </div>
          </div>
        </div>
      </mescroll-vue>
      </div>
      <aside class="aside-box"></aside>
    </main>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import NavBar from '@components/NavBar'
import MouseMove from '@components/canvas/MouseMove'

import SUCCESS from '@constants/responseCode'
export default {
  components: {
    NavBar,
    MouseMove,
    'mescroll-vue': MescrollVue
  },
  data () {
    return {
      mescroll: null, // mescroll实例对象
      mescrollUp: {
        callback: this.upCallback, // 上拉回调,此处可简写;
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          src: '' // 回到顶部按钮的图片路径,支持网络图
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        }
      },
      category: [], // 分类
      form: {
        limit: 10,
        offset: 0,
        status: 'LIST',
        categoryId: ''
      },
      articleList: [] // 文章列表
    }
  },
  mounted () {
    this.getCategory()
    console.log('ddd')
    console.log(this.form.a.a)
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    // 获取文章分类
    async getCategory () {
      const res = await this.$axios.get('/api/v1/category/all')
      if (res.data.code === SUCCESS) {
        res.data.data.unshift({
          id: '',
          name: '全部'
        })
        this.category = res.data.data
      }
    },
    // 切换分类
    changeCategory (id) {
      this.articleList = []// 在这里手动置空列表,可显示加载中的请求进度
      this.form.categoryId = id
      this.form.offset = 0
      this.mescroll.resetUpScroll() // 刷新列表数据
    },
    // 获取文章
    async upCallback (page, mescroll) {
      const res = await this.$axios.get('/api/v1/article', this.form)
      if (res.data.code === SUCCESS) {
        let total = res.data.data.count
        this.form.offset += this.form.limit
        this.articleList = this.articleList.concat(res.data.data.rows)
        this.$nextTick(() => {
          mescroll.endBySize(res.data.data.rows.length, total)
        })
      }
    },
    // 跳转详情
    goDetail (id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>
