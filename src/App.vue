<template>
  <div id="app">
    <main>
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 15px;
}

.btn {
  border: 1px solid #26a69a;
  background-color: #26a69a;
  color: #fff;
  padding: 10px 25px;
  text-transform: uppercase;
  transition: opacity 0.3s linear;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
}
</style>
