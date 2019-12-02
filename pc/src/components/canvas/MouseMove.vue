<template>
  <canvas id="canvas-dom" ref="canvasRef" style="position:fixed;">

  </canvas>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      canvas: null,
      ctx: null,
      effect: 1,
      base: {
        width: window.innerWidth, // 窗口宽度
        height: window.innerHeight, // 窗口高度
        n: 100,
        setColor: false, // 颜色  如果是false 则是随机渐变颜色
        bColor: '#eee', //  背景颜色
        r: 0.9, // 圆半径（好像只有效果1有效）
        o: 0.05, // 透明度
        a: 1,
        s: 20,
        color: Math.random() * 360,
        fillStyle: null, // 填充色
        y: []
      },
      p: 0,
      cx: 0,
      cy: 0,
      bx: 0,
      by: 0,
      vx: 0,
      vy: 0
    }
  },
  mounted () {
    this.baseSet()
  },
  methods: {
    // canvas基础设置
    baseSet () {
      this.canvas = document.getElementById('canvas-dom')
      this.canvasRef = this.$refs.canvasRef
      this.ctx = this.canvas.getContext('2d')
      this.canvas.width = this.base.width
      this.canvas.height = this.base.height
      this.cx = this.base.width / 2
      this.cy = this.base.height / 2
      this.begin()
    },
    //
    begin () {
      let effect = this.effect
      switch (this.effect) {
        case 1:
          this.effect1()
          break
        case 4:
          this.effect4()
          break
        case 5:
          this.effect5()
          break
      }
      this.canvas.addEventListener('mousemove', (e) => {
        let cx = e.pageX - this.$refs.canvasRef.offsetLeft
        let cy = e.pageY - this.$refs.canvasRef.offsetTop
        let w = cx
        let h = cy
        this.cx = cx
        this.cy = cy
        if (effect === 1) {
          this.base.y.push({ x: cx, y: cy, r: this.base.r, o: 1, v: 0 })
        }
        if (effect === 4) {
          if (Math.random() <= 0.5) {
            if (Math.random() <= 0.5) {
              this.bx = -10
            } else {
              this.bx = w + 10
            }
            this.by = Math.random() * h
          } else {
            if (Math.random() <= 0.5) {
              this.by = -10
            } else {
              this.by = h + 10
            }
            this.bx = Math.random() * w
          }
          this.vx = (Math.random() - 0.5) * 8
          this.vy = (Math.random() - 0.5) * 8
          this.base.y.push({ x: cx, y: cy, r: this.base.r, o: 1, v: 0, wx: this.bx, wy: this.by, vx2: this.vx, vy2: this.vy })
        }
      })
    },
    // 效果1
    effect1 () {
      let ctx = this.ctx
      if (!this.base.setColor) {
        this.base.color += 0.1
        this.base.fillStyle = `hsl(${this.base.color},100%,80%)`
      }
      this.ctx.globalAlpha = 1
      this.ctx.fillStyle = this.base.bColor
      this.ctx.fillRect(0, 0, this.base.width, this.base.height)
      for (var i = 0; i < this.base.y.length; i++) {
        ctx.globalAlpha = this.base.y[i].o
        ctx.fillStyle = this.base.fillStyle
        ctx.beginPath()
        ctx.arc(this.base.y[i].x, this.base.y[i].y, this.base.y[i].r, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
        this.base.y[i].r += this.base.r
        this.base.y[i].o -= this.base.o
        if (this.base.y[i].o <= 0) {
          this.base.y.splice(i, 1)
          i--
        }
      }
      window.requestAnimationFrame(this.effect1)
    },
    // 效果4
    effect4 () {
      let ctx = this.ctx
      if (!this.base.setColor) {
        this.base.color += 0.1
        this.base.fillStyle = `hsl(${this.base.color},100%,80%)`
      }
      ctx.globalAlpha = 1
      ctx.fillStyle = this.base.bColor
      this.ctx.fillRect(0, 0, this.base.width, this.base.height)
      for (var i = 0; i < this.base.y.length; i++) {
        ctx.globalAlpha = this.base.y[i].o
        ctx.fillStyle = this.base.bColor
        ctx.beginPath()
        ctx.shadowBlur = 20
        ctx.shadowColor = '#fff'
        this.base.y[i].vx2 += (this.cx - this.base.y[i].wx) / 1000
        this.base.y[i].vy2 += (this.cy - this.base.y[i].wy) / 1000
        this.base.y[i].wx += this.base.y[i].vx2
        this.base.y[i].wy += this.base.y[i].vy2
        this.base.y[i].o -= this.base.o / 2
        this.base.y[i].r = 10
        ctx.arc(this.base.y[i].wx, this.base.y[i].wy, this.base.y[i].r, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
        ctx.shadowBlur = 0
        if (this.base.y[i].o <= 0) {
          this.base.y.splice(i, 1)
          i--
        }
      }
      window.requestAnimationFrame(this.effect4)
    },
    // 效果5
    effect5 () {
      let ctx = this.ctx
      let p = this.p
      let cy = this.cx
      let cx = this.cy
      if (!this.base.setColor) {
        this.base.color += 0.1
        this.base.fillStyle = `hsl(${this.base.color},100%,80%)`
      }
      ctx.globalAlpha = 0.18
      ctx.fillStyle = this.base.bColor
      ctx.fillRect(0, 0, this.base.width, this.base.height)
      p += 5
      ctx.globalAlpha = 1
      ctx.fillStyle = this.base.fillStyle
      ctx.beginPath()
      ctx.shadowBlur = 20
      ctx.shadowColor = this.base.fillStyle
      ctx.arc(cx + 50 * Math.cos(p * Math.PI / 180), cy + 50 * Math.sin(p * Math.PI / 180), 10, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx + 50 * Math.cos((p + 180) * Math.PI / 180), cy + 50 * Math.sin((p + 180) * Math.PI / 180), 10, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx + 50 * Math.cos((p + 90) * Math.PI / 180), cy + 50 * Math.sin((p + 90) * Math.PI / 180), 10, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
      ctx.beginPath()
      ctx.arc(cx + 50 * Math.cos((p + 270) * Math.PI / 180), cy + 50 * Math.sin((p + 270) * Math.PI / 180), 10, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
      ctx.shadowBlur = 0
      window.requestAnimationFrame(this.effect5)
    }
  }
}
</script>
