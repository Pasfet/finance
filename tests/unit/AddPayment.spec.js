import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import {
  shallowMount,
  createLocalVue,
  enableAutoDestroy,
} from '@vue/test-utils';

import AddPayment from '../../src/components/addPayment';
import AddPaymentForm from '../../src/components/AddPaymentFormDialog';

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
      getLastId: () => 5,
      getCategories: () => [],
    };

    actions = {
      addPayment: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  const createComponent = settings => {
    wrapper = shallowMount(AddPayment, {
      localVue,
      vuetify,
      store,
      ...settings,
    });
  };

  it('render add component', async () => {
    createComponent();
    await wrapper.setData({ dialog: true });
    expect(wrapper.findComponent(AddPaymentForm).exists()).toBe(true);
  });

  it('valid props in add component', async () => {
    createComponent({ propsData: { addFromUrl: false } });

    await wrapper.setProps({ addFromUrl: true });

    expect(wrapper.findComponent(AddPaymentForm).exists()).toBe(true);
  });

  it('emit event close modal', async () => {
    createComponent();
    await wrapper.setData({ dialog: true });

    wrapper.findComponent(AddPaymentForm).vm.$emit('closeModal');

    expect(wrapper.findComponent(AddPaymentForm).emitted().closeModal).toEqual([
      [],
    ]);
  });
  it('emit event add payment', async () => {
    createComponent();
    await wrapper.setData({ dialog: true });

    wrapper.findComponent(AddPaymentForm).vm.$emit('addPayment', {});

    expect(wrapper.findComponent(AddPaymentForm).emitted().addPayment).toEqual([
      [{}],
    ]);
  });
  it('dispatch actions add payment', async () => {
    createComponent();
    await wrapper.setData({ dialog: true });

    wrapper.findComponent(AddPaymentForm).vm.$emit('addPayment', {});

    expect(actions.addPayment).toHaveBeenCalled();
  });
});
