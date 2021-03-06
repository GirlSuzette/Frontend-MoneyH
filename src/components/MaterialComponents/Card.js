import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
}

class MediaCard extends React.Component {
  render () {
    const { classes } = this.props
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={this.props.picture}
            title={this.props.cardTitle}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {this.props.cardTitle}
            </Typography>
            {this.props.children}
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MediaCard)
