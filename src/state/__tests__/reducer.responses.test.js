import combinedReducer from '../reducer';
import { responses } from '../reducer';

describe('responses reducer', () => {
  const irrelevantAction = {
    type: 'IRRELEVANT',
    payload: null
  };
  const combinedReducerDefaultState = combinedReducer(undefined, irrelevantAction);

  const defaultState = {
    dictionary: {},
    order: [],
    collections: {},
    selected: {},
    isFetching: null
  };

  it('is a defined function', () => {
    expect(responses).toBeDefined();
    expect(responses).toBeInstanceOf(Function);
  });

  it('generates the default state', () => {
    const result = responses(undefined, irrelevantAction);
    expect(result).toEqual(defaultState);
  });

  it('is represented in the combined default state', () => {
    expect(combinedReducerDefaultState.responses).toEqual(defaultState)
  });

  describe('RECEIVE_FORM_DIGEST handler', () => {
    it('populates the state when data is received', () => {
      const result = responses(defaultState, {
        type: 'RECEIVE_FORM_DIGEST',
        payload: {
          questions: {
            '111': {
              id: '111',
              type: 'MultipleChoice',
              group_by: true,
              options: [
                { id: 'aaa', value: 'meh' },
                { id: 'bbb', value: 'woo' },
                { id: 'ccc', value: 'boo' }
              ]
            },
            '222': {
              id: '222',
              type: 'TextField',
              group_by: false
            }
          },
          aggregations: {},
          submissions: [
            { id: '01234', sentiment: 'meh' },
            { id: '56789', sentiment: 'woo' },
            { id: '10111', sentiment: 'boo' }
          ]
        }
      });

      expect(result).toEqual({
        collections: {},
        dictionary: {
          '01234': { id: '01234', sentiment: 'meh' },
          '56789': { id: '56789', sentiment: 'woo' },
          '10111': { id: '10111', sentiment: 'boo' }
        },
        order: [
          '01234',
          '56789',
          '10111'
        ],
        isFetching: {
          aaa: false,
          bbb: false,
          ccc: false
        },
        selected: {}
      });
    });
  });

  describe('REQUEST_RESPONSES handler', () => {
    it('sets the correct isFetching flag', () => {
      const result = responses({
        dictionary: {},
        order: [],
        collections: {},
        selected: {},
        isFetching: {
          aaa: false
        }
      }, {
        type: 'REQUEST_RESPONSES',
        payload: 'aaa'
      });

      expect(result).toEqual({
        dictionary: {},
        order: [],
        collections: {},
        selected: {},
        isFetching: {
          aaa: true
        }
      });
    });
  });

  describe('RECEIVE_RESPONSES handler', () => {
    it('correctly merges incoming responses into the state', () => {
      const initialState = {
        collections: {},
        dictionary: {
          '01234': { id: '01234', sentiment: 'meh' },
          '56789': { id: '56789', sentiment: 'woo' },
          '10111': { id: '10111', sentiment: 'boo' }
        },
        order: [
          '01234',
          '56789',
          '10111'
        ],
        isFetching: {
          aaa: false,
          bbb: true,
          ccc: false
        }
      };
      const result = responses(initialState, {
        type: 'RECEIVE_RESPONSES',
        payload: {
          answerId: 'bbb',
          submissions: [
            { id: '11235', sentiment: 'woo' },
            { id: '84924', sentiment: 'boo' },
            { id: '56789', sentiment: 'woo' },
            { id: '10013', sentiment: 'meh' }
          ]
        }
      });
      expect(result).toEqual({
        collections: {
          bbb: ['11235', '84924', '56789', '10013']
        },
        dictionary: {
          '01234': { id: '01234', sentiment: 'meh' },
          '56789': { id: '56789', sentiment: 'woo' },
          '10111': { id: '10111', sentiment: 'boo' },
          '11235': { id: '11235', sentiment: 'woo' },
          '84924': { id: '84924', sentiment: 'boo' },
          '10013': { id: '10013', sentiment: 'meh' }
        },
        order: [
          '01234',
          '56789',
          '10111',
          '11235',
          '84924',
          '10013'
        ],
        isFetching: {
          aaa: false,
          bbb: false,
          ccc: false
        },
        selected: {
          bbb: '11235'
        }
      })
    });
  });

});
