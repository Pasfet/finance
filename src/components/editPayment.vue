<template>
  <div>
    <div class="payments__input-wrap">
      <label for="category" class="payments__input-label">
        <input
          type="text"
          class="payments__input"
          id="category"
          placeholder="Payment category"
          v-model="category"
          name="category"
        />
      </label>
      <label for="value" class="payments__input-label">
        <input
          type="text"
          class="payments__input"
          id="value"
          placeholder="Payment value"
          v-model="value"
          name="value"
        />
      </label>
      <label for="date" class="payments__input-label">
        <input
          type="date"
          class="payments__input"
          id="date"
          placeholder="Payment date"
          v-model="date"
        />
      </label>
    </div>
    <div>
      <button
        class="btn payments__btn payments__btn--cancel"
        @click="onClose"
        name="cancel"
      >
        Cancel
      </button>
      <button class="btn payments__btn" @click="editPayment" name="edit">
        Edit &#43;
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'editPayment',
  data() {
    return {
      date: '',
      category: '',
      value: '',
      id: 0,
    };
  },
  computed: {
    getCurrentDate() {
      const validDate = isNaN(new Date(this.date))
        ? new Date()
        : new Date(this.date);
      const day = validDate.getDate();
      const month = validDate.getMonth() + 1;
      const year = validDate.getFullYear();
      return `${day}.${month}.${year}`;
    },
  },
  methods: {
    editPayment() {
      const editCost = {
        id: +this.id,
        category: this.category
          ? `${this.category[0].toUpperCase()}${this.category.slice(1)}`
          : this.$route.params.category,
        value: +this.value,
        date: this.getCurrentDate,
      };
      this.$store.dispatch('editPayment', editCost);
    },
    onClose() {
      this.$modal.close();
    },
  },
  mounted() {
    if (this.$route?.params) {
      this.id = +this.$route.params.id;
      this.category = this.$route.params.category;
      this.value = this.$route.query.value;
    }
  },
};
</script>
<style lang="scss" scoped>
.payments {
  &__btn {
    margin-right: 10px;
    &--cancel {
      background: rgb(245, 38, 38);
      border: 1px solid rgb(245, 38, 38);
    }
  }
  &-add {
    margin: 20px 0;
    font-size: 18px;
  }
  &__input {
    &-wrap {
      display: flex;
      flex-direction: column;
    }
    font-family: Avenir, Helvetica, Arial, sans-serif;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #e2e2e2;
    max-width: 450px;
    width: 100%;
    &::placeholder {
      font-family: Avenir, Helvetica, Arial, sans-serif;
    }
  }
  &__select {
    display: block;
    position: relative;
    margin-bottom: 20px;
    max-width: 450px;
    width: 100%;
    padding: 10px;
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
    transition: border 0.3s ease-in-out, color 0.3s ease-in-out;
    option {
      font-size: 14px;
    }
    &:hover {
      cursor: pointer;
      border: 1px solid #535353;
      color: #535353;
    }
  }
}
</style>
