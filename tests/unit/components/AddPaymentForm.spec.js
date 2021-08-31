import Vuetify from 'vuetify';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { mount, createLocalVue, enableAutoDestroy } from '@vue/test-utils';

import AddPaymentForm from '@/components/AddPaymentFormDialog';

describe('Add payment form dialog', () => {
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
      ...settings,
    });
  };

  it('render add payment form', () => {
    createComponent({ propsData: { categories: [] } });

    expect(wrapper.text()).toContain('Add payment form');
  });
  it('checked checkbox', () => {
    createComponent({ propsData: { categories: [] } });

    wrapper.find('[data-testid=checkbox]').trigger('change');

    expect(wrapper.find('[data-testid=checkbox]')).toBeTruthy();
  });

  it('set category', async () => {
    createComponent({ propsData: { categories: [] } });

    const input = wrapper.find('[data-testid=categoryInput]');
    await input.setValue('test');

    expect(input.element.value).toBe('test');
  });
  it('set value', async () => {
    createComponent({ propsData: { categories: [] } });

    await wrapper.find('[data-testid=valueInput]').setValue('100');

    expect(wrapper.find('[data-testid=valueInput]').element.value).toBe('100');
  });
  it('click on close button', async () => {
    createComponent({ propsData: { categories: [] } });

    await findButtonByText('Close').trigger('click');
    wrapper.vm.$emit('closeModal');

    expect(wrapper.emitted().closeModal).toBeTruthy();
  });
  it('click add btn', async () => {
    const spy = jest.spyOn(AddPaymentForm.methods, 'addCost');
    createComponent({ propsData: { categories: [] } });

    await findButtonByText('Add').trigger('click');

    expect(spy).toHaveBeenCalledWith(expect.any(Object));
  });

  it('work watch on date', async () => {
    const spy = jest.spyOn(AddPaymentForm.methods, 'formatDate');
    createComponent({ propsData: { categories: [] } });

    const newDate = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10);

    await wrapper.setData({ date: newDate });

    expect(spy).toHaveBeenCalledWith(newDate);
  });
});
