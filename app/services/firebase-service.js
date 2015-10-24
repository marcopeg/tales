
import Firebase from 'firebase';

var fb;

export function initFirebase() {
    return (dispatch, getState) => {
        fb = new Firebase('https://trialbee.firebaseio.com/');
    }
}
