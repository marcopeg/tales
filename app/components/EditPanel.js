
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
        dataType: 'void',
        data: null,
        onSave: __noop,
        onCancel: __noop
    }

    state = {
        isVisible: false,
        title: '',
        desc: ''
    }

    componentWillMount() {
        var { data, dataType } = this.props;
        var { title, desc } = dataTypes[dataType](data || {});
        var isVisible = null !== data;
        this.setState({isVisible, title, desc});
    }

    componentWillReceiveProps(nextProps) {
        var { data, dataType } = nextProps;
        var { title, desc } = dataTypes[dataType](data || {});
        var isVisible = null !== data;
        this.setState({isVisible, title, desc});
    }

    onSave = () => {
        console.log('save!');
    }

    render() {

        var header, content, footer;
        var { onCancel } = this.props;
        var { onSave } = this;

        var { isVisible, title, desc } = this.state;

        if (isVisible) {

            header = (
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
            );

            content = (
                <Modal.Body>
                    <p>{desc}</p>
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
