import combinedReducer from '../reducer';

describe('reducers', () => {

  describe('rootReducer', () => {
    it('is a defined function', () => {
      expect(combinedReducer).toBeDefined();
      expect(combinedReducer).toBeInstanceOf(Function);
    });
  });

  it('generates an initial state object', () => {
    const irrelevantAction = {
      type: 'IRRELEVANT',
      payload: null
    };
    const combinedReducerDefaultState = combinedReducer(undefined, irrelevantAction);
    expect(combinedReducerDefaultState).toBeDefined();
    expect(combinedReducerDefaultState).toBeInstanceOf(Object);
  });

});
