
import { SET_CURRENT_VIEW } from 'actions/app-actions';

export const initialState = {
    currentView: null
};

export function appReducer(state = initialState, action) {
    var { type, payload } = action;
    switch (type) {
        case SET_CURRENT_VIEW:
            return { ...state, currentView: payload.id };
        default:
            return state;
    }
}
