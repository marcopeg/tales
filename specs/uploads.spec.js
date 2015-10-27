
import { FILTERS, resize } from 'utils/uploads';
import { MIXED, RUBY, JPEG_BIG } from './fixtures/uploads.fixture';

describe('uploads', () => {

    it('should filter images', () => {
        expect(MIXED.filter(FILTERS.image).length).to.equal(2);
    });

    it('should resize an image', done => {
        resize(JPEG_BIG, 50, resized => {
            expect(resized.b64.length).to.be.below(JPEG_BIG.b64.length);
            done();    
        });
        
    });

    it('a resized image should have a minimal size', done => {
        var img = new Image();
        img.onload = $=> {
            expect(img.width).to.be.at.least(50);
            expect(img.height).to.be.at.least(50);
            done();
        };
        resize(JPEG_BIG, 50, resized => {
            img.src = resized.b64;    
        });
    });

});
