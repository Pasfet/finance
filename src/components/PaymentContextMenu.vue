<template>
  <div>
    <v-list>
      <v-list-item v-for="(item, i) in contextMenuList" :key="i">
        <v-list-item-action class="mx-0">
          <v-btn
            dark
            color="teal"
            max-width="100%"
            width="200px"
            @click="$emit(item.action)"
            data-testid="btnContextMenu"
          >
            <v-icon class="mr-2"> {{ item.icon }} </v-icon>
            {{ item.title }}
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'PaymentContextMenu',
  props: {
    contextMenuList: {
      type: Array,
      required: true,
    },
  },
};
</script>
