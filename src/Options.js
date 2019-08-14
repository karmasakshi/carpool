import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Grid, Icon, Container } from 'semantic-ui-react'

class Options extends Component {
    render() {
        return (
            <React.Fragment>
                <Container className="linksContainer">
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Icon name='taxi' size="massive" />
                                <a href='/taxi-share/plan-my-week'><h2> Taxi Share <Icon name='arrow right' /></h2></a>
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name='car' size="massive" />
                                {this.props.appUser.role === 'guest' ?
                                    <NavLink to='/guest-dashboard'><h2> Car Share to Office <Icon name='arrow right' /></h2></NavLink> :
                                    <NavLink to='/host-dashboard'><h2> Car Share to Office <Icon name='arrow right' /></h2></NavLink>}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}

export default Options;