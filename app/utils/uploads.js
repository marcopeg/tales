
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


        // if (width > minSize) {
        //     ratio = minSize / width;
        // } else if (height > minSize) {
        //     ratio = minSize / height;
        // }

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

