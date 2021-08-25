<template>
  <v-card>
    <v-card-title class="text-h5">Add payment form</v-card-title>
    <v-card class="pa-8" flat>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateFormatted"
            label="Date"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
      </v-menu>
      <v-checkbox
        v-model="isCategory"
        :label="'Выбрать из существующей категории?'"
      ></v-checkbox>
      <v-select
        v-if="isCategory"
        :items="categories"
        v-model="category"
        label="Category"
      >
      </v-select>
      <v-text-field v-else v-model="category" label="Category"></v-text-field>
      <v-text-field
        v-model.number="value"
        label="Value"
        type="number"
      ></v-text-field>
    </v-card>
    <v-card-actions>
      <v-btn class="mr-3" color="#E53935" dark @click="closeModal">Close</v-btn>
      <v-btn color="teal" dark @click="addCost"
        >Add <v-icon>mdi-plus</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'AddPaymentForm',
  props: {
    lastId: {
      type: Number,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateFormatted: this.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
      category: '',
      value: 0,
      menu: false,
      isCategory: false,
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  methods: {
    addCost() {
      const cost = {
        id: this.lastId + 1,
        date: this.dateFormatted,
        category: this.category.toLowerCase(),
        value: this.value,
      };
      this.$emit('addPayment', cost);
      this.category = '';
      this.value = 0;
    },
    closeModal() {
      this.$emit('closeModal');
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
    },
  },
  mounted() {
    if (this.$route.params?.category) {
      this.category = this.$route.params.category;
      if (this.$route?.query) {
        this.value = +this.$route.query.value;
      }
    }
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
};
</script>
