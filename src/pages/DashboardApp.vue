<template>
  <div>
    <v-container>
      <v-row class="my-5">
        <v-col>
          <add-component :addFromUrl="addFromUrl" @add="isEmpty" />
        </v-col>
      </v-row>
      <v-row class="text-center text-h1" v-if="empty">
        <v-col>
          Is empty :(
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col lg="7" sm="6">
          <payments-table
            :payments="currentList"
            class="my-5 text-center"
            @deletedPayment="isEmpty"
          />
          <pagination-comp :length="totalPages" @changePage="changePage" />
        </v-col>
        <v-col lg="5" sm="6">
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
  name: 'Dashboard',
  components: {
    AddComponent,
    PaymentsTable,
    PaginationComp,
    PieChart,
  },
  props: {
    getData: {
      type: Array,
      required: true,
    },
    getPieData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      height: 200,
      addFromUrl: false,
      empty: true,
    };
  },
  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.perPage;
    },
    endIndex() {
      return this.currentPage * this.perPage;
    },
    currentList() {
      if (this.getData) {
        return this.getData.slice(this.startIndex, this.endIndex);
      }
      return [];
    },
    totalPages() {
      if (this.getData) {
        return Math.ceil(this.getData.length / this.perPage);
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
    isEmpty() {
      if (this.getData) {
        if (this.getData.length === 0) {
          this.empty = true;
        } else {
          this.empty = false;
        }
      }
    },
  },
  mounted() {
    if (this.$route.params?.category && this.$route.path.includes('add')) {
      this.addFromUrl = true;
    } else {
      this.addFromUrl = false;
    }
    if (this.$route.params?.page) {
      if (this.totalPages < +this.$route.params.page) {
        this.currentPage = this.totalPages;
        this.$router.push(`/page/${this.currentPage}`);
      } else {
        this.currentPage = +this.$route.params.page;
      }
    }
  },
  watch: {
    getData: {
      handler() {
        this.isEmpty();
      },
    },
    getPieData: {
      handler() {
        this.isEmpty();
      },
    },
  },
};
</script>
