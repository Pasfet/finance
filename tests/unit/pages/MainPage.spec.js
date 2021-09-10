import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import { mount, createLocalVue, enableAutoDestroy } from '@vue/test-utils';

import MainPage from '@/pages/MainPage';
import Dashboard from '@/pages/DashboardApp';
import headerSearch from '@/components/headerSearch';

describe('main page when state does not empty', () => {
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
      path: '/dashboard',
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
    wrapper = mount(MainPage, {
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

  it('render headerSearch component', () => {
    createComponent();

    expect(wrapper.findComponent(headerSearch).exists()).toBe(true);
  });

  it('render dashboard component', async () => {
    createComponent();
    await wrapper.setData({ spinner: false });

    expect(wrapper.findComponent(Dashboard).exists()).toBe(true);
  });

  it('click on btn getInfo name to render btn Exist', async () => {
    createComponent();

    await findButtonByText('name').trigger('click');

    expect(wrapper.text()).toContain('Exit');
  });

  it('click on btn Exist toHaveBeenCalled action logOut', async () => {
    createComponent();
    await findButtonByText('name').trigger('click');

    await findButtonByText('Exit').trigger('click');

    expect(actions.logOut).toHaveBeenCalled();
  });

  it('push to login page', async () => {
    createComponent();
    await findButtonByText('name').trigger('click');

    await findButtonByText('Exit').trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(2);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/login');
  });
  it('call fetchData when paymentsList is empty', () => {
    createComponent();

    expect(actions.fetchData).toHaveBeenCalled();
  });
  it('click on about btn', async () => {
    createComponent();

    await findButtonByText('About').trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/about');
  });
});

describe('main page when state is empty', () => {
  let wrapper;
  let getters;
  let actions;
  let store;
  let vuetify;
  let router;
  let route;
  let localVue;
  let state;

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
      },
      path: '/dashboard',
    };
    vuetify = new Vuetify();

    state = {
      info: {},
    };

    getters = {
      getInfo: () => state.info,
      getPaymentsList: () => state.paymentsList,
    };
    actions = {
      fetchData: jest.fn(),
      fetchInfo: jest.fn(),
      logOut: jest.fn(),
    };

    store = new Vuex.Store({
      state,
      getters,
      actions,
    });
  });

  const createComponent = settings => {
    wrapper = mount(MainPage, {
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

  it('call action fetchInfo', () => {
    createComponent();

    expect(actions.fetchInfo).toHaveBeenCalled();
  });
});
