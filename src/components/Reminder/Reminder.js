import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './Reminder.css'
import Card from '../MaterialComponents/Card'
import timeImage from '../../image/time.jpg'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class Reminder extends Component {
  render () {
    const { classes } = this.props
    return (
      <div className='reminderContainer'>
        <div className='container'>
          <div className='row'>
            <div className='frm col-sm-4'>
              <Card cardTitle='Reminder' picture={timeImage}>
                <form className={classes.container} noValidate>
                  <div className='form-group btnExp'>
                    <div>
                      <select className='browser-default custom-select'>
                        <option>Choose your Expenses for</option>
                        <option value='1'>Renta</option>
                        <option value='2'>Agua</option>
                        <option value='3'>Luz</option>
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
                    <TextField
                      required
                      name='number'
                      type='decimal'
                      label='Quantity'
                      fullWidth
                    />
                  </div>
                  <div className='form-group btnExp'>
                    <TextField
                      id='datetime-local'
                      label='Next appointment'
                      type='datetime-local'
                      defaultValue='2019-02-10T10:30'
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>

                  <div className='form-group btnExp'>
                    <Button type='submit' value='Login' variant='contained'>
                      Save
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Reminder.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Reminder)
