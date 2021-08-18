<template>
  <div id="app">
    <main>
      <div class="container">
        <router-view />
      </div>
    </main>
    <transition name="fade">
      <modal-window-add-payment
        v-if="modalShow"
        :modalSettings="modalSettings"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    ModalWindowAddPayment: () =>
      import('./components/ModalWindowAddPayment.vue'),
  },
  data() {
    return {
      modalShow: false,
      modalSettings: {},
      tooltipSettings: {},
    };
  },
  methods: {
    onShow(settings) {
      this.modalSettings = settings;
      this.modalShow = true;
    },
    onClose() {
      this.modalShow = false;
      this.modalSettings = {};
    },
  },
  mounted() {
    this.$modal.EventBus.$on('show', this.onShow);
    this.$modal.EventBus.$on('close', this.onClose);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off('show', this.onShow);
    this.$modal.EventBus.$off('close', this.onClose);
  },
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
