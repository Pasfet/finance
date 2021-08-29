import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import { mount, createLocalVue, enableAutoDestroy } from '@vue/test-utils';
import { nextTick } from 'vue';

import Search from '../../src/components/headerSearch';

describe('Add payment component', () => {
  enableAutoDestroy(beforeEach);

  let wrapper;
  let getters;
  let actions;
  let store;
  let vuetify;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    Vue.use(Vuetify);
    localVue.use(Vuex);
    vuetify = new Vuetify();

    getters = {
      getPaymentsList: () => [],
    };
    actions = {
      searchList: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  const createComponent = settings => {
    wrapper = mount(Search, {
      localVue,
      vuetify,
      store,
      ...settings,
    });
  };

  it('render search component', () => {
    createComponent();

    expect(wrapper.exists()).toBe(true);
  });

  it('input category', () => {
    createComponent();

    wrapper.find('[data-testid=search]').setValue('test');

    expect(wrapper.find('[data-testid=search]').element.value).toBe('test');
  });
});
