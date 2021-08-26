import Vuetify from 'vuetify';
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  shallowMount,
  createLocalVue,
  enableAutoDestroy,
} from '@vue/test-utils';

import Pagination from '../../src/components/PaginationComp';

describe('pagination component', () => {
  enableAutoDestroy(beforeEach);
  let wrapper;
  let vuetify;
  let router;
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    Vue.use(Vuetify);
    localVue.use(VueRouter);
    vuetify = new Vuetify();
    router = new VueRouter();
  });

  const createComponent = settings => {
    wrapper = shallowMount(Pagination, {
      localVue,
      vuetify,
      router,
      ...settings,
    });
  };

  it('render pagination', () => {
    createComponent({ propsData: { length: 1 } });

    expect(wrapper.findComponent(Pagination).exists()).toBe(true);
  });

  it('valid props data', async () => {
    createComponent({ propsData: { length: 1 } });

    await wrapper.setProps({ length: 2 });

    expect(wrapper.vm.length).toBe(2);
  });

  it('emit input pagination', () => {
    createComponent({ propsData: { length: 5 } });

    wrapper.find('[data-testid=pagination]').trigger('change');
    wrapper.vm.$emit('changePage', 3);

    expect(wrapper.emitted().changePage).toEqual([[3]]);
  });
});
