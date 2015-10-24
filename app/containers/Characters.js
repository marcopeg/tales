
import React from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { CardPanel } from 'components/CardPanel';
import { EditPanel } from 'components/EditPanel';

import { startEdit, cancelEdit, updateItem } from 'actions/characters-actions';

@connect(s => s.characters)
export class Characters extends React.Component {

    onEdit = item => {
        this.props.dispatch(startEdit(item.id));
    }

    onDelete = item => {
        console.log('delete...', item.id);
    }

    onCancel = $=> {
        this.props.dispatch(cancelEdit());
    }

    onSave = data => {
        var { activeItem } = this.props;
        this.props.dispatch(updateItem(activeItem, data));
        this.props.dispatch(cancelEdit());
    }

    render() {

        var { items, activeItem } = this.props;
        var { onEdit, onDelete, onCancel, onSave } = this;

        var fields = null;
        if (activeItem) {
            activeItem = items[activeItem];
            fields = [{
                name: 'name',
                type: 'text',
                label: 'Name',
                value: activeItem.name,
                isTitle: true
            },{
                name: 'desc',
                type: 'wysiwyg',
                label: 'Description',
                value: activeItem.desc
            }];
        }

        var editPanel = (
            <EditPanel 
                fields={fields}
                onCancel={onCancel}
                onSave={onSave} />
        );

        var toObject = id => {
            return { id, ...items[id] };
        };

        var toPanel = item => (
            <Col xs={4} key={item.id}>
                <CardPanel
                    title={item.name}
                    desc={item.desc}
                    onEdit={$=> onEdit(item)}
                    onDelete={$=> onDelete(item)} />
            </Col>
        );

        items = Object.keys(items)
                    .map(toObject)
                    .map(toPanel);

        return (
            <Grid fluid>
                <Row>
                    {items}
                </Row>
                {editPanel}
            </Grid>
        );
    }
}

