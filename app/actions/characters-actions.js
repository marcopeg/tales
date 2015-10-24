
export const START_EDIT = 'characters@startEdit';
export const CANCEL_EDIT = 'characters@cancelEdit';
export const UPDATE_ITEM = 'characters@updateItem';

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
