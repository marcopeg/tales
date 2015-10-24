
import React from 'react';
import { connect } from 'react-redux';

import { initFirebase } from 'services/firebase-service';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavBrand from 'react-bootstrap/lib/NavBrand';

import { Characters } from 'containers/Characters';

@connect(s => s)
export class App extends React.Component {

    componentWillMount() {
        this.props.dispatch(initFirebase());
    }

    render() {
        return (
            <Grid fluid style={{marginTop:80}}>
                <Navbar fixedTop>
                    <NavBrand>Once Upon a Time</NavBrand>
                </Navbar>
                <Row>
                    <Col xs={4}>
                        left
                    </Col>
                    <Col xs={8}>
                        <Characters />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
