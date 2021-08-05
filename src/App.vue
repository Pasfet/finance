<template>
  <div id="app">
    <header>
      <div class="container">
        <h1 class="header__title">My personal costs</h1>
      </div>
    </header>
    <main>
      <div class="container">
        <add-payment @addNewCost="addNewCost"></add-payment>
        <payments-display
          :payments="paymentsList"
          :page="currentPage"
        ></payments-display>
        <pagination
          :totalPages="Math.ceil(paymentsList.length / 5)"
          :perPage="paymentsList.length"
          :currentPage="currentPage"
          @pagechanged="onPageChange"
        ></pagination>
      </div>
    </main>
  </div>
</template>

<script>
import PaymentsDisplay from './components/PaymentsDisplay.vue';
import AddPayment from './components/AddPayment';
import Pagination from './components/Pagination';
export default {
  name: 'App',
  components: {
    PaymentsDisplay,
    AddPayment,
    Pagination,
  },
  data() {
    return {
      paymentsList: [],
      page: 1,
    };
  },
  computed: {
    currentPage() {
      if (this.page <= 0) {
        return 1;
      } else if (this.page > this.paymentsList.length) {
        return Math.ceil(this.paymentsList.length / 5);
      } else {
        return this.page;
      }
    },
  },
  methods: {
    addNewCost(cost) {
      this.paymentsList = [...this.paymentsList, cost];
    },
    onPageChange(page) {
      this.page = page;
    },
  },
  created() {
    const localStorageData = localStorage.getItem('finance');
    if (localStorageData) {
      this.paymentsList = JSON.parse(localStorageData);
    }
  },
  watch: {
    paymentsList() {
      localStorage.setItem('finance', JSON.stringify(this.paymentsList));
    },
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
.header__title {
  margin-top: 150px;
}
.overflow-hidden {
  overflow: hidden;
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
