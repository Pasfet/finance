<template>
  <v-card width="500" class="mx-auto my-16 pa-5">
    <form @submit.prevent="submitRegistration" novalidate>
      <v-text-field
        v-model="user.name"
        :error-messages="nameErrors"
        label="Name"
        required
        @input="$v.user.name.$touch()"
        @blur="$v.user.name.$touch()"
        data-testid="inputName"
      ></v-text-field>
      <v-text-field
        v-model="user.email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.user.email.$touch()"
        @blur="$v.user.email.$touch()"
        data-testid="inputEmail"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        :error-messages="passwordError"
        label="Your password"
        required
        type="password"
        @input="$v.user.password.$touch()"
        @blur="$v.user.password.$touch()"
        data-testid="inputPassword"
      ></v-text-field>
      <v-text-field
        v-model="user.confirmPassword"
        :error-messages="confirmPasswordError"
        label="Confirm password"
        required
        type="password"
        @input="$v.user.confirmPassword.$touch()"
        @blur="$v.user.confirmPassword.$touch()"
        data-testid="inputConfirmPassword"
      ></v-text-field>

      <v-card-actions class="d-flex justify-space-between">
        <v-card-actions>
          <v-btn class="mr-4" @click="submitRegistration" color="teal" dark>
            Sign up
          </v-btn>
          <v-btn @click="clear" color="red" dark>
            clear
          </v-btn>
        </v-card-actions>
        <v-btn @click="toLogIn" color="primary" dark>Log in</v-btn>
      </v-card-actions>
    </form>
    <div v-if="error">{{ error }}</div>
  </v-card>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
export default {
  name: 'Register',
  mixins: [validationMixin],
  validations: {
    user: {
      name: { required, maxLength: maxLength(20) },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs('password') },
    },
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      submitted: false,
      error: null,
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.user.name.$dirty) return errors;
      !this.$v.user.name.maxLength &&
        errors.push('Name must be at most 20 characters long');
      !this.$v.user.name.required && errors.push('Name is required.');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.email && errors.push('Must be valid e-mail');
      !this.$v.user.email.required && errors.push('E-mail is required');
      return errors;
    },
    passwordError() {
      const errors = [];
      if (!this.$v.user.password.$dirty) return errors;
      !this.$v.user.password.required && errors.push('Password is required');
      !this.$v.user.password.minLength && errors.push('Min length 6 symbols');
      return errors;
    },
    confirmPasswordError() {
      const errors = [];
      if (!this.$v.user.confirmPassword.$dirty) return errors;
      !this.$v.user.confirmPassword.required &&
        errors.push('Confirm password is required');
      this.$v.user.confirmPassword &&
        !this.$v.user.confirmPassword.sameAsPassword &&
        errors.push('Password and Confirm Password should match');
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
          await this.$store.dispatch('signUp', this.user);
          this.$router.push('/dashboard');
        } catch (e) {
          this.error = e.message;
        }
      }
    },
    clear() {
      this.$v.$reset();
      this.user.name = '';
      this.user.email = '';
      this.user.password = '';
      this.user.confirmPassword = '';
    },
    toLogIn() {
      this.$router.push('/login');
    },
  },
};
</script>
