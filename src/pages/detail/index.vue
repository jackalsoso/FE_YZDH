<template>
  <div class="detail">
    {{ id }}
  </div>
</template>

<script>
export default {
  name: 'detail',
  components: {

  },
  data(){
    return{
      id:this.$route.query.id
    }
  },
  computed: {

  },
  created(){
    
  },
  mounted(){

  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.detail{

}
</style>
