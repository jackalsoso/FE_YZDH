<template>
  <div class="content">
    <loading v-if="loadingShow" :process="process" @done="done" />

    <div id="imglist" style="width:0;height:0;overflow:hidden;"></div>
    <img class="logo" src="@/static/img/logo.png" alt="">
    <div class="content-bg">
      <!-- <div class="demo"></div> -->

      <div class="click-box" :style="{top:`${pixels.banner1[0]}px`,left:`${pixels.banner1[1]}px`,width:`${pixels.banner1[2]}px`,height:`${pixels.banner1[3]}px`}" @click="clickHandle(1)" />
      <div class="click-box" :style="{top:`${pixels.banner2[0]}px`,left:`${pixels.banner2[1]}px`,width:`${pixels.banner2[2]}px`,height:`${pixels.banner2[3]}px`}" @click="clickHandle(2)" />
      <div class="click-box" :style="{top:`${pixels.banner3[0]}px`,left:`${pixels.banner3[1]}px`,width:`${pixels.banner3[2]}px`,height:`${pixels.banner3[3]}px`}" @click="clickHandle(3)" />

      <!-- 山 -->
      <img class="hill-1 animate2 dur-1" src="@/static/img/hill_1.png" alt="">
      <img class="hill-2 animate3 dur-2" src="@/static/img/hill_2.png" alt="">
      <img class="hill-3 animate3 dur-3" src="@/static/img/hill_3.png" alt="">
      <img class="hill-4 animate2 dur-4" src="@/static/img/hill_4.png" alt="">
      <img class="hill-5 animate2 dur-5" src="@/static/img/hill_5.png" alt="">
      <img class="hill-6 animate3 dur-6" src="@/static/img/hill_6.png" alt="">
      <img class="hill-7 animate2 dur-7" src="@/static/img/hill_7.png" alt="">
      <!-- 蒙板 -->
      <div class="mask-1"></div>
      <div class="mask-2"></div>
      <div class="mask-3"></div>
      <div class="mask-4"></div>
      <div class="mask-5"></div>
      <!-- 叶子 -->
      <img class="leaf-l1 animate0" src="@/static/img/leafl_1.png" alt="">
      <img class="leaf-l2 animate00" src="@/static/img/leafl_2.png" alt="">
      <img class="leaf-l3 animate000" src="@/static/img/leafl_3.png" alt="">
      <img class="leaf-r1 animate1" src="@/static/img/leafr_1.png" alt="">
      <img class="leaf-r2 animate11" src="@/static/img/leafr_2.png" alt="">
      <!-- 水 -->
      <img class="wave-1 animate6" src="@/static/img/wave_1.png" alt="">
      <img class="wave-2 animate5" src="@/static/img/wave_2.png" alt="">
      <img class="wave-3 animate6" src="@/static/img/wave_3.png" alt="">
      <img class="wave-4 animate5" src="@/static/img/wave_4.png" alt="">
      <img class="boat animate4" src="@/static/img/boat.png" alt="">
      <!-- banner -->
      <div ref="banner1" class="banner-1" :class="bannerIndex === 0? 'active' : ''">
        <div class="rope"></div>
        <img v-show="bannerIndex === 0" class="picture" src="@/static/img/banner_1.png" alt="">
        <img v-show="bannerIndex !== 0" class="picture" src="@/static/img/banner_1s.png" alt="">
        <span v-show="bannerIndex === 0" class="banner-txt">CULTURE&ATTACTIONS</span>
        <span v-show="bannerIndex !== 0" class="banner-txt">CULTURE <br>&ATTACTIONS</span>
      </div>
      <div ref="banner2" class="banner-1 banner-2" :class="{ 'active': bannerIndex === 1, 'top': bannerIndex === 2 }">
        <div class="rope"></div>
        <img v-show="bannerIndex === 1" class="picture" src="@/static/img/banner_3.png" alt="">
        <img v-show="bannerIndex !== 1" class="picture" src="@/static/img/banner_3s.png" alt="">
        <span v-show="bannerIndex === 1" class="banner-txt">DIM SUM BREAKFAST</span>
        <span v-show="bannerIndex !== 1" class="banner-txt">DIM SUM BREAKFAST</span>
      </div>
      <div ref="banner3" class="banner-1 banner-3" :class="{ 'active': bannerIndex === 2, 'top': bannerIndex === 1 }">
        <div class="rope"></div>
        <img v-show="bannerIndex === 2" class="picture" src="@/static/img/banner_2.png" alt="">
        <img v-show="bannerIndex !== 2" class="picture" src="@/static/img/banner_2s.png" alt="">
        <span v-show="bannerIndex === 2" class="banner-txt">NIGHT VIEW&HOT SPRING</span>
        <span v-show="bannerIndex !== 2" class="banner-txt">NIGHT VIEW<br>&HOT SPRING</span>
      </div>
    </div>
  </div>
</template>

<script>
import { modules } from '@/common/imageList.js'
import loading from '@/components/loading.vue';
export default {
  name: 'animateIndex',
  components: {
    loading
  },
  data(){
    return{
      loadingShow:true,
      bannerIndex: 0,
      timer: null,
      imagesList: modules,
      imageCount: 0, // 图片数
      loadCount: 0,  // 已经加载的图片数？
      pixels:{
        banner1:[],
        banner2:[],
        banner3:[]
      }
    }
  },
  computed: {
    process() {
      if (!this.imageCount) return 0;
      let value = Math.floor((this.loadCount / this.imageCount) * 100);
      return value;
    }
  },
  mounted(){
    this.hanlderLoading()
  },
  methods:{
    calcPixels(){
      let _arr = [1,2,3]
      for(let v of _arr){
        let _d = this.$refs[`banner${v}`]
        this.pixels[`banner${v}`] = [_d.offsetTop, _d.offsetLeft, _d.offsetWidth, _d.offsetHeight]
      }
    },
    clickHandle(val){
      this.$router.push({path:'/detail',query:{id:val}})
    },
    hanlderLoading() {
      this.imageCount = this.imagesList.length;
      const _that = this;
      this.imagesList.forEach((element) => {
        const url = require('@/static/' + element + '.png');
        var img = document.createElement('img');
        img.style.background = `url(${url})`;
        document.getElementById('imglist').appendChild(img);
        img.src = url;
        img.onload = function() {
          _that.loadCount++;
        };
      });
    },
    start(){
      this.timer = setInterval(() => {
        if(this.bannerIndex >= 2) this.bannerIndex = -1
        this.bannerIndex++
        this.$nextTick(()=>{
          setTimeout(()=>{
            this.calcPixels()
          },500)
        })
      },10000)
    },
    done(){
      this.loadingShow = !this.loadingShow
      this.calcPixels()
      this.start()
    }
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
  .content{
    height: 100%;
    position: relative;
    .logo{
      width: 108px;
      height: auto;
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translate(-50%);
      z-index: 3;
    }
    .content-bg{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      .click-box{
        position: absolute;
        z-index:99;
      }
      .demo{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url(../../static/img/mask-2.jpg) no-repeat;
        background-size: 100% auto;
        z-index: 90;
        opacity: 0.5;
      }
      .hill-1{
        width: 163px;
        height: auto;
        position: absolute;
        left: -60px;
        top: 150px;
        z-index: 1;
      }
      .hill-2{
        width: 292px;
        height: auto;
        position: absolute;
        right: -90px;
        top: 190px;
        z-index: 1;
      }
      .hill-3{
        width: 125px;
        height: auto;
        position: absolute;
        right: -20px;
        top: 250px;
        z-index: 1;
      }
      .hill-4{
        width: 200px;
        height: auto;
        position: absolute;
        left: 0;
        top: 300px;
        z-index: 1;
      }
      .hill-5{
        width: 200px;
        height: auto;
        position: absolute;
        left: -90px;
        top: 400px;
        z-index: 51;
      }
      .hill-6{
        width: 200px;
        height: auto;
        position: absolute;
        right: -50px;
        top: 370px;
        z-index: 51;
      }
      .hill-7{
        width: 278px;
        height: auto;
        position: absolute;
        left: -40px;
        top: 440px;
        z-index: 61;
      }
      .mask-1{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url(../../static/img/mask_1.png) no-repeat;
        background-size: 100% auto;
        z-index: 90
      }
      .mask-2{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url(../../static/img/mask_2.png) no-repeat;
        background-size: 100% auto;
        z-index: 80
      }
      .mask-3{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url(../../static/img/mask_3.png) no-repeat;
        background-size: 100% auto;
        z-index: 70
      }
      .mask-4{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url(../../static/img/mask_4.png) no-repeat;
        background-size: 100% auto;
        z-index: 60
      }
      .mask-5{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url(../../static/img/mask_5.png) no-repeat;
        background-size: 100% auto;
        z-index: 50
      }
      .leaf-l1{
        width: 105px;
        height: auto;
        position: absolute;
        left: 0px;
        top: 20px;
        z-index: 89;
      }
      .leaf-l2{
        width: 88px;
        height: auto;
        position: absolute;
        left: 55px;
        top: 13px;
        z-index: 79;
      }
      .leaf-l3{
        width: 60px;
        height: auto;
        position: absolute;
        left: 6px;
        top: 78px;
        z-index: 69;
      }
      .leaf-r1{
        width: 75px;
        height: auto;
        position: absolute;
        right: 0px;
        top: 57px;
        z-index: 79;
      }
      .leaf-r2{
        width: 58px;
        height: auto;
        position: absolute;
        right: 0;
        top: 130px;
        z-index: 69;
      }
      .wave-1{
        width: 750px;
        height: auto;
        position: absolute;
        bottom: 60px;
        left: -150px;
        z-index: 61;
        // opacity: 0;
      }
      .wave-2{
        width: 750px;
        height: auto;
        position: absolute;
        bottom: 42px;
        left: -200px;
        z-index: 71;
      }
      .wave-3{
        width: 750px;
        height: auto;
        position: absolute;
        bottom: 26px;
        left: -100px;
        z-index: 81;
      }
      .wave-4{
        width: 750px;
        height: auto;
        position: absolute;
        bottom: 0;
        left: -320px;
        z-index: 100;
      }
      .boat{
        width: 150px;
        height: auto;
        position: absolute;
        bottom: 46px;
        left: 52px;
        z-index: 99;
        transform: rotate(5deg);
      }
      .banner-1{
        width: 130px;
        height: auto;
        position: absolute;
        right: 40px;
        top: 80px;
        z-index: 71;
        border-radius: 8px;
        background-color: #fff;
        padding: 5px 5px 0;
        box-shadow: 0 0 12px 2px #ccc;
        box-sizing: border-box;
        transition: all .5s;
        .rope{
          width: 25px;
          height: 475px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -440px;
          background: url(../../static/img/rope.png) no-repeat center bottom;
          background-size: 25px auto;
          // transition: top .1s;
        }
        .picture{
          width: 100%;
          border-radius: 8px 8px 0 0;
        }
        .banner-txt{
          display: block;
          padding: 4px 0;
          font-size: 12px;
          line-height: 12px;
          text-align: center;
          color: #000;
          font-weight: bold;
        }
        &.active{
          width: 180px;
          z-index: 72;
          .banner-txt{
            padding: 6px 0;
            font-size: 14px;
          }
        }
        &.banner-2{
          right: 40px;
          top: 340px;
          z-index: 61;
          &.active{
            top: 280px;
            z-index: 62;
          }
          &.top{
            top: 380px;
            right: 30px;
          }
        }
        &.banner-3{
          right: inherit;
          left: 30px;
          top: 240px;
          z-index: 61;
          &.active{
            top: 180px;
            z-index: 72;
          }
          &.top{
            top: 180px;
          }
        }
      }
    }
  }
  .animate0{
    animation-name: run0;
    animation-duration: 15s;
    animation-iteration-count: infinite;
    transform-origin: left top;
  }
  @keyframes run0{
    0%{
      transform: rotate(-5deg);
    }
    50%{
      transform: rotate(5deg);
    }
    100%{
      transform: rotate(-5deg);
    }
  }
  .animate00{
    animation-name: run00;
    animation-duration: 12s;
    animation-iteration-count: infinite;
    transform-origin: left top;
  }
  @keyframes run00{
    0%{
      transform: rotate(-10deg);
    }
    50%{
      transform: rotate(10deg);
    }
    100%{
      transform: rotate(-10deg);
    }
  }
  .animate000{
    animation-name: run000;
    animation-duration: 13s;
    animation-iteration-count: infinite;
    transform-origin: left top;
  }
  @keyframes run000{
    0%{
      transform: rotate(-10deg);
    }
    50%{
      transform: rotate(10deg);
    }
    100%{
      transform: rotate(-10deg);
    }
  }
  .animate1{
    animation-name: run1;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-delay: 2s;
    transform-origin: right top;
  }
  @keyframes run1{
    0%{
      transform: rotate(-10deg);
    }
    50%{
      transform: rotate(10deg);
    }
    100%{
      transform: rotate(-10deg);
    }
  }
  .animate11{
    animation-name: run11;
    animation-duration: 11s;
    animation-iteration-count: infinite;
    animation-delay: 1s;
    transform-origin: right top;
  }
  @keyframes run11{
    0%{
      transform: rotate(-10deg);
    }
    50%{
      transform: rotate(10deg);
    }
    100%{
      transform: rotate(-10deg);
    }
  }
  .animate2{
    animation-name: run2;
    animation-iteration-count: infinite;
  }
  .dur-1{
    animation-duration: 20s;
  }
  .dur-2{
    animation-duration: 18s;
  }
  .dur-3{
    animation-duration: 16s;
  }
  .dur-4{
    animation-duration: 16s;
  }
  .dur-5{
    animation-duration: 18s;
  }
  .dur-6{
    animation-duration: 17s;
  }
  .dur-7{
    animation-duration: 16s;
  }
  @keyframes run2{
    0%{
      transform: translateX(-100px);
    }
    100%{
      transform: translateX(375px);
    }
  }
  .animate3{
    animation-name: run3;
    animation-iteration-count: infinite;
  }
  @keyframes run3{
    0%{
      transform: translateX(200px);
    }
    100%{
      transform: translateX(-375px)
    }
  }
  .animate4{
    animation-name: run4;
    animation-duration: 10s;
    animation-iteration-count: infinite;
  }
  @keyframes run4{
    0%{
      transform: translateX(0) rotate(5deg);
    }
    25%{
      transform: translateX(20px) rotate(0);
    }
    45%{
      transform: translateX(15px) rotate(2deg);
    }
    50%{
      transform: translateX(19px) rotate(0deg);
    }
    65%{
      transform: translateX(19px) rotate(3deg);
    }
    80%{
      transform: translateX(14px) rotate(-2deg);
    }
    100%{
      transform: translateX(0) rotate(5deg);
    }
  }
  .animate5{
    animation-name: run5;
    animation-duration: 8s;
    animation-iteration-count: infinite;
  }
  @keyframes run5{
    0%{
      transform: translateX(0);
    }
    50%{
      transform: translateX(-100px);
    }
    100%{
      transform: translateX(0);
    }
  }
  .animate6{
    animation-name: run6;
    animation-duration: 7s;
    animation-iteration-count: infinite;
  }
  @keyframes run6{
    0%{
      transform: translateX(0);
    }
    50%{
      transform: translateX(100px);
    }
    100%{
      transform: translateX(0);
    }
  }
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .content{
      .content-bg{
        .banner-1{
          top: 130px;
          &.active{
            top: 160px;
          }
          &.banner-2{
            top: 460px;
            &.active{
              top: 370px;
            }
            &.top{
              top: 470px;
            }
          }
          &.banner-3{
            top: 340px;
            &.active{
              top: 250px;
            }
            &.top{
              top: 250px;
            }
          }
        }
      }
    }
  }
</style>
