<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn dark color="teal" v-on="on">
        Add new cost <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <add-payment-form
      v-if="dialog"
      :categories="getCategoriesList"
      @closeModal="onClose"
      @addPayment="addPayment"
    />
  </v-dialog>
</template>
<script>
import AddPaymentForm from './AddPaymentFormDialog.vue';
export default {
  name: 'addPayment',
  props: {
    addFromUrl: {
      type: Boolean,
    },
  },
  components: {
    AddPaymentForm,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    getCategoriesList() {
      return this.$store.getters.getCategories;
    },
  },
  methods: {
    addPayment(payment) {
      this.$store.dispatch('addPayment', payment);
      this.$emit('add');
    },
    onClose() {
      this.dialog = false;
    },
  },
  watch: {
    addFromUrl() {
      this.dialog = this.addFromUrl;
    },
  },
};
</script>
