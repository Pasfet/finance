import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import AddPayment from '../src/components/addPayment';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('add payment form', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      addPayment: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });
  it('click add button', () => {
    const wrapper = shallowMount(AddPayment, { store, localVue });
    wrapper.find('input[name=category]').setValue('Test');
    expect(wrapper.vm.category).toBe('Test');
    wrapper.find('input[name=value]').setValue('20');
    expect(wrapper.vm.value).toBe('20');
    wrapper.find('button[name=add]').trigger('click');
    expect(actions.addPayment).toHaveBeenCalled();
  });
  it('cancel form', () => {
    const spy = jest.spyOn(AddPayment.methods, 'onClose');
    const wrapper = shallowMount(AddPayment);
    wrapper.find('button[name=cancel]').trigger('click');
    expect(spy).toHaveBeenCalled();
  });
});
