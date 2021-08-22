import { shallowMount } from '@vue/test-utils';
import Pagination from '../src/components/PaginationComp';

describe('pagination components', () => {
  let wrapper;

  const totalLength = 20,
    perPage = 5,
    currentPage = 2,
    maxVisibleButtons = 5,
    arrows = true,
    arrowsInitMax = true,
    totalPages = Math.ceil(totalLength / perPage);

  const createComponent = () => {
    wrapper = shallowMount(Pagination, {
      propsData: {
        totalLength: totalLength,
        perPage: perPage,
        currentPage: currentPage,
        arrows: arrows,
        arrowsInitMax: arrowsInitMax,
        maxVisibleButtons: maxVisibleButtons,
      },
    });
  };

  const findButtonByText = text =>
    wrapper.findAll('button').wrappers.find(w => w.text() === text);

  afterEach(() => {
    wrapper.destroy();
  });

  it('render pagination', () => {
    createComponent();
    expect(wrapper.text()).toContain('1', '2', '3', '4');
  });
  it('render arrows-prev/next pages pagination', () => {
    createComponent();
    expect(wrapper.html()).toContain('‹', '›');
  });
  it('render arrows-first/last pages pagination', () => {
    createComponent();
    expect(wrapper.html()).toContain('«', '»');
  });

  it('click on button emitted events pagechange', async () => {
    const clickNumberPage = '1';
    createComponent();
    await findButtonByText(clickNumberPage).trigger('click');
    wrapper.vm.$emit('pagechange', clickNumberPage);
    expect(wrapper.emitted().pagechange).toStrictEqual([[clickNumberPage]]);
  });
  it('click prev arrow', async () => {
    const clickNumberPage = '‹';
    createComponent();
    await findButtonByText(clickNumberPage).trigger('click');
    wrapper.vm.$emit('pagechange', currentPage - 1);
    expect(wrapper.emitted().pagechange).toStrictEqual([[currentPage - 1]]);
  });
  it('click next arrow', async () => {
    const clickNumberPage = '›';
    createComponent();
    await findButtonByText(clickNumberPage).trigger('click');
    wrapper.vm.$emit('pagechange', currentPage + 1);
    expect(wrapper.emitted().pagechange).toStrictEqual([[currentPage + 1]]);
  });
  it('click firstPage arrow', async () => {
    const clickNumberPage = '«';
    createComponent();
    await findButtonByText(clickNumberPage).trigger('click');
    wrapper.vm.$emit('pagechange', 1);
    expect(wrapper.emitted().pagechange).toStrictEqual([[1]]);
  });
  it('click lastPage arrow', async () => {
    const clickNumberPage = '»';
    createComponent();
    await findButtonByText(clickNumberPage).trigger('click');
    wrapper.vm.$emit('pagechange', totalPages);
    expect(wrapper.emitted().pagechange).toStrictEqual([[totalPages]]);
  });
});
