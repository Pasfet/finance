<template>
  <v-app>
    <v-app-bar app color="teal" dark>
      <div class="text-xl-h4 text-sm-h5 mr-5">My payment</div>
      <header-search />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import headerSearch from './components/headerSearch.vue';
export default {
  name: 'App',
  components: {
    headerSearch,
  },
};
</script>
<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>
