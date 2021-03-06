import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { CardPanel as Component } from 'components/CardPanel';

import img1 from '../assets/js1.png';

import { resize, crop } from 'utils/uploads';

function showFirst(files) {
    var file = files.shift();
    // document.body.innerHTML = '';

    // var img = new Image();
    // document.body.appendChild(img);
    // resize(file, 80, resized => img.src = resized.b64);

    // var img1 = new Image();
    // document.body.appendChild(img1);
    // crop(file, 80, resized => img1.src = resized.b64);

    // setTimeout($=> {
    //     var img2 = new Image();
    //     img2.src = file.b64;
    //     document.body.appendChild(img2);
    // }, 50);
}

export default class CardPanel extends React.Component {
    render() {
        return (
            <Grid style={{marginTop:20}}>
                <Row>
                    <Col xs={6}>
                        <Component
                            title="Marco"
                            desc="hey, I am very nice <b>boy</b> :-)<p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>"
                            cover={img1} />
                    </Col>
                    <Col xs={6}>
                        <Component
                            title="Silvia"
                            desc="hey, I am very nice <b>girl</b> :-)<p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>" />
                    </Col>
                    <Col xs={6}>
                        <Component
                            title="Silvia"
                            desc="hey, I am very nice <b>girl</b> :-)" />
                    </Col>
                    <Col xs={6}>
                        <Component onUpload={showFirst} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}


