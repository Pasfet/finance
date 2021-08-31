import Info from '@/store/info.js';
describe('Info store test', () => {
  it('set info', () => {
    const state = {
      info: {},
    };

    const info = {
      name: 'name',
    };

    Info.mutations.setInfo(state, info);

    expect(state.info).toEqual({ name: 'name' });
  });

  it('clear info', () => {
    const state = {
      info: {
        name: 'name',
      },
    };

    Info.mutations.clearInfo(state);

    expect(state.info).toEqual({});
  });

  it('get info', () => {
    const state = {
      info: {
        name: 'testName',
      },
    };

    const getInfo = Info.getters.getInfo(state);

    expect(getInfo).toEqual({ name: 'testName' });
  });
});
