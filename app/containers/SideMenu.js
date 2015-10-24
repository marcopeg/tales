
import React from 'react';
import { connect } from 'react-redux';

import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import { setCurrentView } from 'actions/app-actions';

const apps = [{
    id: 'characters',
    label: 'Characters'
},{
    id: 'locations',
    label: 'Locations'
}];

@connect(s => s.app)
export class SideMenu extends React.Component {

    onChooseView = (e, id) => {
        e.currentTarget.blur();
        this.props.dispatch(setCurrentView(id));
    }

    render() {

        var { onChooseView } = this;
        var { currentView } = this.props;

        var items = apps.map(app => {
            var { id, label } = app;
            var isActive = currentView === id;
            return (
                <ListGroupItem 
                    key={id} 
                    onClick={e => onChooseView(e, id)}
                    active={isActive} 
                    children={label} />
            );
        });

        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}
