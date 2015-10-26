
import { bigLog } from 'utils/debug';

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

        var onReady = $=> {}

        var droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        var files = [];
        var loaded = 0;

        for (var i = 0; i < droppedFiles.length; i++) {
            var file = droppedFiles[i];
            var reader = new FileReader();

            reader.onload = e => {
                file.b64 = e.target.result;
                file.localUrl = window.URL.createObjectURL(file);
                files.push(file);

                if (files.length === droppedFiles.length) {
                    this.onFilesReady(files);
                }
            }
            reader.readAsDataURL(file);
        }        
    }

    onFilesReady = files => {
        var { cover } = this.props;
        if (!cover) {
            cover = files.filter(file => file.type.indexOf('image/') !== -1).shift();
            if (cover) {
                this.setState({tmpCover: cover.b64});
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
