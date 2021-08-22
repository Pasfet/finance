import { mount, createLocalVue, config } from '@vue/test-utils';
import Modal from '../src/components/ModalWindowAddPayment';

describe('modal window add', () => {
  it('close modal & addPayment', () => {
    const wrapper = mount(Modal, {
      propsData: {
        modalSettings: {
          header: 'Add',
          name: 'addPayment',
          footer: 'footer',
        },
      },
    });
    expect(wrapper.props('modalSettings')).toEqual({
      header: 'Add',
      name: 'addPayment',
      footer: 'footer',
    });
  });

  it('modal edit', () => {
    const wrapper = mount(Modal, {
      propsData: {
        modalSettings: {
          header: 'Add',
          name: 'editPayment',
          footer: 'footer',
        },
      },
    });
    expect(wrapper.props('modalSettings')).toEqual({
      header: 'Add',
      name: 'editPayment',
      footer: 'footer',
    });

    const closeModal = jest.fn();
    wrapper.setMethods({ closeModal });
    wrapper.find('button[name=closeModalWindow]').trigger('click');
    expect(closeModal).toBeCalled();
  });
});
