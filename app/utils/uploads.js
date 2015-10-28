
function filterImages(file) {
    return file.type.indexOf('image/') !== -1;
}

export const FILTERS = {
    image: filterImages
}

export function resize(original, minSize, done) {
    var img = new Image();
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var ratio = 1;
    var b64;

    img.onload = $=> {
        var { width, height } = img;

        if (width < height) {
            ratio = minSize / width;
        } else {
            ratio = minSize / height;
        }

        canvas.width = width * ratio;
        canvas.height = height * ratio;
        ctx.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
        b64 = canvas.toDataURL(original.type);

        done({...original, 
            b64: b64,
            size: Math.round(b64.length / 1.37)
        });
    }

    img.src = original.b64;
}

export function crop(original, size, done) {
    var img = new Image();
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var resized, b64;

    img.onload = $=> {
        var { width, height } = img;

        // no need to crop a squared image
        if (width === height) {
            done(resized);
            return;
        }

        canvas.width = size;
        canvas.height = size;

        if (width >= height) {
            ctx.drawImage(img, (width - size) / 2, 0, size, size, 0, 0, size, size);
        } else if (height > width) {
            ctx.drawImage(img, 0, (height - size) / 2, size, size, 0, 0, size, size);
        }

        b64 = canvas.toDataURL(original.type);
        done({...original, 
            b64: b64,
            size: Math.round(b64.length / 1.37)
        });
    };

    resize(original, size, _resized => {
        resized = _resized;
        img.src = _resized.b64;
    });
}
