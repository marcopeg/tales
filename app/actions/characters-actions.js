
export const START_CREATE = 'characters@startCreate';
export const START_EDIT = 'characters@startEdit';
export const CANCEL_EDIT = 'characters@cancelEdit';
export const UPDATE_ITEM = 'characters@updateItem';
export const REMOVE_ITEM = 'characters@removeItem';
export const SET_SAVING = 'characters@setSaving';
export const SET_LOADING = 'characters@setLoading';

export function startCreate() {
    return {
        type: START_CREATE
    }
}

export function startEdit(id) {
    return {
        type: START_EDIT,
        payload: { id }
    }
}

export function cancelEdit() {
    return {
        type: CANCEL_EDIT
    }
}

export function updateItem(id, data) {
    return {
        type: UPDATE_ITEM,
        payload: { id, data }
    }
}

export function removeItem(id) {
    return {
        type: REMOVE_ITEM,
        payload: { id }
    }
}

export function setSaving(value) {
    return {
        type: SET_SAVING,
        payload: { value: !!value }
    }
}

export function setLoading(value) {
    return {
        type: SET_LOADING,
        payload: { value: !!value }
    }
}
