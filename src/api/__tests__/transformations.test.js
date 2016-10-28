import { simplifyAggregations } from '../transformations';

const json = {
  aggregations: {
    '9f27d5a6ed65c4938ede65e536e5f6d4': {
      MultipleChoice: {
        'c873a345-185c-cdb1-aeeb-32b04cf4fc9a': {
          question: 'Which issue should be highest on the new presidentâ€™s agenda?',
          answers: {
            'b1cc14fffa31a73de64ba82e99ecfbe6': {
              answer: 'Social Issues',
              count: 2
            },
            '98a6399d1a49d929e8403bf9fce897e5': {
              answer: 'The Economy',
              count: 1
            }
          }
        }
      },
      count: 3
    },
    'd1bccc85fc14440d4201e4fa2a7a88a2': {
      MultipleChoice: {
        'c873a345-185c-cdb1-aeeb-32b04cf4fc9a': {
          question: 'Which issue should be highest on the new presidentâ€™s agenda?',
          answers: {
            'd91b20b62997b6bfe27473dd16675cfb': {
              answer: 'Energy and the Environment',
              count: 1
            },
            'de7a22a0c94aa64ba2449e520aa20c99': {
              answer: 'Education',
              count: 1
            }
          }
        }
      },
      count: 2
    }
  }
};

describe('API transformation utilities', () => {

  describe('simplifyAggregations', () => {

    it('is a defined function', () => {
      expect(simplifyAggregations).toBeDefined();
      expect(simplifyAggregations).toBeInstanceOf(Function);
    });

    it('correctly collapses intermediate nesting objects', () => {
      const result = simplifyAggregations(json.aggregations);
      expect(result).not.toEqual(json.aggregations);
      expect(result).toEqual({
        '9f27d5a6ed65c4938ede65e536e5f6d4': {
          'c873a345-185c-cdb1-aeeb-32b04cf4fc9a': {
            'b1cc14fffa31a73de64ba82e99ecfbe6': 2,
            '98a6399d1a49d929e8403bf9fce897e5': 1
          },
          count: 3
        },
        'd1bccc85fc14440d4201e4fa2a7a88a2': {
          'c873a345-185c-cdb1-aeeb-32b04cf4fc9a': {
            'd91b20b62997b6bfe27473dd16675cfb': 1,
            'de7a22a0c94aa64ba2449e520aa20c99': 1
          },
          count: 2
        }
      });
    });
  });

});
