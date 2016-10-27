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
      expect(result).toEqual({
        emoji: null,
        topic: null
      });
    });

    it('is represented in the combined default state', () => {
      expect(combinedReducerDefaultState.selected).toEqual({
        emoji: null,
        topic: null
      });
    });

    it('can set the selected emoji', () => {
      const result = selected({}, {
        type: 'SELECT_EMOJI',
        payload: '✨'
      });
      expect(result.emoji).toBe('✨');
    });

    it('can change the selected emoji', () => {
      const result = selected({
        emoji: '✨'
      }, {
        type: 'SELECT_EMOJI',
        payload: '❄'
      });
      expect(result.emoji).toBe('❄');
    });

    it('can deselect the current emoji', () => {
      const result = selected({
        emoji: '✨'
      }, {
        type: 'SELECT_EMOJI',
        payload: '✨'
      });
      expect(result.emoji).toBe(null);
    });

    it('can set the selected topic', () => {
      const result = selected({}, {
        type: 'SELECT_TOPIC',
        payload: 'Education'
      });
      expect(result.topic).toBe('Education');
    });

    it('can change the selected topic', () => {
      const result = selected({
        topic: 'Education'
      }, {
        type: 'SELECT_TOPIC',
        payload: 'Economy'
      });
      expect(result.topic).toBe('Economy');
    });

    it('can deselect the current topic', () => {
      const result = selected({
        topic: 'Education'
      }, {
        type: 'SELECT_TOPIC',
        payload: 'Education'
      });
      expect(result.topic).toBe(null);
    });
  });

});
