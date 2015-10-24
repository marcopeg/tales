
import {
    updateItem,
    cancelEdit,
    setSaving,
    removeItem
} from 'actions/characters-actions';

import { getRef } from 'services/firebase-service';

var charactersRef;

export function init() {
    return (dispatch, getState) => {
        charactersRef = getRef('characters');

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
        charactersRef.push(data, err => {
            dispatch(setSaving(false));
            dispatch(cancelEdit());
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
