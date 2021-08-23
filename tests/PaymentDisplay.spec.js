import {
  shallowMount,
  createLocalVue,
  enableAutoDestroy,
} from '@vue/test-utils';
import Display from '../src/components/PaymentsDisplay';
import contextMenu from '../src/plugins/ContextMenu/contextMenu';
import pagination from '../src/components/PaginationComp';
import PieChart from '../src/components/PieChart';
import Vuex from 'vuex';
import { nextTick } from 'vue';

const localVue = createLocalVue();
localVue.use(Vuex);

enableAutoDestroy(beforeEach);
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
        'pie-chart': PieChart,
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
  it('set data ', async () => {
    createComponent();
    await nextTick();
    expect(wrapper.vm.paymentsList).toEqual({
      payments: {
        page1: [{ id: 1, date: '10.05.2021', category: 'test', value: 100 }],
      },
    });
  });
  it('render data from vuex', async () => {
    createComponent();
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('1', '10.05.2021', 'test', '100');
  });
  it('getFullPayments', () => {
    createComponent();
    expect(wrapper.text()).toContain('2000');
  });
  it('render pagination', () => {
    createComponent();
    expect(wrapper.findComponent(pagination).exists()).toBe(true);
  });
  it('render context menu', () => {
    createComponent();
    expect(wrapper.findComponent(contextMenu).exists()).toBe(true);
  });
  it('click btn context menu', async () => {
    const spy = jest.spyOn(Display.methods, 'openContext');
    createComponent();
    await nextTick();
    await nextTick();
    wrapper.find('[data-testid=context]').trigger('click');
    expect(spy).toHaveBeenCalled();
  });
});
