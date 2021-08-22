import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Display from '../src/components/PaymentsDisplay';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('display table', () => {
  let getters;
  let store;
  let actions;

  beforeEach(() => {
    getters = {
      getFullPaymentValue: () => '2000',
      getPieData: () => [
        { category: 'test', value: 100 },
        { category: 'test1', value: 200 },
      ],
    };
    actions = {
      fetchData: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  it('get full sum value & keys paymentsList', () => {
    const wrapper = shallowMount(Display, { store, localVue });
    wrapper.vm.paymentsList = {
      payments: {
        page1: [{ id: 1, date: '10.05.2021', category: 'test', value: 100 }],
      },
    };
    expect(wrapper.vm.paymentsList).toEqual({
      payments: {
        page1: [{ id: 1, date: '10.05.2021', category: 'test', value: 100 }],
      },
    });
    expect(typeof wrapper.vm.$options.computed.getFullSum).toBe('function');
    const td = wrapper.find('td[name=tdFull]');
    expect(td.text()).toBe(`Сумма расходов: ${getters.getFullPaymentValue()}`);
  });
});
