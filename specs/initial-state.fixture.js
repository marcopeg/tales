
import * as app from './app.fixture';
import * as characters from './characters.fixture';

export const CHARACTERS = {
    app: app.CHARACTERS,
    characters: { ...characters.BASIC, activeItem: null }
};

export const CHARACTERS_ACTIVE = {
    app: app.CHARACTERS,
    characters: { ...characters.BASIC, activeItem: Object.keys(characters.BASIC.items)[0] }
};

export const LOCATIONS = {
    app: app.LOCATIONS
};
