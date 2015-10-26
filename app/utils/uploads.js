
function filterImages(file) {
    return file.type.indexOf('image/') !== -1;
}

export const FILTERS = {
    image: filterImages
}

