<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
        &#171;
      </button>
    </li>
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        &#8249;
      </button>
    </li>

    <li class="pagination-item" v-for="page of pages" :key="page.name">
      <button
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
        &#8250;
      </button>
    </li>
    <li class="pagination-item">
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
        &#187;
      </button>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalLength: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalLength / this.perPage);
    },
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        if (i === 0) {
          continue;
        }
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      if (page > this.totalPages) {
        this.$emit('pagechanged', this.totalPages);
      }
      if (page <= 0) {
        this.$emit('pagechanged', 1);
      }
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  list-style-type: none;
  text-align: center;
  margin-top: 20px;
  width: 50%;
  &-item {
    display: inline-block;
    button {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #e2e2e2;
      margin-right: 10px;
      transition: color 0.3s ease-in, background-color 0.3s ease-in;
      &:hover {
        cursor: pointer;
        background-color: #4aae9b;
        color: #fff;
      }
    }
  }
}
.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>
