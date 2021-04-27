<template>
  <div class="loading">
    <div class="bar"><div class="sub" :style="{width:`${process}%`}" /></div>
    <div class="label">{{ process }}%</div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props:['process'],
  data(){
    return{

    }
  },
  watch: {
    process(val) {
      if ( Number(val)  === 100) {
        this.$emit('done');
      }
    }
  },
  created(){

  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.loading{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 9999;
  .bar{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 100px;
    height:12px;
    border: 1px #666 solid;
    .sub{
      height: 100%;
      background:#999;
    }
  }
  .label{
    color:#666;
    font-size: 14px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,calc(-50% + 20px));
  }
}
</style>
