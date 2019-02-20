import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1
  }
})

class ContainerGrid extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid
          container
          xs={this.props.xs}
          spacing={this.props.spacing}
          direction={this.props.direction}
          justify={this.props.justify}
          alignItems={this.props.alignItems}
        >
          {this.props.children}
        </Grid>
      </div>
    )
  }
}
ContainerGrid.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ContainerGrid)
