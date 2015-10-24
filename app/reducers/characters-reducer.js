
import { BASIC } from '../../specs/characters.fixture';

import { START_EDIT, CANCEL_EDIT } from 'actions/characters-actions';

export const initialState = {
    items: BASIC,
    // activeItem: 'c7d677dd'
};

export function charactersReducer(state = initialState, action) {
    var { type, payload } = action;
    switch (type) {
        case START_EDIT:
            return { ...state, activeItem: payload.id };
        case CANCEL_EDIT:
            return { ...state, activeItem: null };
        default:
            return state;
    }
}
