<template>
  <HomeView />
</template>

<script>
import HomeView from './views/HomeView.vue';

export default {
  name: 'App',
  components: {
    HomeView,
  }
}
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: inherit;
}

</style>
