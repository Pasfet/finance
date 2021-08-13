<script>
import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  props: {
    chartDate: {
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
      options: {
        responsive: true,
      },
    };
  },
  computed: {
    getCategories() {
      const categories = this.chartDate.map(data => data.category);
      return categories;
    },
    getData() {
      const values = this.chartDate.map(value => value.value);
      return values;
    },
  },
  methods: {
    updatePie() {
      this.$set(this.chartdata, 'labels', this.getCategories);
      this.$set(this.chartdata.datasets[0], 'data', this.getData);
      this.renderChart(this.chartdata, this.options);
    },
  },

  mounted() {
    this.updatePie();
  },
  watch: {
    getData() {
      this.updatePie();
    },
    getCategories() {
      this.updatePie();
    },
  },
};
</script>
