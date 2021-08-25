<template>
  <div>
    <v-container>
      <v-row class="my-5">
        <v-col>
          <add-component :addFromUrl="addFromUrl" />
        </v-col>
      </v-row>
      <v-row class="text-center text-h1" v-if="!currentList.length">
        <v-col>
          Is empty :(
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col lg="7">
          <payments-table :payments="currentList" class="my-5 text-center" />
          <pagination-comp :length="totalPages" @changePage="changePage" />
        </v-col>
        <v-col lg="5">
          <pie-chart :styles="stylesPieChart" :chartData="getPieData" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddComponent from '../components/addPayment.vue';
import PaymentsTable from '../components/PaymentsTable.vue';
import PaginationComp from '../components/PaginationComp.vue';
import PieChart from '../components/PieChart.vue';
export default {
  name: 'PageMain',
  components: {
    AddComponent,
    PaymentsTable,
    PaginationComp,
    PieChart,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      paymentsList: [],
      height: 200,
      addFromUrl: false,
    };
  },
  computed: {
    getPieData() {
      return this.$store.getters.getPieData;
    },
    getData() {
      return this.$store.getters.getPaymentsList;
    },
    startIndex() {
      return (this.currentPage - 1) * this.perPage;
    },
    endIndex() {
      return this.currentPage * this.perPage;
    },
    currentList() {
      if (this.paymentsList[0]) {
        return this.paymentsList[0].slice(this.startIndex, this.endIndex);
      }
      return [];
    },
    totalPages() {
      if (this.paymentsList[0]) {
        return Math.ceil(this.paymentsList[0].length / this.perPage);
      }
      return 0;
    },
    stylesPieChart() {
      return {
        height: `${this.height}px`,
        position: 'relative',
      };
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
  },
  async mounted() {
    await this.$store.dispatch('fetchData');
    this.$set(this.paymentsList, 0, this.getData);
    if (this.$route.params?.category && this.$route.path.includes('add')) {
      this.addFromUrl = true;
    } else {
      this.addFromUrl = false;
    }
    if (this.$route.params?.page) {
      this.currentPage = this.$route.params?.page;
    }
  },
};
</script>
