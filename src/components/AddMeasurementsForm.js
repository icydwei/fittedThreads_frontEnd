import React, {Component} from 'react';
import { Card, Form, Dropdown, Select, Button, Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";
import {addMeasurement} from '../redux/actions'
import {sortSizes, generateOptions} from './importFunctions'

const Swal = require('sweetalert2')
const _ = require("lodash")
const topMeasurements = ["Neck", "Chest", "Waist", "Sleeve", "Front_Length"]
const bottomsMeasurements = ["Waist", "Length", "Hip", "Thigh", "Bottom_Hem"]

class AddMeasurementsForm extends Component {

  state = {
    addCustomSize: false,
    existingSizeId: "",
    customSizeEntry: "",
    topNeck: "",
    topChest: "",
    topWaist: "",
    topSleeve: "",
    topFront_Length: "",
    bottomWaist: "",
    bottomLength: "",
    bottomHip: "",
    bottomThigh: "",
    bottomBottom_Hem: ""
  }

  createSizeOptions = () => {
    let {clothing} = this.props
    let sizeOptions = sortSizes(this.props).map(s => {
      return {"key": clothing.sizes.find(size => size.size === s).id, "text": s, "value": clothing.sizes.find(size => size.size === s).id}
    })
    sizeOptions.push({"key": 'New', "text": 'Add New Size', "value": 'New'})
    return sizeOptions
  }

  checkForNewSize = (e, {name, value}) => {
    if (e.target.innerText === "Add New Size") {
      this.setState({
        addCustomSize: true
      })
    }
    else {
      this.setState({
        addCustomSize: false,
        [name]: value
      })
    }
  }

  customSizeEntry = (e) => {
    this.setState({
      customSizeEntry: e.target.value
    })
  }

  handleDimensionsChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    })
  }

  handleMeasurementSubmit = (e, obj) => {
    let {clothing, user} = this.props
    let {addCustomSize, existingSizeId, customSizeEntry } = this.state

    if (!addCustomSize){
      if(!!existingSizeId) {
        let newMeasure = this.validateMinTwoMeasures()
        if(newMeasure) {
          let wrappedNewMeasure = {measurements: _.fromPairs(newMeasure)}
          let newMeasObj ={...wrappedNewMeasure, "size": existingSizeId, "clothing_id": clothing.id, "user_id": user.id}
          this.props.addMeasurement(newMeasObj)
          setTimeout(this.props.handleAddMeasurement, 500)
        }
      }
      else {
        Swal.fire({
          title: 'Missing Size!',
          text: 'Please select a size',
          icon: 'error',
          timer: 2500
        })
      }
    }
    else {
      if(!!customSizeEntry) {
        let customMeasure = this.validateMinTwoMeasures()
        if(customMeasure) {
          let wrappedCustomMeasure = {measurements: _.fromPairs(customMeasure)}
          let newCustObj = {...wrappedCustomMeasure, "custom_size": customSizeEntry, "clothing_id": clothing.id, "user_id": user.id}
          this.props.addMeasurement(newCustObj)
          setTimeout(this.props.handleAddMeasurement, 500)
        }
      }
      else {
        Swal.fire({
          title: 'Missing New Size!',
          text: 'Please enter a custom size',
          icon: 'error',
          timer: 2500
        })
      }
    }
  }

  validateMinTwoMeasures = () => {
    let {clothing} = this.props
    let {topNeck, topChest, topWaist, topSleeve, topFront_Length,
        bottomWaist, bottomLength, bottomHip, bottomThigh, bottomBottom_Hem } = this.state

    if(clothing.categories[0].name.toLowerCase() === "pants" ||
    clothing.categories[0].name.toLowerCase() === "jeans") {
      let bottomMeasurements = [["bottomWaist", bottomWaist], ["bottomLength", bottomLength], ["bottomHip", bottomHip], ["bottomThigh", bottomThigh], ["bottomBottom_Hem",bottomBottom_Hem]].filter(m => {
        return m[1] !== ""} )
      if(bottomMeasurements.length < 2) {
        Swal.fire({
          title: 'Additional Measurements Needed',
          text: 'Please provide at least 2 measurement values before submitting',
          icon: 'error',
          timer: 2500
        })
      }
      else {
        return bottomMeasurements
      }
    }
    else {
      let topMeasurements = [["topNeck", topNeck], ["topChest", topChest], ["topWaist",topWaist], ["topSleeve",topSleeve], ["topFront_Length", topFront_Length]].filter(m => {
        return m[1] !== ""} )
      if(topMeasurements.length < 2) {
        Swal.fire({
          title: 'Additional Measurements Needed',
          text: 'Please provide at least 2 measurement values before submitting',
          icon: 'error',
          timer: 2500
        })
      }
      else {
        return topMeasurements
      }
    }
  }


  render() {
    let {clothing} = this.props
    window.scrollTo(0,document.body.scrollHeight)
  return(
    <Form id='addMeasForm'>
      <Form.Group>
      <Form.Field
        label='Size'
        placeholder='Select A Size'
        width={4}
        control={Select}
        name='existingSizeId'
        options={this.createSizeOptions()}
        onChange={this.checkForNewSize}
        required
        />
        {this.state.addCustomSize ?
        <Form.Input label='Add Custom Size'
          placeholder='Enter size' width={4}
          required
          onChange={this.customSizeEntry} />
        :
        null
        }
      </Form.Group>

      <Form.Group widths='equal'>
        {clothing.categories[0].name.toLowerCase() === "pants" ||
        clothing.categories[0].name.toLowerCase() === "jeans" ?
          bottomsMeasurements.map(dim => {
            return (
              <Form.Field key={dim}>
                <label>{dim.split("_").join(" ")}</label>
                <Dropdown clearable options={generateOptions()}
                  selection search
                  name={`bottom${dim}`}
                  onChange={this.handleDimensionsChange}/>
              </Form.Field>
            )
          })
          :
          topMeasurements.map(dim => {
            return (
              <Form.Field key={dim}>
                <label>{dim.split("_").join(" ")}</label>
                <Dropdown clearable options={generateOptions()}
                   selection search
                   name={`top${dim}`}
                   onChange={this.handleDimensionsChange}
                   />
              </Form.Field>
            )
          })
        }
      </Form.Group>
      <Card.Content textAlign='center'>
          <Button type='submit' animated='fade' color='black' size='big'
            id='submitMeasurementBtn'
            onClick={this.handleMeasurementSubmit}
            >
           <Button.Content visible>Submit Measurement</Button.Content>
           <Button.Content hidden>
              <Icon name='arrow circle up' />
           </Button.Content>
          </Button>
      </Card.Content>
    </Form>
  )
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    clothing: state.clothingCollection.find(c => c.id === parseInt(ownProps.match.params.threadId)),
    user: state.loggedInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMeasurement: measurementObj => {dispatch( addMeasurement(measurementObj) )}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddMeasurementsForm));
