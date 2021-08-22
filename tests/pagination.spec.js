import { mount } from '@vue/test-utils';
import Pagination from '../src/components/PaginationComp';

describe('change page & change on first/last page', () => {
  const wrapper = mount(Pagination, {
    propsData: {
      totalLength: 20,
      perPage: 5,
      currentPage: 2,
    },
  });
  it('props total pages & start page & currentPage', () => {
    expect(wrapper.props('totalLength')).toBe(20);
    expect(wrapper.props('perPage')).toBe(5);
    expect(wrapper.props('currentPage')).toBe(2);
  });
  it('change page', () => {
    const arrowFirstPage = wrapper.find('button[name=onFirstPage]');
    const arrowPrevPage = wrapper.find('button[name=onPrevPage]');
    const arrowNextPage = wrapper.find('button[name=onNextPage]');
    const arrowLastPage = wrapper.find('button[name=onLastPage]');
    const changePage = wrapper.find('button[name=changePage]');
    arrowFirstPage.trigger('click');
    arrowPrevPage.trigger('click');
    arrowNextPage.trigger('click');
    arrowLastPage.trigger('click');
    changePage.trigger('click');
    wrapper.vm.$emit('pagechanged');
    expect(wrapper.emitted().pagechanged).toBeTruthy();
  });
});

describe('first/last pages', () => {
  it('first page', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        totalLength: 10,
        perPage: 5,
        currentPage: 1,
      },
    });
    expect(wrapper.props('currentPage')).toBe(1);
  });
  it('last page', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        totalLength: 10,
        perPage: 5,
        currentPage: 2,
      },
    });
    expect(wrapper.props('currentPage')).toBe(2);
  });
});
