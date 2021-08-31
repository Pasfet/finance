<template>
  <v-card width="500" class="mx-auto my-16 pa-5">
    <form>
      <v-text-field
        v-model="form.email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.form.email.$touch()"
        @blur="$v.form.email.$touch()"
        data-testid="inputEmail"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        :error-messages="passwordError"
        label="Your password"
        required
        type="password"
        @input="$v.form.password.$touch()"
        @blur="$v.form.password.$touch()"
        data-testid="inputPassword"
      ></v-text-field>

      <v-btn class="mr-4" @click="submitRegistration" color="teal" dark>
        log in
      </v-btn>
      <v-btn @click="toSignUp" color="primary" dark>
        sign up
      </v-btn>
    </form>
    <div v-if="error" class="red white--text pa-2 mt-2">{{ error }}</div>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';
export default {
  name: 'Auth',
  mixins: [validationMixin],

  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null,
      submitted: false,
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push('Must be valid e-mail');
      !this.$v.form.email.required && errors.push('E-mail is required');
      return errors;
    },
    passwordError() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push('Password is required');
      !this.$v.form.password.minLength && errors.push('Min length 6 symbols');
      return errors;
    },
  },
  methods: {
    async submitRegistration() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        try {
          await this.$store.dispatch('logIn', this.form);
          this.$router.push('/dashboard');
        } catch (e) {
          this.error = e.message;
        }
      }
    },
    toSignUp() {
      this.$router.push('/register');
    },
  },
};
</script>
