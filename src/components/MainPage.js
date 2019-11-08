import React, { Component } from 'react';
import { Grid, Container } from 'semantic-ui-react'
import {connect} from 'react-redux'
import ClothesContainer from './ClothesContainer'
import SearchColumn from './SearchColumn'
import ClothesPreview from './ClothesPreview'

class MainPage extends Component {

  render() {
    let { searchActive, selectedClothing } = this.props

    return(
      <>
      <Container fluid>
        <Grid columns='equal'>
          <Grid.Row>
            {searchActive ?
            <Grid.Column width={3}>
              <SearchColumn />
            </Grid.Column>
            :
            null}

            <Grid.Column>
              <ClothesContainer />
            </Grid.Column>

            {selectedClothing ?
            <Grid.Column width={3}>
            <ClothesPreview />
            </Grid.Column>
            :
            null}
          </Grid.Row>
        </Grid>
      </Container>
      </>
    )
  }

}

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser,
    searchActive: state.searchActive,
    selectedClothing: state.selectedClothing
  }
}

export default connect(mapStateToProps)(MainPage);
