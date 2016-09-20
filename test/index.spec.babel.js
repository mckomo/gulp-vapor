import {expect, assert} from 'chai';

import vapor from '../scripts/index';
import Config from '../scripts/config';

describe('vapor', () => {
  it('uses default config', () => {
    expect(vapor.config).to.eq(Config);
  });

});
