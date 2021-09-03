import { mount, enableAutoDestroy } from '@vue/test-utils';

import PieChart from '@/components/PieChart';

describe('Pie chart', () => {
  enableAutoDestroy(beforeEach);

  it('render pie chart', () => {
    const wrapper = mount(PieChart, {
      propsData: {
        chartData: [
          { id: 1, category: 'test', value: 100, date: '10.05.2012' },
        ],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('test watcher on chartData props', async () => {
    const wrapper = mount(PieChart, {
      propsData: {
        chartData: [
          { id: 1, category: 'test', value: 100, date: '10.05.2012' },
        ],
      },
    });

    await wrapper.setProps({
      chartData: [{ id: 2, category: 'test2', value: 200, date: '15.05.2012' }],
    });

    expect(wrapper.vm.chartdata.datasets[0].data).toEqual([200]);
  });

  it('call updatePie methods', async () => {
    const spy = jest.spyOn(PieChart.methods, 'updatePie');
    const wrapper = mount(PieChart, {
      propsData: {
        chartData: [
          { id: 1, category: 'test', value: 100, date: '10.05.2012' },
        ],
      },
    });

    expect(spy).toHaveBeenCalled();
  });

  it('change label from wather', async () => {
    const wrapper = mount(PieChart, {
      propsData: { chartData: [] },
    });

    await wrapper.setProps({
      chartData: [{ id: 1, category: 'nav', value: 100, date: '20.05.2012' }],
    });

    expect(wrapper.vm.chartdata.labels).toEqual(['nav']);
  });
});
