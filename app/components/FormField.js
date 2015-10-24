import React from 'react';
import { __noop } from 'utils/mishellaneous';

import Input from 'react-bootstrap/lib/Input';

export class FormField extends React.Component {
    render() {
        return <Input {...this.props} />;
    }
}
