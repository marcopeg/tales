
import { FILTERS } from 'utils/uploads';
import { MIXED, RUBY } from './fixtures/uploads.fixture';

describe('uploads', () => {

    it('should filter images', () => {
        expect(MIXED.filter(FILTERS.image).length).to.equal(2);
    });

});
