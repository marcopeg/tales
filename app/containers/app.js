
import React from 'react';
import { connect } from 'react-redux';

import { init as initFirebase } from 'services/firebase-service';
import { init as initCharacters } from 'services/characters-service';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavBrand from 'react-bootstrap/lib/NavBrand';

import { SideMenu } from 'containers/SideMenu';
import { Characters } from 'containers/Characters';
import { Locations } from 'containers/Locations';

const viewsObjects = {
    characters: Characters,
    locations: Locations
};

@connect(s => s.app)
export class App extends React.Component {

    componentWillMount() {
        this.props.dispatch(initFirebase());
        this.props.dispatch(initCharacters());
    }

    render() {
        var { currentView } = this.props;

        if (currentView) {
            var CurrentView = viewsObjects[currentView];
            currentView = <CurrentView />;
        }

        return (
            <Grid fluid style={{marginTop:80}}>
                <Navbar fixedTop>
                    <NavBrand>Once Upon a Time</NavBrand>
                </Navbar>
                <Row>
                    <Col xs={3}>
                        <SideMenu />
                    </Col>
                    <Col xs={9}>
                        {currentView}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
