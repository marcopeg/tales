

// Twitter Bootstrap is included via HTML
require('../app/index.scss');
// require('./assets/animate.css');

import React from 'react';
import ReactDOM from 'react-dom';

import CardPanel from '../specs/components/CardPanel';

ReactDOM.render((
    <CardPanel />
), document.getElementById('app'));
