
import React from 'react';
import { __noop } from 'utils/mishellaneous';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const dataTypes = {
    void: () => {},
    character: data => {
        return {
            title: data.name,
            desc: data.desc
        };
    }
}

export class EditPanel extends React.Component {

    static defaultProps = {
        fields: null,
        onSave: __noop,
        onCancel: __noop
    }

    state = {
        isVisible: false,
        title: 'Modal Title'
    }

    componentWillMount() {
        this.__setModalTitle(this.props.fields);
    }

    componentWillReceiveProps(nextProps) {
        this.__setModalTitle(nextProps.fields);
    }

    __setModalTitle = fields => {
        if (fields) {
            fields
            .filter(field => field.isTitle)
            .forEach(field => this.setState({title: field.value}));
        }
    }

    onSave = () => {
        console.log('save!');
    }

    render() {

        var header, content, footer;
        var { fields, onCancel } = this.props;
        var { onSave } = this;

        var { title } = this.state;
        var isVisible = null !== fields;

        if (isVisible) {

            header = (
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
            );

            content = (
                <Modal.Body>
                    <p>--desc--</p>
                </Modal.Body>
            );

            footer = (
                <Modal.Footer>
                    <Button bsStyle="link" onClick={onCancel}>
                        cancel
                    </Button>
                    <Button bsStyle="primary" onClick={onSave}>
                        Save
                    </Button>
                </Modal.Footer>
            );
        }

        return (
            <Modal show={isVisible} onHide={onCancel} bsSize="large">
                {header}
                {content}
                {footer}
            </Modal>
        );
    }
}
