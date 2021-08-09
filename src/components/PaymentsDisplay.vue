<template>
  <div class="payments-table__wrap">
    <div v-if="!paymentsList.length">
      Пусто :(
    </div>
    <table class="payments-table" v-else>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Category</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) of paymentsList.slice(startIndex, endIndex)"
          :key="idx"
        >
          <td>{{ paymentsList.indexOf(item) + 1 }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">Сумма расходов: {{ getFullSum }}</td>
        </tr>
      </tfoot>
    </table>
    <pagination-comp
      :currentPage="currentPage"
      :totalLength="paymentsList.length"
      :maxVisibleButtons="3"
      :perPage="perPage"
      :arrowsInitMax="true"
      @pagechanged="onPageChange"
    />
  </div>
</template>

<script>
import PaginationComp from './PaginationComp.vue';
export default {
  name: 'PaymentsDisplay',
  components: {
    PaginationComp,
  },
  props: {
    perPage: {
      type: Number,
      required: false,
      default: 10,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    paymentsList() {
      return this.$store.getters.getPaymentsList;
    },
    getFullSum() {
      return this.$store.getters.getFullPaymentValue;
    },
    startIndex() {
      return (this.currentPage - 1) * this.perPage;
    },
    endIndex() {
      return this.currentPage * this.perPage;
    },
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
    },
  },
  created() {
    this.$store.dispatch('fetchData');
  },
};
</script>

<style lang="scss" scoped>
.payments {
  &-table {
    &__wrap {
      margin-top: 50px;
    }
    table-layout: fixed;
    width: 50%;
    border-collapse: collapse;
    thead {
      border-bottom: 1px solid #e2e2e2;
      th {
        text-align: center;
      }
      th:nth-child(1) {
        width: 5%;
      }
      th:nth-child(2) {
        width: 20%;
      }
      th:nth-child(3) {
        width: 20%;
      }
      th:nth-child(4) {
        width: 5%;
      }
    }
    tr {
      border-bottom: 1px solid #e2e2e2;
    }
    th,
    td {
      padding-top: 20px;
      padding-bottom: 20px;
      text-align: center;
    }
  }
}
</style>
