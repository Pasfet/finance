import Auth from '@/store/auth.js';
describe('Auth store test', () => {
  const dispatch = jest.fn();
  const commit = jest.fn();

  const user = {
    email: 'test@test.com',
    name: 'Username',
    password: '123456',
  };

  it('get error', () => {
    const state = {
      error: 'error',
    };
    const getError = Auth.getters.getError(state);

    expect(getError).toBe('error');
  });

  it('mutation setError', () => {
    const state = {
      error: null,
    };

    Auth.mutations.setError(state, 'error');

    expect(state.error).toBe('error');
  });

  it('clear state error', () => {
    const state = {
      error: 'error',
    };

    Auth.mutations.clearError(state);

    expect(state.error).toBeNull();
  });

  it('actions signUp with fail', async () => {
    const spy = jest.spyOn(Auth.actions, 'signUp');

    await Auth.actions.signUp({ dispatch, commit }, user);

    expect(spy).toHaveBeenCalled();
    expect(commit).toHaveBeenCalledWith('setError', expect.any(Error));
  });
});
