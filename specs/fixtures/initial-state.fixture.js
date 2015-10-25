
import { START_CREATE } from 'actions/characters-actions';
import * as app from './app.fixture';
import * as characters from './characters.fixture';

export const DEV = {
    app: { ...app.BASIC, 
        currentView: 'characters'
    },
    // characters: { ...characters.BASIC, 
    //     // activeItem: Object.keys(characters.BASIC.items)[0]
    //     // activeItem: START_CREATE
    // }
};
