
import {
    START_CREATE,
    START_EDIT,
    CANCEL_EDIT,
    UPDATE_ITEM,
    REMOVE_ITEM,
    SET_SAVING,
    SET_LOADING
} from 'actions/characters-actions';

export const initialState = {
    items: {},
    activeItem: null,
    isLoading: true,
    isSaving: false
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
        case REMOVE_ITEM:
            var items = { ...state.items };
            delete(items[payload.id]);
            return { ...state, items };
        case SET_SAVING:
            return { ...state, isSaving: payload.value};
        case SET_LOADING:
            return { ...state, isLoading: payload.value};
        default:
            return state;
    }
}
