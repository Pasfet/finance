<template>
  <div>
    <v-app-bar app color="teal" dark>
      <div class="text-xl-h4 text-sm-h5 mr-5">My payment</div>
      <div class="ml-auto">
        <v-btn to="/dashboard" class="mx-3" color="teal darken-1" dark>
          Home
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
                <v-btn
                  @click="signOut"
                  color="red"
                  dark
                  data-testid="btnSignOut"
                  >Exist</v-btn
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-card class="mx-auto my-15 text-center" max-width="1140">
      <h1>Команды из URL строки</h1>
      <v-card class="text-left pa-5" color="grey darken-4" dark>
        <p>
          <span class="yellow--text darken-1">/dashboard/add/category</span> -
          category(Любое наименование категории, которую желаете добавить),
          например:
          <span class="yellow--text darken-1">/dashboard/add/car</span>
        </p>
        <p>
          <span class="yellow--text darken-1"
            >/dashboard/add/category?value=</span
          >
          - value(сумма расхода, к добавляемой категории), например:
          <span class="yellow--text darken-1"
            >/dashboard/add/car?value=200</span
          >
        </p>
        <p>
          <span class="yellow--text darken-1">/dashboard/edit/id/</span> -
          редактирование существующей статьи расходов (id - номер статьи),
          следующий пример открыть окно редактирования первого платежа:
          <span class="yellow--text darken-1">/dashboard/edit/1 </span>
        </p>
        <p>
          <span class="yellow--text darken-1">/dashboard/page/N/</span> -
          открывает указанную страницу, если указана слишком большая страница,
          откроет последнию, например откроем 2ю страницу
          <span class="yellow--text darken-1">/dashboard/page/2 </span>
        </p>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'About',
  computed: {
    getInfo() {
      return this.$store.getters.getInfo;
    },
  },
  methods: {
    async signOut() {
      await this.$store.dispatch('logOut');
      this.$router.push('/login');
    },
  },
  async mounted() {
    if (!Object.keys(this.getInfo).length) {
      await this.$store.dispatch('fetchInfo');
    }
  },
};
</script>
