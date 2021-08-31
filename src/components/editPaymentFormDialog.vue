<template>
  <v-card>
    <v-card-title class="text-h5">Edit payment form</v-card-title>
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
      <v-text-field
        v-model="category"
        label="Category"
        data-testid="inputCategory"
      ></v-text-field>
      <v-text-field
        v-model.number="value"
        label="Value"
        type="number"
        data-testid="inputValue"
      ></v-text-field>
    </v-card>
    <v-card-actions>
      <v-btn class="mr-3" color="#E53935" dark @click="closeModal">Close</v-btn>
      <v-btn color="teal" dark @click="editPayment"
        >Edit <v-icon>mdi-pencil-outline</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'EditPaymentForm',
  props: {
    payment: {
      type: Object,
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
      id: null,
      menu: false,
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  methods: {
    editPayment() {
      const cost = {
        id: this.id,
        date: this.dateFormatted,
        category: this.category.toLowerCase(),
        value: this.value,
      };
      this.$emit('editPayment', cost);
      this.category = '';
      this.value = 0;
    },
    closeModal() {
      this.$router.push('/dashboard').catch(() => {});
      this.$emit('closeEdit');
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}.${month}.${year}`;
    },
    updateData() {
      this.category = this.payment.category;
      this.value = this.payment.value;
      this.id = this.payment.id;
      this.dateFormatted = this.payment.date;
    },
  },
  mounted() {
    this.updateData();
    if (this.$route.params?.id) {
      this.id = this.$route.params.id;
      this.category = this.$route.params.category;
    }
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
    payment() {
      this.updateData();
    },
  },
};
</script>
