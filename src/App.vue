<template>
  <v-app>
    <v-app-bar app color="teal" dark>
      <div class="text-h4">My payment</div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
