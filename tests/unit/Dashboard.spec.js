import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import { mount, createLocalVue, enableAutoDestroy } from '@vue/test-utils';

import Dashboard from '../../src/pages/DashboardApp';
import AddPayment from '../../src/components/addPayment';
import PaymentsTable from '../../src/components/PaymentsTable';
import Pagination from '../../src/components/PaginationComp';
import PieChart from '../../src/components/PieChart';
import { nextTick } from 'vue';

describe('Dashboard page', () => {
  enableAutoDestroy(beforeEach);
  let wrapper;
  let getters;
  let actions;
  let store;
  let vuetify;
  let router;
  let route;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    Vue.use(Vuetify);
    localVue.use(Vuex);
    router = {
      push: jest.fn(),
    };
    route = {
      params: {
        category: 'testFromURL',
        page: 1,
      },
      path: '/dashboard/add',
    };

    vuetify = new Vuetify();

    getters = {
      getInfo: () => {
        return {
          name: 'name',
        };
      },
      getPaymentsList: () => [],
      getPieData: () => [],
      getFilteredList: () => [],
    };
    actions = {
      fetchData: jest.fn(),
      fetchInfo: jest.fn(),
      logOut: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  const findButtonByText = text =>
    wrapper.findAll('.v-btn').wrappers.find(w => w.text() === text);

  const createComponent = settings => {
    wrapper = mount(Dashboard, {
      localVue,
      vuetify,
      store,
      mocks: {
        $router: router,
        $route: route,
      },
      ...settings,
    });
  };

  it('render isEmpty if getData is empty', () => {
    createComponent({
      propsData: {
        getData: [],
        getPieData: [],
      },
    });

    expect(wrapper.text()).toContain('Is empty :(');
    expect(wrapper.exists()).toBe(true);
  });

  it('render addComponent', () => {
    createComponent({
      propsData: {
        getData: [],
        getPieData: [],
      },
    });

    expect(wrapper.findComponent(AddPayment).exists()).toBe(true);
  });

  it('does not render paymentsTable and pagination and pieChart', () => {
    createComponent({
      propsData: {
        getData: [],
        getPieData: [],
      },
    });

    expect(wrapper.findComponent(PaymentsTable).exists()).toBe(false);
    expect(wrapper.findComponent(Pagination).exists()).toBe(false);
    expect(wrapper.findComponent(PieChart).exists()).toBe(false);
  });

  it('render paymentsTable', async () => {
    createComponent({
      propsData: {
        getData: [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
        getPieData: [],
      },
    });
    await wrapper.setData({ empty: false });

    expect(wrapper.findComponent(PaymentsTable).exists()).toBe(true);
  });

  it('render pagination', async () => {
    createComponent({
      propsData: {
        getData: [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
        getPieData: [],
      },
    });
    await wrapper.setData({ empty: false });

    expect(wrapper.findComponent(Pagination).exists()).toBe(true);
  });

  it('render pieChart', async () => {
    createComponent({
      propsData: {
        getData: [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
        getPieData: [{ category: 'test', value: 100 }],
      },
    });
    await wrapper.setData({ empty: false });
    expect(wrapper.findComponent(PieChart).exists()).toBe(true);
  });

  it('emits deletedPayment from paymentsTable', async () => {
    createComponent({
      propsData: {
        getData: [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
        getPieData: [],
      },
    });
    await wrapper.setData({ empty: false });

    wrapper.findComponent(PaymentsTable).vm.$emit('deletedPayment');

    expect(
      wrapper.findComponent(PaymentsTable).emitted().deletedPayment
    ).toEqual([[]]);
  });

  it('emits changePage from pagination', async () => {
    createComponent({
      propsData: {
        getData: [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
        getPieData: [],
      },
    });
    await wrapper.setData({ empty: false });

    wrapper.findComponent(Pagination).vm.$emit('changePage', 2);

    expect(wrapper.findComponent(Pagination).emitted().changePage).toEqual([
      [2],
    ]);
  });

  it('watch getData', async () => {
    const spy = jest.spyOn(Dashboard.methods, 'isEmpty');
    createComponent({
      propsData: {
        getData: [],
        getPieData: [],
      },
    });

    await wrapper.setProps({
      getData: [{ id: 1, category: 'test', value: 100, date: '10.05.2012' }],
    });

    expect(spy).toBeTruthy();
  });
  it('watch getPieData', async () => {
    const spy = jest.spyOn(Dashboard.methods, 'isEmpty');
    createComponent({
      propsData: {
        getData: [],
        getPieData: [],
      },
    });

    await wrapper.setProps({
      getPieData: [{ category: 'test', value: 100 }],
    });

    expect(spy).toBeTruthy();
  });
});
