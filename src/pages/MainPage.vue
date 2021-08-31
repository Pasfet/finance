<template>
  <div>
    <v-app-bar app color="teal" dark>
      <div class="text-xl-h4 text-sm-h5 mr-5">My payment</div>
      <header-search />
      <v-btn @click="toAbout" class="mx-3" color="teal darken-1" dark>
        About
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-2 black--text"
            color="white"
            dark
            v-bind="attrs"
            v-on="on"
          >
            {{ getInfo.name }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn @click="signOut" color="red" dark data-testid="btnSignOut"
                >Exist</v-btn
              >
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <dashboard-app :getData="getData" :getPieData="getPieData" />
  </div>
</template>

<script>
import headerSearch from '../components/headerSearch.vue';
import DashboardApp from './DashboardApp.vue';

export default {
  name: 'PageMain',
  components: {
    headerSearch,
    DashboardApp,
  },
  computed: {
    getInfo() {
      return this.$store.getters.getInfo;
    },
    getPaymentsList() {
      return this.$store.getters.getPaymentsList;
    },
    getPieData() {
      return this.$store.getters.getPieData;
    },
    getData() {
      return this.$store.getters.getFilteredList;
    },
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('logOut');
      this.$router.push('/login');
    },
    toAbout() {
      this.$router.push('/about');
    },
  },
  async mounted() {
    if (!Object.keys(this.getInfo).length) {
      await this.$store.dispatch('fetchInfo');
    }
    if (!Object.keys(this.getPaymentsList).length) {
      await this.$store.dispatch('fetchData');
    }
  },
};
</script>
