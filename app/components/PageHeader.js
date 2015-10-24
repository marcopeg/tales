import React from 'react';
import { __noop } from 'utils/mishellaneous';

import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export class PageHeader extends React.Component {
    
    static defaultProps = {
        title: '',
        action: __noop
    }

    onClick = e => {
        e.currentTarget.blur();
        this.props.action();
    }

    render() {
        return (
            <div className="page-header" style={{marginTop:0}}>
                <div className="pull-right">
                    <Button bsStyle="primary" onClick={this.onClick}>
                        <span>New </span>
                        <Glyphicon glyph="plus" />
                    </Button>
                </div>
                <h2 style={{marginTop:0}}>{this.props.title}</h2>
            </div>
        );
    }
}
