
import React from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import { CardPanel } from 'components/CardPanel';
import { EditPanel } from 'components/EditPanel';

@connect(s => s)
export class Locations extends React.Component {
    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        LOCATIONS

                    </Col>
                </Row>
            </Grid>
        );
    }
}

