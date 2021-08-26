<template>
  <div>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-center">#</th>
          <th class="text-center">Date</th>
          <th class="text-center">Category</th>
          <th class="text-center">Value</th>
          <th class="text-center"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cost of payments" :key="cost.id">
          <td>{{ cost.id }}</td>
          <td>{{ cost.date }}</td>
          <td>
            {{ `${cost.category[0].toUpperCase()}${cost.category.slice(1)}` }}
          </td>
          <td>{{ cost.value }}</td>
          <td>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <payment-context-menu
                :contextMenuList="contextMenuList"
                @editPayment="editPayment(cost)"
                @deletePayment="deletePayment(cost.id)"
              />
            </v-menu>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <v-dialog width="500" v-model="dialog">
      <edit-payment-form
        @editPayment="editPaymentForm"
        @closeEdit="onClose"
        :payment="payment"
      />
    </v-dialog>
  </div>
</template>

<script>
import EditPaymentForm from './editPaymentFormDialog.vue';
import PaymentContextMenu from './PaymentContextMenu.vue';
export default {
  name: 'PaymentsTable',
  components: {
    PaymentContextMenu,
    EditPaymentForm,
  },
  props: {
    payments: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      payment: {},
      contextMenuList: [
        {
          title: 'Редактировать',
          icon: 'mdi-pencil-outline',
          action: 'editPayment',
        },
        {
          title: 'Удалить',
          icon: 'mdi-delete',
          action: 'deletePayment',
        },
      ],
    };
  },
  methods: {
    editPaymentForm(payment) {
      this.$store.dispatch('editPayment', payment);
    },
    editPayment(cost) {
      this.payment = cost;
      this.dialog = true;
    },
    deletePayment(costId) {
      this.$store.dispatch('deletePayment', costId);
      this.$emit('deletedPayment');
    },
    onClose() {
      this.dialog = false;
      this.payment = {};
    },
  },
  mounted() {
    if (this.$route.params?.id && this.$route.path.includes('edit')) {
      this.dialog = true;
    }
  },
};
</script>
