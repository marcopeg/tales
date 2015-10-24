
import React from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { CardPanel } from 'components/CardPanel';
import { EditPanel } from 'components/EditPanel';

import { startEdit, cancelEdit } from 'actions/characters-actions';

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
        console.log('save new data', data);
    }

    render() {

        var { items, activeItem } = this.props;
        var { onEdit, onDelete, onCancel, onSave } = this;

        var toObject = id => {
            return { id, ...items[id] };
        };

        var toPanel = item => (
            <CardPanel
                id={item.id}
                title={item.name}
                desc={item.desc}
                key={item.id}
                onEdit={$=> onEdit(item)}
                onDelete={$=> onDelete(item)} />
        );

        if (activeItem) {
            activeItem = items[activeItem];
        }

        items = Object.keys(items)
                    .map(toObject)
                    .map(toPanel);

        return (
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        {items}
                        
                        <EditPanel 
                            dataType="character" 
                            data={activeItem}
                            onCancel={onCancel}
                            onSave={onSave} />

                    </Col>
                </Row>
            </Grid>
        );
    }
}

