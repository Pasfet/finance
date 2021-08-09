<template>
  <div class="payments-table__wrap">
    <div v-if="!payments.length">
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
          v-for="(item, idx) of payments.slice(startIndex, endIndex)"
          :key="idx"
        >
          <td>{{ payments.indexOf(item) + 1 }}</td>
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
  </div>
</template>

<script>
export default {
  name: 'PaymentsDisplay',
  props: {
    payments: {
      type: Array,
    },
    page: {
      type: Number,
    },
    perPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    getFullSum() {
      return this.payments.reduce((sum, cur) => sum + +cur.value, 0);
    },
    startIndex() {
      return (this.page - 1) * this.perPage;
    },
    endIndex() {
      return this.page * this.perPage;
    },
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
