import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import {
  shallowMount,
  createLocalVue,
  enableAutoDestroy,
} from '@vue/test-utils';

import MainPage from '../../src/pages/MainPage';
import PaymentTable from '../../src/components/PaymentsTable';
import AddPayment from '../../src/components/addPayment';
import Pagination from '../../src/components/PaginationComp';
import { nextTick } from 'vue';

describe('main page', () => {
  enableAutoDestroy(beforeEach);
  let wrapper;
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
      getFilteredList: () => [],
    };
    actions = {
      fetchData: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  const createComponent = settings => {
    wrapper = shallowMount(MainPage, {
      localVue,
      vuetify,
      store,
      router,
      ...settings,
    });
  };

  it('render msg is empty, if payments list is empty', () => {
    createComponent();

    expect(wrapper.text()).toContain('Is empty :(');
    expect(wrapper.findComponent(PaymentTable).exists()).toBe(false);
  });

  it('render table if data does not empty', async () => {
    createComponent();
    await wrapper.setData({ empty: false });

    expect(wrapper.findComponent(PaymentTable).exists()).toBe(true);
  });

  it('render table with payment', async () => {
    createComponent({
      stubs: {
        'payments-table': PaymentTable,
      },
    });
    await wrapper.setData({
      empty: false,
    });

    expect(wrapper.findComponent(PaymentTable).exists()).toBe(true);
  });

  it('render addPayment component', () => {
    createComponent();

    expect(wrapper.findComponent(AddPayment).exists()).toBe(true);
  });

  it('does not render paymentsTable component if payments list is empty', () => {
    createComponent();

    expect(wrapper.findComponent(PaymentTable).exists()).toBe(false);
  });

  it('emit event add to payment list', async () => {
    createComponent();

    wrapper.findComponent(AddPayment).vm.$emit('add');

    expect(wrapper.findComponent(AddPayment).emitted().add).toEqual([[]]);
  });

  it('emit event delete from payments list', async () => {
    createComponent();
    await wrapper.setData({ empty: false });

    wrapper.findComponent(PaymentTable).vm.$emit('deletedPayment');

    expect(
      wrapper.findComponent(PaymentTable).emitted().deletedPayment
    ).toEqual([[]]);
  });

  it('render pagination component', async () => {
    getters.getPaymentsList = [
      { id: 1, category: 'test', value: 100, date: '10.05.2012' },
    ];
    createComponent();
    await wrapper.setData({
      empty: false,
    });

    expect(wrapper.findComponent(Pagination).exists()).toBe(true);
  });

  it('emit event pagechange from pagination', async () => {
    createComponent();
    await wrapper.setData({
      empty: false,
    });

    wrapper.findComponent(Pagination).vm.$emit('changePage', 2);

    expect(wrapper.findComponent(Pagination).emitted().changePage).toEqual([
      [2],
    ]);
  });
});
