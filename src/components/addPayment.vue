<template>
  <div>
    <button class="btn payments-add" @click="$refs.addPaymentModal.openModal()">
      Add new cost &#43;
    </button>
    <modal ref="addPaymentModal">
      <template v-slot:header>
        <h1>New cost</h1>
      </template>
      <template v-slot:body>
        <div class="payments__input-wrap">
          <label class="payments__checkbox-wrap">
            <input type="checkbox" v-model="isCategory" />
            Выбрать из существущей категории?
          </label>
          <label
            for="category"
            class="payments__input-label"
            v-if="!isCategory"
          >
            <input
              type="text"
              class="payments__input"
              id="category"
              placeholder="Payment category"
              v-model="category"
            />
          </label>
          <select
            class="payments__select"
            name="category"
            id="categories"
            v-if="isCategory"
            v-model="category"
          >
            <option
              v-for="(category, idx) in getCategories"
              :key="idx"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
          <label for="value" class="payments__input-label">
            <input
              type="text"
              class="payments__input"
              id="value"
              placeholder="Payment value"
              v-model="value"
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
      </template>
      <template v-slot:footer>
        <div>
          <button
            class="btn payments__btn payments__btn--cancel"
            @click="$refs.addPaymentModal.closeModal()"
          >
            Cancel
          </button>
          <button class="btn payments__btn" @click="addCost">
            Add &#43;
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import Modal from './Modal';
export default {
  name: 'addPayment',
  components: {
    Modal,
  },
  data() {
    return {
      date: '',
      isCategory: '',
      category: '',
      value: '',
    };
  },
  computed: {
    getPaymentsLength() {
      return this.$store.getters.getFullLength;
    },
    getCurrentDate() {
      const validDate = isNaN(new Date(this.date))
        ? new Date()
        : new Date(this.date);
      const day = validDate.getDate();
      const month = validDate.getMonth() + 1;
      const year = validDate.getFullYear();
      return `${day}.${month}.${year}`;
    },
    getCategories() {
      return this.$store.getters.getCategories;
    },
  },
  methods: {
    addCost() {
      const cost = {
        id: this.getPaymentsLength + 1,
        date: this.getCurrentDate,
        category: this.category
          ? `${this.category[0].toUpperCase()}${this.category.slice(1)}`
          : 'Not category',
        value: +this.value || 0,
      };
      this.$store.commit('addToPaymentList', cost);
      this.date = '';
      this.category = '';
      this.value = '';
    },
  },
  mounted() {
    if (this.$route?.params?.category) {
      this.$refs.addPaymentModal.openModal();
      this.category = this.$route.params.category;
      if (this.$route?.query?.value) {
        this.value = +this.$route?.query?.value;
      }
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
  &__checkbox {
    &-wrap {
      margin-bottom: 20px;
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
