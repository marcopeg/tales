import React from 'react';
import { __noop } from 'utils/mishellaneous';

import Input from 'react-bootstrap/lib/Input';
// import ReactQuill from 'react-quill';

export class FormField extends React.Component {
    render() {
        var { type, label, value, onChange } = this.props;
        switch (type) {
            // case 'wysiwyg':
            //     return (
            //         <div className="form-group">
            //             <label>{label}</label>
            //             <div style={{height:150, border:'1px solid #ddd', borderRadius:5}}>
            //                 <ReactQuill
            //                     theme="snow"
            //                     value={value}
            //                     onChange={value => onChange({target:{value}})} />
            //             </div>
            //         </div>
            //     );
            default:
                return <Input {...this.props} />;
        }
    }
}
