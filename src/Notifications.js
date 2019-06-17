import React, { Component } from "react";
import './index.css'
import '../node_modules/semantic-ui-css/semantic.min.css';
import { Grid, Image, Item, Segment } from 'semantic-ui-react'
import fire from './config/fire'

class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            acceptedRequestsRetrieved: false,
            acceptedRequests: []
        }
    }

    componentDidMount() {

        this.retrieveAcceptedRequests();

    }

    componentDidUpdate() {
        if (this.state.acceptedRequestsRetrieved === false) {
            this.retrieveAcceptedRequests();
        }
    }

    retrieveAcceptedRequests() {
        let acceptedRequests = [];
        let allRequests = [];
        let requestIds = [];

        if (this.props.appUser !== null) {
            fire.database().ref('Requests/').orderByChild('guestID').equalTo(this.props.appUser.id).once('value').then(snapshot => {
                if (snapshot.val()) {
                    allRequests = Object.values(snapshot.val());
                    requestIds = Object.keys(snapshot.val());
                }
                else {
                    allRequests = [];
                    requestIds = [];
                }

                if (allRequests.length !== 0) {
                    for (var i = 0; i < requestIds.length; i++) {
                        if (allRequests[i].isApproved === true) {
                            acceptedRequests.push({
                                requestId: requestIds[i],
                                hostId: allRequests[i].hostID,
                                hostName: allRequests[i].hostName,
                                dateOfJourney: allRequests[i].dateOfJourney
                            })
                        }
                    }
                }

                this.setState(
                    {
                        acceptedRequestsRetrieved: true,
                        acceptedRequests: acceptedRequests
                    }
                )
            })
        }
    }

    render(){
        return(
            <React.Fragment>
            {this.state.acceptedRequests.length === 0 ? <h1>Hey, you currently have no accept</h1> :
                this.state.acceptedRequests.map((acceptedRequest) => (
                    <Grid key={acceptedRequest.requestId} container>
                        <Grid.Column width={16}>
                            <Segment.Group>
                                <Segment>
                                    <Item.Group>
                                        <Item>
                                            <Item.Image size='tiny' src='/images/wireframe/image.png' />
                                            <Item.Content>
                                                <Item.Header as='a'>{acceptedRequest.hostName} </Item.Header>
                                                <Item.Description>
                                                    <Image src='/images/wireframe/short-paragraph.png' />
                                                </Item.Description>
                                                <Item.Extra>{new Date(acceptedRequest.dateOfJourney).toDateString()}</Item.Extra>
                                            </Item.Content>
                                        </Item>
                                    </Item.Group>
                                </Segment>
                            </Segment.Group>
                        </Grid.Column>
                    </Grid>
                ))}
        </React.Fragment>
    )
    }
}

export default Notifications;