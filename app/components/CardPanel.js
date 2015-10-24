
import React from 'react';
import { __noop } from 'utils/mishellaneous';

import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export class CardPanel extends React.Component {

    static defaultProps = {
        title: null,
        desc: null,
        img: null,
        onEdit: __noop,
        onDelete: __noop
    }

    render() {

        var { title, desc, img, onEdit, onDelete } = this.props;

        var header = (
            <div>
                <div className="pull-right">
                    <Glyphicon glyph="edit" onClick={onEdit} style={{marginRight:5}} />
                    <Glyphicon glyph="trash" onClick={onDelete} />
                </div>
                <span>{title}</span>
            </div>
        );

        return (
            <Panel header={header}>
                <div dangerouslySetInnerHTML={{__html: desc}} style={{height:80, overflow:'auto'}} />
            </Panel>
        );
    }
}
