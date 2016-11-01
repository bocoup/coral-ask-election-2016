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
        topic: null,
        topicEmoji: null
      });
    });

    it('is represented in the combined default state', () => {
      expect(combinedReducerDefaultState.selected).toEqual({
        emoji: null,
        topic: null,
        topicEmoji: null
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

    it('cannot deselect the current emoji', () => {
      const result = selected({
        emoji: '✨'
      }, {
        type: 'SELECT_EMOJI',
        payload: '✨'
      });
      expect(result.emoji).toBe('✨');
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

    it('cannot deselect the current topic', () => {
      const result = selected({
        topic: 'Education'
      }, {
        type: 'SELECT_TOPIC',
        payload: 'Education'
      });
      expect(result.topic).toBe('Education');
    });

    it('can set the selected emoji within a topic', () => {
      const result = selected({}, {
        type: 'SELECT_TOPIC_EMOJI',
        payload: '✨'
      });
      expect(result.topicEmoji).toBe('✨');
    });

    it('can change the selected emoji within a topic', () => {
      const result = selected({
        topicEmoji: '✨'
      }, {
        type: 'SELECT_TOPIC_EMOJI',
        payload: '❄'
      });
      expect(result.topicEmoji).toBe('❄');
    });

    it('cannot deselect the current emoji within a topic', () => {
      const result = selected({
        topicEmoji: '✨'
      }, {
        type: 'SELECT_TOPIC_EMOJI',
        payload: '✨'
      });
      expect(result.topicEmoji).toBe('✨');
    });
  });

});
