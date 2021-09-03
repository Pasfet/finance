import Payments from '@/store/payments.js';
describe('Payments store mutations test', () => {
  it('set paymentsList', () => {
    const state = {
      paymentsList: [],
    };
    const payload = [
      { id: 1, category: 'test', value: 100, date: '10.05.2012' },
    ];

    Payments.mutations.setPaymentsList(state, payload);

    expect(state.paymentsList).toEqual([
      { id: 1, category: 'test', value: 100, date: '10.05.2012' },
    ]);
  });

  it('clear paymentsList', () => {
    const state = {
      paymentsList: [
        { id: 1, category: 'test', value: 100, date: '10.05.2012' },
      ],
    };

    Payments.mutations.clearPaymentsList(state);

    expect(state.paymentsList).toEqual([]);
  });

  it('set filteredList if payload is empty strong', () => {
    const state = {
      filteredList: [],
      paymentsList: [],
    };
    const payload = '';

    Payments.mutations.setFilteredList(state, payload);

    expect(state.filteredList).toEqual([]);
  });
  it('set filteredList if payload is Array', () => {
    const state = {
      filteredList: [],
      paymentsList: [
        { id: 1, category: 'test', value: 100, date: '10.05.2012' },
      ],
    };
    const payload = [];

    Payments.mutations.setFilteredList(state, payload);

    expect(state.filteredList).toEqual([
      { id: 1, category: 'test', value: 100, date: '10.05.2012' },
    ]);
  });

  it('set filteredList if in search', () => {
    const state = {
      paymentsList: [
        { id: 1, category: 'test', value: 100, date: '10.05.2012' },
        { id: 2, category: 'no', value: 100, date: '10.05.2012' },
      ],
      filteredList: [],
    };
    const payload = 'test';

    Payments.mutations.setFilteredList(state, payload);

    expect(state.filteredList).toEqual([
      { id: 1, category: 'test', value: 100, date: '10.05.2012' },
    ]);
  });

  it('clear filteredList', () => {
    const state = {
      filteredList: [
        { id: 1, category: 'test', value: 100, date: '10.05.2012' },
      ],
    };

    Payments.mutations.clearFilteredList(state);

    expect(state.filteredList).toEqual([]);
  });

  it('add to paymentsList', () => {
    const state = {
      paymentsList: [],
    };
    const payload = { id: 1, category: 'test', value: 100, date: '10.05.2012' };

    Payments.mutations.addToPaymentsList(state, payload);

    expect(state.paymentsList).toEqual([
      { id: 1, category: 'test', value: 100, date: '10.05.2012' },
    ]);
  });

  it('set categories', () => {
    const state = {
      categories: [],
      paymentsList: [
        { id: 1, category: 'test', value: 100, date: '10.05.2012' },
      ],
    };

    Payments.mutations.setCategoriesList(state);

    expect(state.categories).toEqual(['test']);
  });

  it('edit paymentList', () => {
    const state = {
      paymentsList: [
        { id: 1, category: 'test', value: 100, date: '10.05.2012' },
      ],
    };
    const payload = { id: 1, category: 'test', value: 200, date: '10.05.2012' };

    Payments.mutations.editPaymentList(state, payload);

    expect(state.paymentsList).toEqual([
      { id: 1, category: 'test', value: 200, date: '10.05.2012' },
    ]);
  });

  it('deletePayment from paymentsList', () => {
    const state = {
      paymentsList: [
        { id: 1, category: 'test', value: 100, date: '10.05.2012' },
        { id: 2, category: 'test2', value: 200, date: '10.05.2012' },
      ],
    };
    const payloadId = 2;

    Payments.mutations.deletedPayment(state, payloadId);

    expect(state.paymentsList).toEqual([
      { id: 1, category: 'test', value: 100, date: '10.05.2012' },
    ]);
  });
});
describe('Payments store getters test', () => {
  it('get paymentsList', () => {
    const state = {
      paymentsList: [
        { id: 1, category: 'test', value: 100, date: '10.05.2012' },
      ],
    };

    const res = Payments.getters.getPaymentsList(state);

    expect(res).toEqual([
      { id: 1, category: 'test', value: 100, date: '10.05.2012' },
    ]);
  });

  it('get filteredList', () => {
    const state = {
      filteredList: [
        { id: 1, category: 'test', value: 100, date: '10.05.2012' },
      ],
    };

    const res = Payments.getters.getFilteredList(state);

    expect(res).toEqual([
      { id: 1, category: 'test', value: 100, date: '10.05.2012' },
    ]);
  });

  it('get categories', () => {
    const state = {
      categories: ['category'],
    };

    const res = Payments.getters.getCategories(state);

    expect(res).toEqual(['category']);
  });

  it('get Pie chart data', () => {
    const state = {
      filteredList: [
        { id: 1, category: 'test', value: 100, date: '10.05.2012' },
      ],
    };

    const res = Payments.getters.getPieData(state);

    expect(res).toEqual([{ category: 'test', value: 100 }]);
  });
});
