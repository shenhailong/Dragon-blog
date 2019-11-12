<template>
  <div class="wrap wrap-index">
    <NavBar current="article" />
    <div class="empty"></div>
    <div class="center-container">
      <div class="tag-wrap">
        <div
          @click="changeCategory(item.id)"
          v-for="item in category"
          :key="item.id"
          class="item"
        >
          {{item.name}}
        </div>
      </div>
    </div>
    <main class="main-container">
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
      <div class="article-list-wrap">
        <div
          v-for="item in articleList"
          :key="item"
          class="article-list"
        >
          <div class="article-item-left">
            <div class="header">
              分类:
              <span class="tag">Css</span>
            </div>
            <div class="title">node 进阶开始了</div>
            <div class="subtitle">阅读量: （20） 发布日期：2019-10-12</div>
          </div>
          <div class="article-item-right">
            <img src="https://ss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=1084112766,2018711686&fm=74&app=80&f=GIF&size=f121,90?sec=1880279984&t=32631178b516d9f7886dad1f52d874b9" />
          </div>
        </div>
      </div>
    </mescroll-vue>
      <aside class="info-box"></aside>
    </main>
  </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import NavBar from '@components/NavBar'
import SUCCESS from '@constants/responseCode'
export default {
  components: {
    NavBar,
    'mescroll-vue': MescrollVue
  },
  data () {
    return {
      mescroll: null, // mescroll实例对象
      mescrollUp: {
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          src: './static/mescroll/mescroll-totop.png' // 回到顶部按钮的图片路径,支持网络图
        },
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
          warpId: 'dataList', // 父布局的id;
          icon: './static/mescroll/mescroll-empty.png', // 图标,支持网络图
          tip: '暂无相关数据~', // 提示
          btntext: '去逛逛 >', // 按钮,默认""
          btnClick () { // 点击按钮的回调,默认null
            alert('点击了按钮,具体逻辑自行实现')
          }
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        }
      },
      category: [], // 分类
      form: {
        limit: 5,
        offset: 0,
        category: ''
      },
      articleList: [
        1, 2, 3, 4, 5, 6, 7, 8
      ] // 文章列表
    }
  },
  mounted () {
    this.getCategory()
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
        this.category = res.data.data
      }
    },
    // 切换分类
    changeCategory (id) {

    },
    upCallback () {}
  }
}
</script>

<style lang="scss">
@import "../scss/tools/variables.scss";

.empty {
  height: 106px;
  margin-bottom: 20px;
}
.wrap-index {
  .main-container {
    width: 960px;
    margin: 0 auto;
    min-height: 500px;
    position: relative;
  }
  .article-list-wrap {
    width: 700px;
    background: #ffffff;
    .article-list {
      display: flex;
      justify-content: space-between;
      padding: 30px;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
    }

    .article-item-left {
      line-height: 35px;
      .header {
        font-size: 14px;
      }
      .title {
        font-size: 20px;
        font-weight: 800;
        color: #333333;
      }
      .subtitle {
        font-size: 12px;
      }
    }

    .article-item-right {
      img {
        height: 80px;
        width: 80px;
      }
    }
  }

  .info-box{
    width: 240px;
    background: #ffffff;
    height: 500px;
    position: absolute;
    top: 0;
    right: 0;
  }
}
.center-container {
  width: 100%;
  background: #ffffff;
  position: fixed;
  top: 64px;
  z-index: 999;
}
.tag-wrap {
  margin: 0 auto;
  width: 960px;
  display: flex;
  padding: 10px 0;
  .item {
    padding: 5px 20px;
    border: 1px solid #999999;
    border-radius: 10px;
    margin: 0 10px;
    cursor: pointer;
    color: $color-text-title;
    font-size: 16px;
    font-weight: 500;
    &:hover {
      color: $color-primary;
      border: 1px solid $color-primary;
    }
  }
}
</style>
