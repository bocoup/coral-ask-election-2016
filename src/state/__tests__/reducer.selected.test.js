import combinedReducer from '../reducer';
import { selected } from '../reducer';

describe('reducers', () => {
  const irrelevantAction = {
    type: 'IRRELEVANT',
    payload: null
  };
  const combinedReducerDefaultState = combinedReducer(undefined, irrelevantAction);

  describe('selected', () => {
    it('is a defined function', () => {
      expect(selected).toBeDefined();
      expect(selected).toBeInstanceOf(Function);
    });

    it('sets the correct default state', () => {
      const result = selected(undefined, irrelevantAction);
      expect(result).toBeNull();
    });

    it('is represented in the combined default state', () => {
      expect(combinedReducerDefaultState.selected).toBeNull();
    });

    it('can set the selected emoji', () => {
      const result = selected(null, {
        type: 'SELECT_EMOJI',
        payload: '✨'
      });
      expect(result).toBe('✨');
    });

    it('can change the selected emoji', () => {
      const result = selected('✨', {
        type: 'SELECT_EMOJI',
        payload: '❄'
      });
      expect(result).toBe('❄');
    });

    it('can deselect the current emoji', () => {
      const result = selected('✨', {
        type: 'SELECT_EMOJI',
        payload: '✨'
      });
      expect(result).toBe(null);
    });
  });

});
