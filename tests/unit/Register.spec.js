import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import { mount, createLocalVue, enableAutoDestroy } from '@vue/test-utils';

import { nextTick } from 'vue';

import Register from '../../src/pages/Register';

describe('Add payment component', () => {
  enableAutoDestroy(beforeEach);

  let wrapper;
  let actions;
  let store;
  let vuetify;
  let localVue;
  let router;

  beforeEach(() => {
    localVue = createLocalVue();
    Vue.use(Vuetify);
    localVue.use(Vuex);
    vuetify = new Vuetify();
    router = {
      push: jest.fn(),
    };

    actions = {
      signUp: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
    });
  });

  const findButtonByText = text =>
    wrapper.findAll('.v-btn').wrappers.find(w => w.text() === text);

  const createComponent = settings => {
    wrapper = mount(Register, {
      localVue,
      vuetify,
      store,
      mocks: {
        $router: router,
      },
      ...settings,
    });
  };

  it('render registration form', async () => {
    createComponent();

    expect(wrapper.exists()).toBe(true);
  });

  it('input name', async () => {
    createComponent();

    await wrapper.find('[data-testid=inputName]').setValue('name');

    expect(wrapper.find('[data-testid=inputName]').element.value).toBe('name');
  });
  it('input email', async () => {
    createComponent();

    await wrapper.find('[data-testid=inputEmail]').setValue('email@email.ru');

    expect(wrapper.find('[data-testid=inputEmail]').element.value).toBe(
      'email@email.ru'
    );
  });
  it('input password', async () => {
    createComponent();

    await wrapper.find('[data-testid=inputPassword]').setValue('123456');

    expect(wrapper.find('[data-testid=inputPassword]').element.value).toBe(
      '123456'
    );
  });
  it('input confirmPassword', async () => {
    createComponent();

    await wrapper.find('[data-testid=inputConfirmPassword]').setValue('123456');

    expect(
      wrapper.find('[data-testid=inputConfirmPassword]').element.value
    ).toBe('123456');
  });

  it('password and confirm password should match', async () => {
    createComponent();

    await wrapper.find('[data-testid=inputPassword]').setValue('123456');
    await wrapper.find('[data-testid=inputConfirmPassword]').setValue('123456');

    const pass = wrapper.find('[data-testid=inputPassword]');
    const confirmPass = wrapper.find('[data-testid=inputConfirmPassword]');

    expect(pass.element.value).toMatch(confirmPass.element.value);
  });
  it('password and confirm password does not should match', async () => {
    createComponent();

    await wrapper.find('[data-testid=inputPassword]').setValue('123456');
    await wrapper
      .find('[data-testid=inputConfirmPassword]')
      .setValue('1234567');

    const pass = wrapper.find('[data-testid=inputPassword]');
    const confirmPass = wrapper.find('[data-testid=inputConfirmPassword]');

    expect(pass.element.value).not.toMatch(confirmPass.element.value);
  });

  it('click on signUp btn and call action signUp', async () => {
    createComponent();
    await wrapper.find('[data-testid=inputName]').setValue('name');
    await wrapper.find('[data-testid=inputEmail]').setValue('email@email.ru');
    await wrapper.find('[data-testid=inputPassword]').setValue('123456');
    await wrapper.find('[data-testid=inputConfirmPassword]').setValue('123456');

    await findButtonByText('Sign up').trigger('click');

    expect(actions.signUp).toHaveBeenCalled();
  });
  it('click on signUp btn and redirect to dashboard', async () => {
    createComponent();
    await wrapper.find('[data-testid=inputName]').setValue('name');
    await wrapper.find('[data-testid=inputEmail]').setValue('email@email.ru');
    await wrapper.find('[data-testid=inputPassword]').setValue('123456');
    await wrapper.find('[data-testid=inputConfirmPassword]').setValue('123456');

    await findButtonByText('Sign up').trigger('click');
    await nextTick();

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/dashboard');
  });

  it('click on clear btn', async () => {
    const spy = jest.spyOn(Register.methods, 'clear');
    createComponent();
    await wrapper.find('[data-testid=inputName]').setValue('name');
    await wrapper.find('[data-testid=inputEmail]').setValue('email@email.ru');
    await wrapper.find('[data-testid=inputPassword]').setValue('123456');
    await wrapper.find('[data-testid=inputConfirmPassword]').setValue('123456');

    await findButtonByText('clear').trigger('click');

    expect(spy).toHaveBeenCalled();
  });

  it('click on Login btn and redirect to login page', async () => {
    createComponent();

    await findButtonByText('Log in').trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/login');
  });
});
