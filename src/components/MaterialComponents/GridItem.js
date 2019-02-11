import React from 'react'
import Grid from '@material-ui/core/Grid'

export default class GridItem extends React.Component {
  render () {
    return (
      <Grid item xs={this.props.xs} sm={this.props.sm}>
        {this.props.children}
      </Grid>
    )
  }
}
