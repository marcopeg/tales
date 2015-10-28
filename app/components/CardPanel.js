
import { bigLog } from 'utils/debug';

import React from 'react';
import { __noop } from 'utils/mishellaneous';
import { FILTERS as UPLOAD_FILTERS, crop} from 'utils/uploads';

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
        onUpload: __noop
    }

    state = {
        isDragging: false,
        tmpCover: null
    }

    onDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isDragging: true});
    }

    onDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        this.__dragging = setTimeout($=> this.setState({isDragging: false}), 50);
    }

    onDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
        clearTimeout(this.__dragging);
    }

    onDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({isDragging: false});

        var droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        var files = [];
        var loaded = 0;

        // needs a clojure to handle the correct value of "file"
        // NOTE: it doesn't keep the selection order during upload
        //       we may need some async series code here.
        var makeFile = (file, i) => {
            var reader = new FileReader();
            reader.onload = e => {
                file.b64 = e.target.result;
                file.localUrl = window.URL.createObjectURL(file);
                files.push({
                    type: file.type,
                    name: file.name,
                    size: file.size,
                    lastModified: file.lastModified,
                    localUrl: file.localUrl,
                    b64: file.b64
                });

                // detect file manipulation is complete
                if (files.length === droppedFiles.length) {
                    this.onFilesReady(files);
                }
            }
            reader.readAsDataURL(file);
        };

        for (var i = 0; i < droppedFiles.length; i++) {
            makeFile(droppedFiles[i], i);
        }        
    }

    onFilesReady = files => {
        var { cover } = this.props;
        if (!cover) {
            console.log(files);
            cover = files.filter(UPLOAD_FILTERS.image).shift();
            if (cover) {
                crop(cover, 250, cropped => this.setState({tmpCover: cropped.b64}));
            }
        }
        this.props.onUpload(files);
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.cover !== this.props.cover) {
            this.setState({tmpCover: null});
        }
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

        var { isDragging, tmpCover } = this.state;

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

        if (tmpCover) {
            cover = tmpCover;
        }

        if (cover) {
            content = (
                <div className="card-panel__cover">
                    <img src={cover} className="img-responsive img-rounded" />
                    {desc ? content : null}
                </div>
            );
        }

        if (isDragging) {
            content = (
                <div>
                    <div className="card-panel__drop">
                        <span>Drop Cover Here</span>
                    </div>
                </div>
            );
        }

        return (
            <Panel 
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop}
                className="card-panel"
                header={header} 
                children={content} />
        );
    }
}
