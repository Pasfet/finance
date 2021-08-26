import Vuetify from 'vuetify';
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  shallowMount,
  mount,
  createLocalVue,
  enableAutoDestroy,
} from '@vue/test-utils';

import AddPaymentForm from '../../src/components/AddPaymentFormDialog';

describe('main page', () => {
  enableAutoDestroy(beforeEach);
  let wrapper;
  let vuetify;
  let router;
  let localVue;

  const findButtonByText = text =>
    wrapper.findAll('.v-btn').wrappers.find(w => w.text() === text);

  beforeEach(() => {
    localVue = createLocalVue();
    Vue.use(Vuetify);
    localVue.use(VueRouter);
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  const createComponent = settings => {
    wrapper = mount(AddPaymentForm, {
      localVue,
      vuetify,
      router,
      propsData: {
        categories: [],
        lastId: 0,
      },
      ...settings,
    });
  };

  it('render add payment form', () => {
    createComponent();

    expect(wrapper.text()).toContain('Add payment form');
  });
  it('checked checkbox', () => {
    createComponent();

    wrapper.find('[data-testid=checkbox]').trigger('change');

    expect(wrapper.find('[data-testid=checkbox]')).toBeTruthy();
  });

  it('set category', async () => {
    createComponent();

    const input = wrapper.find('[data-testid=categoryInput]');
    await input.setValue('test');

    expect(input.element.value).toBe('test');
  });
  it('set value', async () => {
    createComponent();

    await wrapper.find('[data-testid=valueInput]').setValue('100');

    expect(wrapper.find('[data-testid=valueInput]').element.value).toBe('100');
  });
  it('click on close button', async () => {
    createComponent();

    await findButtonByText('Close').trigger('click');
    wrapper.vm.$emit('closeModal');

    expect(wrapper.emitted().closeModal).toBeTruthy();
  });
  it('click add btn', async () => {
    const spy = jest.spyOn(AddPaymentForm.methods, 'addCost');
    createComponent();

    await findButtonByText('Add').trigger('click');

    expect(spy).toHaveBeenCalledWith(expect.any(Object));
  });
});
