<script>
import { Pie } from 'vue-chartjs';
export default {
  extends: Pie,
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartdata: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              '#f87979',
              '#e2e2e2',
              '#c7c6ff',
              '#f2dcb3',
              '#f2003c',
              '#0ee500',
              '#00f397',
              '#0ae500',
              '#ff5ab3',
            ],
            data: [],
          },
        ],
      },
    };
  },
  computed: {
    categories() {
      return this.chartData.map(el => el.category);
    },
    data() {
      return this.chartData.map(el => el.value);
    },
  },
  methods: {
    updatePie() {
      this.$set(this.chartdata, 'labels', this.categories);
      this.$set(this.chartdata.datasets[0], 'data', this.data);
      this.renderChart(this.chartdata);
    },
  },
  mounted() {
    this.updatePie();
  },
  watch: {
    chartData: {
      handler() {
        this.updatePie();
      },
    },
    categories: {
      handler() {
        this.updatePie();
      },
    },
  },
};
</script>
