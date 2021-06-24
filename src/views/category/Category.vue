<template>
  <div class="wrapper">
    <ul>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>11</li>
      <li>2</li>
      <li>11</li>
      <li>11</li>
      <li>13</li>
      <li>141</li>
      <li>11</li>
      <li>151</li>
      <li>151</li>
      <li>11</li>
      <li>161</li>
      <li>171</li>
         <li>13</li>
      <li>141</li>
      <li>11</li>
      <li>151</li>
      <li>151</li>
      <li>11</li>
      <li>161</li>
      <li>171</li>
         <li>13</li>
      <li>141</li>
      <li>11</li>
      <li>151</li>
      <li>151</li>
      <li>11</li>
      <li>161</li>
      <li>171</li>
         <li>13</li>
      <li>141</li>
      <li>11</li>
      <li>151</li>
      <li>151</li>
      <li>11</li>
      <li>161</li>
      <li>171</li>
         <li>13</li>
      <li>141</li>
      <li>11</li>
      <li>151</li>
      <li>151</li>
      <li>11</li>
      <li>161</li>
      <li>171</li>
         <li>13</li>
      <li>141</li>
      <li>11</li>
      <li>151</li>
      <li>151</li>
      <li>11</li>
      <li>161</li>
      <li>171</li>
         <li>13</li>
      <li>141</li>
      <li>11</li>
      <li>151</li>
      <li>151</li>
      <li>11</li>
      <li>161</li>
      <li>171</li>
         <li>13</li>
      <li>141</li>
      <li>11</li>
      <li>151</li>
      <li>151</li>
      <li>11</li>
      <li>161</li>
      <li>171</li>
         <li>13</li>
      <li>141</li>
      <li>11</li>
      <li>151</li>
      <li>151</li>
      <li>11</li>
      <li>161</li>
      <li>171</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
    name: "Category",
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'), {
        probeType: 3,      //滚动位置监控。0、1不监控。2监控。但只在手指滑动时侦测。3完全监控
        click: true,
        pullUpLoad: true    //上拉事件加载
      }),

      this.scroll.on('scroll', (position) => {
        // console.log(position);
      })

       this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多');
        setTimeout(() => {
          this.scroll.finishPullUp()
        },2000)
      })
    }

  }
</script>

<style scoped>
  .wrapper {
    height: 200px;
    background-color: greenyellow;
    overflow: hidden;
  }
</style>
