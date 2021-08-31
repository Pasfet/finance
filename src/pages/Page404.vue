<template>
  <div
    class="d-flex flex-column justify-center align-center"
    style="min-height: calc(100vh - 64px);"
  >
    <div class="text-center mb-10 text-h5">
      К сожалению ничего не найдено, вернуться на главную?
    </div>
    <v-btn to="/dashboard" color="teal" dark style="font-size: 18px;">
      На главную
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Page404',
};
</script>
