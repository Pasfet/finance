import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import EditPayment from '../src/components/editPayment';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('edit form', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      editPayment: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it('click edit button', () => {
    const wrapper = shallowMount(EditPayment, { store, localVue });
    wrapper.find('input[name=category]').setValue('Test');
    expect(wrapper.vm.category).toBe('Test');
    wrapper.find('input[name=value]').setValue('20');
    expect(wrapper.vm.value).toBe('20');
    wrapper.find('button[name=edit]').trigger('click');
    expect(actions.editPayment).toHaveBeenCalled();
  });
  it('cancel form', () => {
    const spy = jest.spyOn(EditPayment.methods, 'onClose');
    const wrapper = shallowMount(EditPayment);
    wrapper.find('button[name=cancel]').trigger('click');
    expect(spy).toHaveBeenCalled();
  });
});
