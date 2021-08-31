import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import { mount, createLocalVue, enableAutoDestroy } from '@vue/test-utils';

import { nextTick } from 'vue';

import Auth from '@/pages/Auth';

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
      logIn: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
    });
  });

  const findButtonByText = text =>
    wrapper.findAll('.v-btn').wrappers.find(w => w.text() === text);

  const createComponent = settings => {
    wrapper = mount(Auth, {
      localVue,
      vuetify,
      store,
      mocks: {
        $router: router,
      },
      ...settings,
    });
  };

  it('render Auth pages', () => {
    createComponent();

    expect(wrapper.exists()).toBe(true);
  });

  it('input email', async () => {
    createComponent();

    await wrapper.find('[data-testid=inputEmail]').setValue('test@mail.ru');

    expect(wrapper.find('[data-testid=inputEmail]').element.value).toBe(
      'test@mail.ru'
    );
  });

  it('input password', async () => {
    createComponent();

    await wrapper.find('[data-testid=inputPassword]').setValue('123456');

    expect(wrapper.find('[data-testid=inputPassword]').element.value).toBe(
      '123456'
    );
  });

  it('click logIn btn if valid data', async () => {
    createComponent();
    await wrapper.find('[data-testid=inputEmail]').setValue('test@mail.ru');
    await wrapper.find('[data-testid=inputPassword]').setValue('123456');

    await findButtonByText('log in').trigger('click');
    expect(actions.logIn).toHaveBeenCalled();
  });

  it('click login and redirect on dashboard', async () => {
    createComponent();
    await wrapper.find('[data-testid=inputEmail]').setValue('test@mail.ru');
    await wrapper.find('[data-testid=inputPassword]').setValue('123456');

    await findButtonByText('log in').trigger('click');
    await nextTick();
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/dashboard');
  });

  it('click on signUp btn', async () => {
    createComponent();

    await findButtonByText('sign up').trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/register');
  });
});
