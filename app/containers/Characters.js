
import React from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { PageHeader } from 'components/PageHeader';
import { CardPanel } from 'components/CardPanel';
import { EditPanel } from 'components/EditPanel';

import { startCreate, startEdit, cancelEdit, updateItem } from 'actions/characters-actions';
import { START_CREATE } from 'actions/characters-actions';

@connect(s => s.characters)
export class Characters extends React.Component {

    onCreate = () => {
        this.props.dispatch(startCreate());
    }

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

        if (activeItem === START_CREATE) {
            console.log('create new item', data);
        } else {
            this.props.dispatch(updateItem(activeItem, data));
        }
        
        this.props.dispatch(cancelEdit());
    }

    render() {

        var { items, activeItem } = this.props;
        var { onCreate, onEdit, onDelete, onCancel, onSave } = this;

        var fields = null;

        if (activeItem === START_CREATE) {
            activeItem = {
                name: 'new character',
                desc: ''
            }
        } else if (activeItem) {
            activeItem = items[activeItem];
        }

        if (activeItem) {
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
                <PageHeader
                    title="Characters"
                    action={onCreate} />

                <Row children={items} />
                
                <EditPanel 
                    fields={fields}
                    onCancel={onCancel}
                    onSave={onSave} />
            </Grid>
        );
    }
}

