<template>
  <div class="payments-table__wrap">
    <div class="payments-table__left">
      <div v-if="!paymentsList">
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
          <tr v-for="item of paymentsListTable" :key="item.id">
            <td>{{ item.id }}</td>
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
        :totalLength="getLengthPaymentsList"
        :maxVisibleButtons="3"
        :perPage="perPage"
        :arrowsInitMax="true"
        @pagechanged="onPageChange"
      />
    </div>
    <pie-chart :chartDate="getPieData" />
  </div>
</template>

<script>
import PaginationComp from './PaginationComp.vue';
import PieChart from './PieChart.vue';
export default {
  name: 'PaymentsDisplay',
  components: {
    PaginationComp,
    PieChart,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      paymentsList: {
        payments: {},
      },
    };
  },
  computed: {
    getFullSum() {
      return this.$store.getters.getFullPaymentValue;
    },
    getLengthPaymentsList() {
      return this.$store.getters.getFullLength;
    },
    getCategories() {
      return this.$store.getters.getCategories;
    },
    getData() {
      return this.$store.getters.getPaymentsList;
    },
    paymentsListTable() {
      const reg = new RegExp(/[0-9]/, 'g');
      const keys = Object.keys(this.paymentsList.payments).filter(
        key => +key.match(reg) === this.currentPage
      );
      return this.paymentsList.payments[keys];
    },
    getPieData() {
      return this.$store.getters.getPieData;
    },
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
    },
  },
  async created() {
    await this.$store.dispatch('fetchData');
    this.$set(this.paymentsList, 'payments', this.getData);
    if (this.$route?.params?.page) {
      this.onPageChange(+this.$route.params.page);
    }
  },
};
</script>

<style lang="scss" scoped>
.payments {
  &-table {
    &__wrap {
      margin-top: 50px;
      display: flex;
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
