
import React from 'react';
import { __noop } from 'utils/mishellaneous';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import { FormField } from 'components/FormField';

export class EditPanel extends React.Component {

    static defaultProps = {
        fields: null,
        onSave: __noop,
        onCancel: __noop,
        isSaving: false
    }

    state = {
        isVisible: false,
        titleField: '--',
        values: {}
    }

    componentWillMount() {
        this.__setModalFields(this.props.fields);
    }

    componentWillReceiveProps(nextProps) {
        this.__setModalFields(nextProps.fields);
    }

    __setModalFields = fields => {
        var titleField = this.state.titleField;
        var values = {};
        fields = fields || [];

        // set local values
        fields.forEach(field => values[field.name] = field.value);
        
        // modal title
        fields
        .filter(field => field.isTitle)
        .forEach(field => {titleField = field.name});
        
        this.setState({titleField, values});
    }

    onSave = () => {
        var { values } = this.state;
        var { onSave } = this.props;
        onSave(values);
    }

    onFieldUpdate = name => {
        return e => {
            var { values } = this.state;
            values[name] = e.target.value;
            this.setState({values});
        }
    }

    render() {

        var { fields, onCancel, isSaving } = this.props;
        var { titleField, values } = this.state;
        var { onSave } = this;

        var isVisible = null !== fields;
        var title = values[titleField];

        fields = (fields || []).map(field => {
            var { name, type, label } = field;
            var value = values[name];
            return (
                <FormField 
                    key={name}
                    type={type} 
                    label={label}
                    value={value} 
                    onChange={this.onFieldUpdate(name)} />
            );
        });

        var saveLbl = 'Save';
        if (isSaving) {
            saveLbl = 'saving...';
        }

        return (
            <Modal show={isVisible} onHide={onCancel} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {fields}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="link" onClick={onCancel}>
                        cancel
                    </Button>
                    <Button bsStyle="primary" onClick={onSave}>
                        {saveLbl}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
