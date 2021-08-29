<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    hide-details
    hide-selected
    clearable
    item-text="category"
    label="Поиск по категории"
    solo-inverted
    data-testid="search"
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          Поиск по введенной
          <strong>категории</strong>
        </v-list-item-title>
      </v-list-item>
    </template>

    <template v-slot:item="{ item }">
      <v-list-item-avatar
        color="teal"
        class="text-h5 font-weight-light white--text"
      >
        {{ item.category.charAt(0) }}
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="item.category"></v-list-item-title>
        <v-list-item-subtitle v-text="item.value"></v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'headerSearch',
  data() {
    return {
      isLoading: false,
      items: [],
      model: null,
      search: null,
    };
  },

  computed: {
    getData() {
      return this.$store.getters.getPaymentsList;
    },
  },
  methods: {
    updateData() {
      this.items = this.getData;
    },
  },
  mounted() {
    this.updateData();
  },
  watch: {
    search(newVal) {
      this.isLoading = true;
      this.$store.dispatch('searchList', newVal);
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      this.updateData();
    },
  },
};
</script>
