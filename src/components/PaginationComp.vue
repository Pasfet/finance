<template>
  <v-pagination
    :length="length"
    v-model="page"
    color="teal"
    @input="next"
  ></v-pagination>
</template>

<script>
export default {
  name: 'PaginationComp',
  props: {
    length: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    next(page) {
      this.$emit('changePage', page);
    },
  },
  mounted() {
    if (this.$route.params?.page) {
      this.page = +this.$route.params?.page;
    }
  },
};
</script>

<style></style>
