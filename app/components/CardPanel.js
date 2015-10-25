
import React from 'react';
import { __noop } from 'utils/mishellaneous';

import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export class CardPanel extends React.Component {

    static defaultProps = {
        title: null,
        desc: null,
        cover: null,
        order: null,
        img: null,
        onEdit: __noop,
        onDelete: __noop,
        onCoverChange: __noop
    }

    render() {

        var {
            title,
            desc,
            cover,
            order,
            img,
            onEdit,
            onDelete,
            onCoverChange
        } = this.props;

        var header = (
            <div>
                <div className="pull-right">
                    <Glyphicon glyph="edit" onClick={onEdit} style={{marginRight:5}} />
                    <Glyphicon glyph="trash" onClick={onDelete} />
                </div>
                <span>{title} <small>{order}</small></span>
            </div>
        );

        var content = (
            <div className="card-panel__desc">
                <span dangerouslySetInnerHTML={{__html: desc}} />
            </div>
        );

        if (cover) {
            content = (
                <div className="card-panel__cover">
                    <img src={cover} className="img-responsive img-rounded" />
                    {content}
                </div>
            );
        }

        return (
            <Panel 
                className="card-panel"
                header={header} 
                children={content} />
        );
    }
}
