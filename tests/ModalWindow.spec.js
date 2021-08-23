import {
  shallowMount,
  enableAutoDestroy,
  createLocalVue,
} from '@vue/test-utils';
import ModalWindow from '../src/components/ModalWindowAddPayment';
import addPayment from '../src/components/addPayment';
import editPayment from '../src/components/editPayment';
import modal from '../src/plugins/ModalWindow';

const localVue = createLocalVue();
localVue.use(modal);

describe('modal window', () => {
  enableAutoDestroy(beforeEach);
  let wrapper;

  const createComponent = settings => {
    wrapper = shallowMount(ModalWindow, {
      localVue,
      propsData: {
        modalSettings: {
          ...settings,
        },
      },
    });
  };

  it('render modal add payment form ', () => {
    createComponent({ header: 'Add payment form', name: addPayment });
    expect(wrapper.findComponent(addPayment).exists()).toBe(true);
    expect(wrapper.text()).toContain('Add payment form');
  });
  it('render modal edit payment form', () => {
    createComponent({ header: 'Edit payment form', name: editPayment });
    expect(wrapper.findComponent(editPayment).exists()).toBe(true);
    expect(wrapper.text()).toContain('Edit payment form');
  });
  it('click closeModal on backdrop', () => {
    const spy = jest.spyOn(ModalWindow.methods, 'closeModal');
    createComponent({ header: 'Add payment form', name: addPayment });
    wrapper.find('[data-testid=close]').trigger('click');
    expect(spy).toHaveBeenCalled();
    wrapper.find('[data-testid=closeBtn]').trigger('click');
    expect(spy).toHaveBeenCalled();
  });
});
