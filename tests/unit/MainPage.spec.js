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
      paymentsList: [
        [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
      ],
    });

    expect(wrapper.text()).toMatch(new RegExp('test', 'gi'));
    expect(wrapper.text()).toMatch(new RegExp('10.05.2012', 'gi'));
    expect(wrapper.text()).toMatch(new RegExp('100', 'gi'));
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
    await wrapper.setData({ paymentsList: [[{}]] });

    wrapper.findComponent(AddPayment).vm.$emit('add');

    expect(wrapper.findComponent(AddPayment).emitted().add).toEqual([[]]);
  });

  it('emit event delete from payments list', async () => {
    createComponent();
    await wrapper.setData({ empty: false, paymentsList: [[{}]] });

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
      paymentsList: [
        [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
      ],
    });

    expect(wrapper.findComponent(Pagination).exists()).toBe(true);
  });

  it('emit event pagechange from pagination', async () => {
    createComponent();
    await wrapper.setData({
      empty: false,
      paymentsList: [
        [
          {
            id: 1,
            category: 'test',
            value: 100,
            date: '10.05.2012',
          },
          {
            id: 2,
            category: 'test',
            value: 100,
            date: '10.05.2012',
          },
          {
            id: 3,
            category: 'test',
            value: 100,
            date: '10.05.2012',
          },
          {
            id: 4,
            category: 'test',
            value: 100,
            date: '10.05.2012',
          },
          {
            id: 5,
            category: 'test',
            value: 100,
            date: '10.05.2012',
          },
          {
            id: 6,
            category: 'test',
            value: 100,
            date: '10.05.2012',
          },
          {
            id: 7,
            category: 'test',
            value: 100,
            date: '10.05.2012',
          },
          {
            id: 8,
            category: 'test',
            value: 100,
            date: '10.05.2012',
          },
          {
            id: 9,
            category: 'test',
            value: 100,
            date: '10.05.2012',
          },
          {
            id: 10,
            category: 'test',
            value: 100,
            date: '10.05.2012',
          },
          {
            id: 11,
            category: 'test',
            value: 100,
            date: '10.05.2012',
          },
        ],
      ],
    });

    wrapper.findComponent(Pagination).vm.$emit('changePage', 2);

    expect(wrapper.findComponent(Pagination).emitted().changePage).toEqual([
      [2],
    ]);
  });
});
