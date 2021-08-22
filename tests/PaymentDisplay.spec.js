import { shallowMount, createLocalVue } from '@vue/test-utils';
import Display from '../src/components/PaymentsDisplay';
import contextMenu from '../src/plugins/ContextMenu/contextMenu';
import pagination from '../src/components/PaginationComp';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('display', () => {
  let wrapper;
  let getters;
  let actions;
  let store;

  const createComponent = () => {
    wrapper = shallowMount(Display, {
      store,
      localVue,
      stubs: {
        'context-menu': contextMenu,
        'pagination-comp': pagination,
      },
    });
  };

  beforeEach(() => {
    getters = {
      getFullPaymentValue: () => '2000',
      getPieData: () => [
        { category: 'test', value: 100 },
        { category: 'test1', value: 200 },
      ],
      getPaymentsList: () => {
        return {
          page1: [{ id: 1, date: '10.05.2021', category: 'test', value: 100 }],
        };
      },
    };
    actions = {
      fetchData: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  it('render table', () => {
    createComponent();
    expect(wrapper.text()).toContain('#', 'Date', 'Category', 'Value');
  });
  it('set data ', () => {
    expect(wrapper.vm.paymentsList).toEqual({
      payments: {
        page1: [{ id: 1, date: '10.05.2021', category: 'test', value: 100 }],
      },
    });
  });
  it('render data from vuex', () => {
    expect(wrapper.text()).toContain('1', '10.05.2021', 'test', '100');
  });
  it('getFullPayments', () => {
    expect(wrapper.text()).toContain('2000');
  });
});
