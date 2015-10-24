
import Firebase from 'firebase';

var fb;

export function init() {
    return (dispatch, getState) => {
        fb = new Firebase('https://tales.firebaseio.com/');
    }
}

export function getRef(path) {
    return fb.child(path);
}
