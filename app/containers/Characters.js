
import React from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { PageHeader } from 'components/PageHeader';
import { CardPanel } from 'components/CardPanel';
import { EditPanel } from 'components/EditPanel';

import { startCreate, startEdit, cancelEdit } from 'actions/characters-actions';
import { START_CREATE } from 'actions/characters-actions';

import { create, save, remove } from 'services/characters-service';

@connect(s => s.characters)
export class Characters extends React.Component {

    onCreate = () => {
        this.props.dispatch(startCreate());
    }

    onEdit = item => {
        this.props.dispatch(startEdit(item.id));
    }

    onDelete = item => {
        this.props.dispatch(remove(item.id));
    }

    onCancel = $=> {
        this.props.dispatch(cancelEdit());
    }

    onSave = data => {
        var { activeItem } = this.props;

        if (activeItem === START_CREATE) {
            this.props.dispatch(create(data));
        } else {
            this.props.dispatch(save(activeItem, data));
        }
    }

    render() {

        var { items, activeItem, isSaving, isLoading } = this.props;
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
                // type: 'wysiwyg',
                type: 'textarea',
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

        if (isLoading) {
            items = (
                <Row>
                    <Col xs={12}>
                        <p>loading...</p>
                    </Col>
                </Row>
            );
        }

        return (
            <Grid fluid>
                <PageHeader
                    title="Characters"
                    action={onCreate} />

                <Row children={items} />
                
                <EditPanel 
                    fields={fields}
                    onCancel={onCancel}
                    onSave={onSave}
                    isSaving={isSaving} />
            </Grid>
        );
    }
}

