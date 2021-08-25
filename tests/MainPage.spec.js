import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import MainPage from '../src/pages/MainPage';
import {
  shallowMount,
  createLocalVue,
  enableAutoDestroy,
} from '@vue/test-utils';

describe('main page', () => {
  enableAutoDestroy(beforeEach);
  let getters;
  let actions;
  let store;
  let vuetify;
  let router;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    Vue.use(Vuetify);
    localVue.use(Vuex);
    localVue.use(VueRouter);
    vuetify = new Vuetify();
    router = new VueRouter();

    getters = {
      getPieData: () => [],
      getPaymentsList: () => [],
    };
    actions = {
      fetchData: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  const createComponent = () => {
    return shallowMount(MainPage, {
      localVue,
      vuetify,
      store,
      router,
    });
  };

  it('render component with empty data', () => {
    const wrapper = createComponent();

    expect(wrapper.text()).toContain('is Empty :(');
  });
});
