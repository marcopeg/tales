
import { START_CREATE, START_EDIT, CANCEL_EDIT, UPDATE_ITEM } from 'actions/characters-actions';

export const initialState = {
    items: {},
    activeItem: null
};

export function charactersReducer(state = initialState, action) {
    var { type, payload } = action;
    switch (type) {
        case START_CREATE:
            return { ...state, activeItem: type };
        case START_EDIT:
            return { ...state, activeItem: payload.id };
        case CANCEL_EDIT:
            return { ...state, activeItem: null };
        case UPDATE_ITEM:
            var items = { ...state.items };
            items[payload.id] = payload.data;
            return { ...state, items };
        default:
            return state;
    }
}
