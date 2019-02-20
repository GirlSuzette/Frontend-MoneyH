import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

class NativeSelects extends React.Component {
  state = {
    type: '',
    name: 'hai',
    labelWidth: 0
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='type-native-simple'>Type</InputLabel>
          <Select
            native
            value={this.state.type}
            onChange={this.handleChange('type')}
            inputProps={{
              name: 'Type',
              id: 'type-native-simple'
            }}
          >
            <option value='' />
            <option value={10}>Fixed</option>
            <option value={20}>Variable</option>
          </Select>
        </FormControl>
      </div>
    )
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NativeSelects)
