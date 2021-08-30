import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import {
  shallowMount,
  createLocalVue,
  enableAutoDestroy,
} from '@vue/test-utils';

import PaymentTable from '../../src/components/PaymentsTable';
import PaymentContextMenu from '../../src/components/PaymentContextMenu';
import EditPaymentForm from '../../src/components/EditPaymentFormDialog';

describe('payments table component', () => {
  enableAutoDestroy(beforeEach);
  let wrapper;
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

    actions = {
      editPayment: jest.fn(),
      deletePayment: jest.fn(),
      searchList: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
    });
  });

  const createComponent = settings => {
    wrapper = shallowMount(PaymentTable, {
      localVue,
      vuetify,
      store,
      router,
      ...settings,
    });
  };

  it('render payments table', () => {
    createComponent({ propsData: { payments: [] } });

    expect(wrapper.exists()).toBe(true);
  });

  it('render payment context menu', () => {
    createComponent({
      propsData: {
        payments: [{ id: 1, category: 'test', value: 100, date: '10.02.2021' }],
      },
    });

    expect(wrapper.findComponent(PaymentContextMenu).exists()).toBe(true);
  });

  it('render edit payment form dialog', () => {
    createComponent({ propsData: { payments: [] } });

    expect(wrapper.findComponent(EditPaymentForm).exists()).toBe(true);
  });

  it('emit event editPayment from payment context menu', () => {
    createComponent({
      propsData: {
        payments: [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
      },
    });

    wrapper.findComponent(PaymentContextMenu).vm.$emit('editPayment', {});

    expect(wrapper.findComponent(PaymentContextMenu).emitted()).toEqual({
      editPayment: expect.any(Object),
    });
  });

  it('emit event deletePayment from context menu', () => {
    createComponent({
      propsData: {
        payments: [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
      },
    });

    wrapper.findComponent(PaymentContextMenu).vm.$emit('deletePayment', 10);

    expect(wrapper.findComponent(PaymentContextMenu).emitted()).toEqual({
      deletePayment: [[10]],
    });
  });

  it('dispatch  deletePayment in vuex', () => {
    createComponent({
      propsData: {
        payments: [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
      },
    });

    wrapper.findComponent(PaymentContextMenu).vm.$emit('deletePayment', 10);

    expect(actions.deletePayment).toHaveBeenCalled();
  });

  it('dispatch editPayment from edit payment form dialog ', () => {
    createComponent({
      propsData: {
        payments: [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
      },
    });

    wrapper.findComponent(EditPaymentForm).vm.$emit('editPayment');

    expect(actions.editPayment).toHaveBeenCalled();
  });

  it('emit event close modal dialog from edit payment form', () => {
    createComponent({
      propsData: {
        payments: [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
      },
    });

    wrapper.findComponent(EditPaymentForm).vm.$emit('closeEdit');

    expect(wrapper.findComponent(EditPaymentForm).emitted().closeEdit).toEqual([
      [],
    ]);
  });
});
