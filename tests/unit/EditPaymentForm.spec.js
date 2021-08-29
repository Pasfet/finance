import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { mount, createLocalVue, enableAutoDestroy } from '@vue/test-utils';

import EditPaymentForm from '../../src/components/EditPaymentFormDialog';

describe('payment context menu', () => {
  enableAutoDestroy(beforeEach);
  let wrapper;
  let vuetify;
  let router;
  let localVue;
  let actions;
  let store;

  beforeEach(() => {
    localVue = createLocalVue();
    Vue.use(Vuetify);
    localVue.use(VueRouter);
    localVue.use(Vuex);
    vuetify = new Vuetify();
    router = new VueRouter();

    actions = {
      searchList: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
    });
  });

  const findButtonByText = text =>
    wrapper.findAll('.v-btn').wrappers.find(w => w.text() === text);

  const createComponent = settings => {
    wrapper = mount(EditPaymentForm, {
      localVue,
      vuetify,
      router,
      store,
      ...settings,
    });
  };

  it('render edit payment form', () => {
    createComponent({ propsData: { payment: {} } });

    expect(wrapper.exists()).toBe(true);
  });

  it('render edit payment form with props', async () => {
    createComponent({ propsData: { payment: {} } });
    await wrapper.setProps({
      payment: {
        id: 1,
        category: 'test',
        value: 100,
        date: '10.05.2012',
      },
    });

    expect(wrapper.vm.value).toBe(100);
    expect(wrapper.vm.category).toBe('test');
    expect(wrapper.vm.dateFormatted).toBe('10.05.2012');
    expect(wrapper.vm.id).toBe(1);
  });

  it('test watch on date', async () => {
    createComponent({ propsData: { payment: {} } });

    await wrapper.setData({ date: '10.05.2012' });

    expect(wrapper.vm.date).toBe('10.05.2012');
  });

  it('set category', async () => {
    createComponent({
      propsData: {
        payment: {
          id: 1,
          category: 'test',
          value: 100,
          date: '10.05.2021',
        },
      },
    });

    await wrapper.find('[data-testid=inputCategory]').setValue('test');

    expect(wrapper.find('[data-testid=inputCategory]').element.value).toBe(
      'test'
    );
  });

  it('set value', async () => {
    createComponent({
      propsData: {
        payment: {
          id: 1,
          category: 'test',
          value: 100,
          date: '10.05.2021',
        },
      },
    });

    await wrapper.find('[data-testid=inputValue]').setValue('100');

    expect(wrapper.find('[data-testid=inputValue]').element.value).toBe('100');
  });

  it('click close modal', async () => {
    const spy = jest.spyOn(EditPaymentForm.methods, 'closeModal');
    createComponent({
      propsData: {
        payment: {
          id: 1,
          category: 'test',
          value: 100,
          date: '10.05.2021',
        },
      },
    });

    await findButtonByText('Close').trigger('click');

    expect(wrapper.emitted().closeEdit).toEqual([[]]);
    expect(spy).toHaveBeenCalled();
  });

  it('click edit btn', async () => {
    const spy = jest.spyOn(EditPaymentForm.methods, 'closeModal');
    createComponent({
      propsData: {
        payment: {
          id: 1,
          category: 'test',
          value: 100,
          date: '10.05.2021',
        },
      },
    });

    await findButtonByText('Edit').trigger('click');

    expect(wrapper.emitted().editPayment).toEqual([[expect.any(Object)]]);
    expect(spy).toHaveBeenCalled();
    expect(actions.searchList).toHaveBeenCalled();
  });
});
