import {
  shallowMount,
  createLocalVue,
  enableAutoDestroy,
} from '@vue/test-utils';
import EditPaymentForm from '../src/components/editPayment';
import Vuex from 'vuex';
import { nextTick } from 'vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('display', () => {
  enableAutoDestroy(beforeEach);
  let wrapper;
  let actions;
  let store;

  const findButtonByText = text =>
    wrapper.findAll('button').wrappers.find(w => w.text() === text);

  const createComponent = () => {
    wrapper = shallowMount(EditPaymentForm, {
      store,
      localVue,
    });
  };
  beforeEach(() => {
    actions = {
      editPayment: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it('render edit payment modal', () => {
    const textBtnAdd = 'Edit';
    const textBtnCancel = 'Cancel';
    createComponent();
    expect(wrapper.text()).toContain(textBtnAdd);
    expect(wrapper.text()).toContain(textBtnCancel);
  });
  it('inputs category & value', async () => {
    createComponent();
    await wrapper.find('[data-testid=inputCategory]').setValue('Category');
    expect(wrapper.find('[data-testid=inputCategory]').element.value).toBe(
      'Category'
    );
    await wrapper.find('[data-testid=inputValue]').setValue('100');
    expect(wrapper.find('[data-testid=inputValue]').element.value).toBe('100');
  });
  it('on click cancel close modal', async () => {
    const buttonText = 'Cancel';
    const spy = jest.spyOn(EditPaymentForm.methods, 'onClose');
    createComponent();
    await findButtonByText(buttonText).trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });
  it('click edit button', async () => {
    const buttonText = 'Edit +';
    const spy = jest.spyOn(EditPaymentForm.methods, 'editPayment');
    createComponent();
    await wrapper.find('[data-testid=inputCategory]').setValue('Category');
    await wrapper.find('[data-testid=inputValue]').setValue('100');
    await findButtonByText(buttonText).trigger('click');
    expect(spy).toHaveBeenCalled();
    expect(actions.editPayment).toHaveBeenCalled();
  });
});
