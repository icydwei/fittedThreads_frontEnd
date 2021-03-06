import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Card, Form, Dropdown, Button, Icon } from 'semantic-ui-react'
import {updateUserMeasurements} from '../redux/actions'
import {generateOptions} from './importFunctions'


class MyMeasurementsForm extends Component {

  state = {
    topNeck: this.props.user.topNeck,
    topChest: this.props.user.topChest,
    topWaist: this.props.user.topWaist,
    topSleeve: this.props.user.topSleeve,
    topFront_Length: this.props.user.topFront_Length,
    bottomWaist: this.props.user.bottomWaist,
    bottomLength: this.props.user.bottomLength,
    bottomHip: this.props.user.bottomHip,
    bottomThigh: this.props.user.bottomThigh,
    bottomBottom_Hem: this.props.user.bottomBottom_Hem
  }


  handleDimensionsChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    })
  }

  render() {
  let { user } = this.props
  let { topNeck, topChest, topWaist, topSleeve, topFront_Length,
        bottomWaist, bottomLength, bottomHip, bottomThigh, bottomBottom_Hem} = this.state

  return (
    <>
      <Card.Content id='profileHeaderCard'>
      <Card.Header id='profileHeader'>My Measurements</Card.Header>
      </Card.Content>

      <Card.Content id='measFields'>
        <Card.Header id='myMeasHeaders'>Top Measurements</Card.Header>
        <Form id='userMeasForm'>
         <Form.Group widths='equal'>
           <Form.Field>
             <label>Neck</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topNeck'}
               value={this.state.topNeck}
               onChange={this.handleDimensionsChange}/>
           </Form.Field>
           <Form.Field>
             <label>Chest</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topChest'}
               value={this.state.topChest}
               onChange={this.handleDimensionsChange}/>
           </Form.Field>
           <Form.Field>
             <label>Waist</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topWaist'}
               value={this.state.topWaist}
               onChange={this.handleDimensionsChange}/>
           </Form.Field>
           <Form.Field>
             <label>Sleeve</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topSleeve'}
               value={this.state.topSleeve}
               onChange={this.handleDimensionsChange}/>
           </Form.Field>
           <Form.Field>
             <label>Front Length</label>
             <Dropdown clearable options={generateOptions()}
               selection search
               name={'topFront_Length'}
               value={this.state.topFront_Length}
               onChange={this.handleDimensionsChange}/>
           </Form.Field>
         </Form.Group>
         <Card.Content>
           <Button id='topMeasSubmit'
             icon
             labelPosition='left'
             size='large'
             type='submit'
             onClick={() =>
               this.props.updateUserMeasurements({ topNeck, topChest, topWaist, topSleeve, topFront_Length}, user, "top")}
               >
              <Icon name='save'/>
             Update Top Measurements
           </Button>
         </Card.Content>
        </Form>

      </Card.Content>

      <Card.Content id='measFields'>
        <Card.Header id='myMeasHeaders'>Bottom Measurements</Card.Header>
        <Form id='userMeasForm'>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Waist</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomWaist'}
                value={this.state.bottomWaist}
                onChange={this.handleDimensionsChange}/>
            </Form.Field>
            <Form.Field>
              <label>Length</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomLength'}
                value={this.state.bottomLength}
                onChange={this.handleDimensionsChange}/>
            </Form.Field>
            <Form.Field>
              <label>Hip</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomHip'}
                value={this.state.bottomHip}
                onChange={this.handleDimensionsChange}/>
            </Form.Field>
            <Form.Field>
              <label>Thigh</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomThigh'}
                value={this.state.bottomThigh}
                onChange={this.handleDimensionsChange}/>
            </Form.Field>
            <Form.Field>
              <label>Bottom Hem</label>
              <Dropdown clearable options={generateOptions()}
                selection search
                name={'bottomBottom_Hem'}
                value={this.state.bottomBottom_Hem}
                onChange={this.handleDimensionsChange}/>
            </Form.Field>
          </Form.Group>
          <Card.Content>
            <Button id='bottomMeasSubmit'
              icon
              labelPosition='left'
              size='large'
              type='submit'
              onClick={() =>
                this.props.updateUserMeasurements({ bottomWaist, bottomLength, bottomHip, bottomThigh, bottomBottom_Hem}, user, "bottom")}
                >
              <Icon name='save'/>
               Update Bottom Measurements
            </Button>
          </Card.Content>
        </Form>
      </Card.Content>
  </>
  )
  }
}

const mapStateToProps = state => {
  return {
    clothingCollection: state.clothingCollection,
    user: state.loggedInUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserMeasurements: (measurements, user, type) => {dispatch (updateUserMeasurements(measurements, user, type))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMeasurementsForm);
