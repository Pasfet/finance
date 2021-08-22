import { mount } from '@vue/test-utils';
import PieChart from '../src/components/PieChart';

describe('pie chart', () => {
  const wrapper = mount(PieChart, {
    propsData: {
      chartDate: [
        { category: 'Sport', value: 100 },
        { category: 'Trans', value: 200 },
        { category: 'Finance', value: 500 },
      ],
    },
  });
  it('get categories', () => {
    expect(wrapper.props('chartDate')).toEqual([
      { category: 'Sport', value: 100 },
      { category: 'Trans', value: 200 },
      { category: 'Finance', value: 500 },
    ]);
  });
  it('watchers', () => {
    wrapper.vm.$options.watch.getData.call(wrapper.vm);
    wrapper.vm.$options.watch.getCategories.call(wrapper.vm);
    expect(wrapper.vm.$options.watch.getData).toBeTruthy();
    expect(wrapper.vm.$options.watch.getCategories).toBeTruthy();
  });
});
