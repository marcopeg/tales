import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { CardPanel as Component } from 'components/CardPanel';

export default class CardPanel extends React.Component {
    render() {
        return (
            <Grid style={{marginTop:20}}>
                <Row>
                    <Col xs={6}>
                        <Component />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
