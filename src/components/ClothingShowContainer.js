import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { Container, Grid, Card, Image, Icon, Button } from 'semantic-ui-react'
import AddMeasurementsForm from './AddMeasurementsForm'
import MeasurementsDisplay from './MeasurementsDisplay'
import {sortSizes} from './importFunctions'
import {goHome} from '../redux/actions'

const _ = require("lodash")

class ClothingShowContainer extends Component {

  state = {
    addMeasurement: false
  }

  handleAddMeasurement = () => {
    this.setState({
      addMeasurement: !this.state.addMeasurement
    })
  }

  render() {
  let { clothing } = this.props
  window.scrollTo(0,0);

  return(
    <Container fluid>
      <Grid celled id='clothingShowGrid'>
        <Grid.Row>
          <Grid.Column width={4} id='clothingShowImgCol'>
            <Card fluid id='clothingShowImageCard'>
            <Card.Content textAlign='center'>
            <Image id='clothingShowImg' src={clothing.image_url}/>
            </Card.Content>
            <Card.Content>
            <Image
             floated='right'
             id="clothingShowUser"
             src={clothing.user.avatar}
            />
            <Card.Header id='clothingShowUserPosted'>posted by</Card.Header>
            <Card.Meta id='clothingShowUserName'>{clothing.user.username}</Card.Meta>
            </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12} id='clothingShowDetailCol'>
            <Card fluid>
              <Card.Content>
                <Card.Description>
                  <Grid>
                    <Grid.Column floated='left' width={1}>
                      <div>
                        <Button animated='fade' color='black' size='large'
                          as={ Link }
                          to = {`/home`}
                          onClick={this.props.goHome}>
                        <Button.Content visible>Back</Button.Content>
                        <Button.Content hidden>
                          <Icon name='home' />
                        </Button.Content>
                        </Button>
                      </div>
                    </Grid.Column>
                    <Grid.Column id='clothingShowHeart' floated='right' width={1}>
                      <Icon name='heart outline' color='red' size='big' onClick={(e) => console.log(e.target.classList["value"])} />
                    </Grid.Column>
                  </Grid>
                </Card.Description>
                <Card.Header id="clothesShowBrand">{clothing.brand}</Card.Header>
                <Card.Header id="clothesShowName">{clothing.name}</Card.Header>


                <Card.Description id='clothingShowDescription'>
                  {clothing.description}
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Card.Header id='clothingShowCategoryHeader'>
                  <strong>ADDITIONAL DETAILS</strong>
                </Card.Header>
                <Card.Description id='clothingShowCategory'>
                  <strong>Category:</strong>
                </Card.Description>
                <Card.Description id='clothingShowCategory'>
                  {clothing.categories.map(c => _.capitalize(c.name)).join(", ")}
                </Card.Description>
                {clothing.sizes.length > 0 ?
                <>
                <Card.Description id='clothingShowSizes'>
                  <strong>Sizes Available:</strong>
                </Card.Description>
                <Card.Description id='clothingShowSizes'>
                  {sortSizes(this.props).join(", ")}
                </Card.Description>
                </>
                :
                null
                }
              </Card.Content>
                {clothing.user_clothings.length > 0 ?
                  <>
                  <MeasurementsDisplay / >
                  </>
                  :
                  null
                }
                {!this.state.addMeasurement ?
                <Card.Content textAlign='center'>
                <Button animated='vertical' color='black'
                  size='big' id='addMeasBtn' onClick={this.handleAddMeasurement}>
                  <Button.Content visible>Add Measurement</Button.Content>
                  <Button.Content hidden>
                    <Icon name='add circle' />
                  </Button.Content>
                </Button>
                </Card.Content>
                :
                <Card.Content>
                <Card.Header textAlign='right'>
                  <Button icon color='black' size='large' onClick={this.handleAddMeasurement}>
                    <Icon name='close'/>
                  </Button>
                </Card.Header>



                  <AddMeasurementsForm handleAddMeasurement={this.handleAddMeasurement}/>


                </Card.Content>
                }

            </Card>

          </Grid.Column>

        </Grid.Row>

      </Grid>

    </Container>

  )
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    clothing: state.clothingCollection.find(c => c.id === parseInt(ownProps.match.params.threadId))
  }
}

const mapDispatchToProps = dispatch => {
  return {
    goHome: () => {dispatch( goHome() )}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClothingShowContainer));
