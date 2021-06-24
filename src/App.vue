<template>
  <div id="app">
    <router-view v-slot='{ Component }' >
      <keep-alive exclude="Detail" >
        <component :is='Component' />
      </keep-alive>
    </router-view>

    <main-tab-bar v-if="$route.meta.footShow"/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue';

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style scoped>
  @import 'assets/css/base.css' ;
</style>
