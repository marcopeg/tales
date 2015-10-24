
export const SET_CURRENT_VIEW = 'app@setCurrentView';

export function setCurrentView(id) {
    return {
        type: SET_CURRENT_VIEW,
        payload: { id }
    }
}
