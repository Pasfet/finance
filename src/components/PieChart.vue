<script>
import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
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
    getPieData() {
      const res = [];
      const values = this.$store.getters.getPaymentsList;
      const data = Object.values(values);
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          const find = res.find(item => item.category === data[i][j].category);
          if (find) {
            find.value += data[i][j].value;
          } else {
            const newObj = {
              category: data[i][j].category,
              value: +data[i][j].value,
            };
            res.push(newObj);
          }
        }
      }
      return res.map(cost => cost.value);
    },
    getCategories() {
      return this.$store.getters.getCategories;
    },
  },
  methods: {
    updatePie() {
      this.$set(this.chartdata, 'labels', this.getCategories);
      this.$set(this.chartdata?.datasets[0], 'data', this.getPieData);
      this.renderChart(this.chartdata, this.options);
    },
  },
  mounted() {
    this.updatePie();
  },
  watch: {
    getPieData() {
      this.updatePie();
    },
    getCategories() {
      this.updatePie();
    },
  },
};
</script>
