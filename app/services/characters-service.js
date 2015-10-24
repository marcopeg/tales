
import {
    updateItem,
    cancelEdit,
    setSaving
} from 'actions/characters-actions';

export function create(data) {
    return (dispatch, getState) => {
        dispatch(setSaving(true));
        setTimeout($=> dispatch(setSaving(false)), 1000);
        setTimeout($=> dispatch(updateItem(Date.now(), data)), 1000);
        setTimeout($=> dispatch(cancelEdit()), 1000);
    }
}

export function save(id, data) {
    return (dispatch, getState) => {
        dispatch(setSaving(true));
        setTimeout($=> dispatch(setSaving(false)), 1000);
        setTimeout($=> dispatch(updateItem(id, data)), 1000);
        setTimeout($=> dispatch(cancelEdit()), 1000);
    }
}
