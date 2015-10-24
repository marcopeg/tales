
import {
    updateItem,
    cancelEdit,
    setSaving,
    setLoading,
    removeItem
} from 'actions/characters-actions';

import { getRef } from 'services/firebase-service';

var charactersRef, charactersKeys;

export function init() {
    return (dispatch, getState) => {
        charactersRef = getRef('characters');
        charactersKeys = getRef('charactersKeys');

        charactersKeys.on('value', snap => {
            dispatch(setLoading(false));
        });

        charactersRef.on('child_added', snap => {
            dispatch(updateItem(snap.key(), snap.val()));
        });

        charactersRef.on('child_changed', snap => {
            dispatch(updateItem(snap.key(), snap.val()));
        });

        charactersRef.on('child_removed', snap => {
            dispatch(removeItem(snap.key(), snap.val()));
        });

    }
}

export function create(data) {
    return (dispatch, getState) => {
        dispatch(setSaving(true));
        var itemRef = charactersRef.push();
        itemRef.set(data, err => {
            charactersKeys.child(itemRef.key()).set(Date.now(), err => {
                dispatch(setSaving(false));
                dispatch(cancelEdit());
            });
        });
    }
}

export function save(id, data) {
    return (dispatch, getState) => {
        var itemRef = charactersRef.child(id);
        dispatch(setSaving(true));
        itemRef.update(data, err => {
            dispatch(setSaving(false));
            dispatch(cancelEdit());
        });
    }
}

export function remove(id) {
    return (dispatch, getState) => {
        var itemRef = charactersRef.child(id);
        dispatch(setSaving(true));
        itemRef.remove(err => {
            dispatch(setSaving(false));
        });
    }
}
