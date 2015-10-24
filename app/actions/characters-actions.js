
export const START_EDIT = 'characters@startEdit';
export const CANCEL_EDIT = 'characters@cancelEdit';

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
