<template>
  <div>
    <div class="payments-table__wrap">
      <div class="payments-table__left">
        <table class="payments-table">
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
              <td>
                <button
                  class="icon"
                  @click.prevent.stop="openContext($event, item)"
                  data-testid="context"
                >
                  <span>
                    <svg
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 384 384"
                      style="enable-background:new 0 0 384 384;"
                      xml:space="preserve"
                    >
                      <g>
                        <g>
                          <circle cx="192" cy="42.667" r="42.667" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <circle cx="192" cy="192" r="42.667" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <circle cx="192" cy="341.333" r="42.667" />
                        </g>
                      </g>
                    </svg>
                  </span>
                </button>
              </td>
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
      <context-menu
        :elementId="'context'"
        :options="contextSettings"
        :ref="'context'"
        @option-clicked="optionClicked"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentsDisplay',
  components: {
    PaginationComp: () => import('./PaginationComp.vue'),
    PieChart: () => import('./PieChart.vue'),
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      paymentsList: {
        payments: {},
      },
      contextSettings: [
        {
          name: 'Редактировать',
          icon:
            '<svg class="context-menu__icon" height="20" viewBox="0 0 492.49284 492" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m304.140625 82.472656-270.976563 270.996094c-1.363281 1.367188-2.347656 3.09375-2.816406 4.949219l-30.035156 120.554687c-.898438 3.628906.167969 7.488282 2.816406 10.136719 2.003906 2.003906 4.734375 3.113281 7.527344 3.113281.855469 0 1.730469-.105468 2.582031-.320312l120.554688-30.039063c1.878906-.46875 3.585937-1.449219 4.949219-2.8125l271-270.976562zm0 0"/><path d="m476.875 45.523438-30.164062-30.164063c-20.160157-20.160156-55.296876-20.140625-75.433594 0l-36.949219 36.949219 105.597656 105.597656 36.949219-36.949219c10.070312-10.066406 15.617188-23.464843 15.617188-37.714843s-5.546876-27.648438-15.617188-37.71875zm0 0"/></svg>',
          span: 'context-menu__span',
          action: 'edit',
        },
        {
          name: 'Удалить',
          icon:
            '<svg class="context-menu__icon" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><g><path d="m424 64h-88v-16c0-26.51-21.49-48-48-48h-64c-26.51 0-48 21.49-48 48v16h-88c-22.091 0-40 17.909-40 40v32c0 8.837 7.163 16 16 16h384c8.837 0 16-7.163 16-16v-32c0-22.091-17.909-40-40-40zm-216-16c0-8.82 7.18-16 16-16h64c8.82 0 16 7.18 16 16v16h-96z"/><path d="m78.364 184c-2.855 0-5.13 2.386-4.994 5.238l13.2 277.042c1.22 25.64 22.28 45.72 47.94 45.72h242.98c25.66 0 46.72-20.08 47.94-45.72l13.2-277.042c.136-2.852-2.139-5.238-4.994-5.238zm241.636 40c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16zm-80 0c0-8.84 7.16-16 16-16s16 7.16 16 16v208c0 8.84-7.16 16-16 16s-16-7.16-16-16z"/></g></svg>',
          span: 'context-menu__span',
          action: 'delete',
        },
      ],
    };
  },
  computed: {
    getFullSum() {
      return this.$store.getters.getFullPaymentValue;
    },
    getLengthPaymentsList() {
      return this.$store.getters.getFullLength;
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
    openContext(event, item) {
      this.$refs.context.showMenu(event, item);
    },
    optionClicked(event) {
      if (event.action === 'edit') {
        this.$router.push(
          `/edit/${event.item.id}/${event.item.category}?value=${event.item.value}`
        );
        this.$modal.show('show', {
          header: 'Edit payment cost',
          name: 'editPayment',
        });
      } else if (event.action === 'delete') {
        this.$store.dispatch('deletePayment', event.item);
      }
    },
  },

  async mounted() {
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
    width: 70%;
    border-collapse: collapse;
    thead {
      border-bottom: 1px solid #e2e2e2;
      th {
        text-align: center;
      }
      th:nth-child(1) {
        width: 10%;
      }
      th:nth-child(2) {
        width: 30%;
      }
      th:nth-child(3) {
        width: 30%;
      }
      th:nth-child(4) {
        width: 10%;
      }
      th:nth-child(5) {
        width: 10%;
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
    td {
      position: relative;
    }
  }
}
.icon {
  width: 20px;
  margin: 0 auto;
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>
