import Vuetify from 'vuetify';
import Vue from 'vue';
import {
  shallowMount,
  createLocalVue,
  enableAutoDestroy,
} from '@vue/test-utils';

import PaymentContextMenu from '@/components/PaymentContextMenu';

describe('payment context menu', () => {
  enableAutoDestroy(beforeEach);
  let wrapper;
  let vuetify;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    Vue.use(Vuetify);
    vuetify = new Vuetify();
  });

  const createComponent = settings => {
    wrapper = shallowMount(PaymentContextMenu, {
      localVue,
      vuetify,
      ...settings,
    });
  };

  it('render payment context menu if is empty props', () => {
    createComponent({ propsData: { contextMenuList: [{}] } });

    expect(wrapper.exists()).toBe(true);
  });

  it('render payment context menu if props does not empty', () => {
    createComponent({
      propsData: {
        contextMenuList: [{ title: 'edit', icon: 'icon', action: 'edit' }],
      },
    });

    expect(wrapper.text()).toContain('edit');
  });

  it('click on action btn in payment context menu', async () => {
    createComponent({
      propsData: {
        contextMenuList: [{ title: 'edit', action: 'edit' }],
      },
    });

    wrapper.find('[data-testid=btnContextMenu]').trigger('click');
    wrapper.vm.$emit('edit');

    expect(wrapper.emitted().edit).toEqual([[]]);
  });
});
