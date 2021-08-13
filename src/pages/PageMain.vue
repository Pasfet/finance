<template>
  <div>
    <header>
      <div class="container">
        <h1 class="header__title">My personal costs</h1>
      </div>
    </header>
    <add-payment />
    <payments-display />
  </div>
</template>
<script>
import PaymentsDisplay from '../components/PaymentsDisplay.vue';
import AddPayment from '../components/addPayment.vue';

export default {
  name: 'PageMain',
  components: {
    PaymentsDisplay,
    AddPayment,
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
