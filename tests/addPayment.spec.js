import {
  shallowMount,
  createLocalVue,
  enableAutoDestroy,
} from '@vue/test-utils';
import AddPaymentForm from '../src/components/addPayment';
import Vuex from 'vuex';
import { nextTick } from 'vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('display', () => {
  enableAutoDestroy(beforeEach);
  let wrapper;
  let getters;
  let actions;
  let store;

  const findButtonByText = text =>
    wrapper.findAll('button').wrappers.find(w => w.text() === text);

  const createComponent = () => {
    wrapper = shallowMount(AddPaymentForm, {
      store,
      localVue,
    });
  };
  beforeEach(() => {
    getters = {
      getCategories: () => ['category1', 'category2'],
      getLastId: () => {
        5;
      },
    };
    actions = {
      addPayment: jest.fn(),
    };
    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  it('render add payment modal', () => {
    const textBtnAdd = 'Add';
    const textBtnCancel = 'Cancel';
    createComponent();
    expect(wrapper.text()).toContain(textBtnAdd);
    expect(wrapper.text()).toContain(textBtnCancel);
  });
  it('checked checkbox select category', async () => {
    createComponent();
    await wrapper.find('[data-testid=select]').setChecked();
    await nextTick();
    expect(wrapper.vm.isCategory).toBe(true);
  });
  it('enter category from select', async () => {
    createComponent();
    await wrapper.find('[data-testid=select]').setChecked();
    await nextTick();
    expect(wrapper.find('[data-testid=selected]').text()).toContain(
      'category1',
      'category2'
    );
    const options = wrapper.find('[data-testid=selected]').findAll('option');
    await options.at(1).setSelected();
    expect(wrapper.find('option:checked').element.value).toBe('category2');
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
    const spy = jest.spyOn(AddPaymentForm.methods, 'onClose');
    createComponent();
    await findButtonByText(buttonText).trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });
  it('on click add cost', async () => {
    const buttonText = 'Add +';
    const spy = jest.spyOn(AddPaymentForm.methods, 'addCost');
    createComponent();
    await findButtonByText(buttonText).trigger('click');
    expect(spy).toHaveBeenCalled();
    expect(actions.addPayment).toHaveBeenCalled();
  });
});
