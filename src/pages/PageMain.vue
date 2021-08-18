<template>
  <div>
    <header>
      <div class="container">
        <h1 class="header__title">My personal costs</h1>
      </div>
    </header>
    <button class="btn payments-add" @click="showPaymentForm">
      Add new cost &#43;
    </button>
    <payments-display />
  </div>
</template>
<script>
export default {
  name: 'PageMain',
  components: {
    PaymentsDisplay: () => import('../components/PaymentsDisplay.vue'),
  },
  data() {
    return {};
  },
  methods: {
    showPaymentForm() {
      this.$modal.show('addPayment', { header: 'Add Payment Form' });
    },
  },
  mounted() {
    if (this.$route?.params) {
      if (this.$route.params?.id) {
        this.$modal.show('editPayment', { header: 'Edit Payment Form' });
      } else if (this.$route.params?.category) {
        this.$modal.show('addPayment', { header: 'Add Payment Form' });
      }
    }
    // if (this.$route?.params.id) {
    //   this.$modal.show('eidtPayment', { header: 'Edit Payment Form' });
    // }
    // if (this.$route?.params?.category) {
    //   this.$modal.show('addPayment', { header: 'Add Payment Form' });
    // }
  },
};
</script>
<style lang="scss" scoped>
.header__title {
  margin-top: 150px;
}
.overflow-hidden {
  overflow: hidden;
}
</style>
