import React from 'react'
import { withStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Logo from '../../image/logo.png'
import isLoggedIn from '../../utils/isLoggedIn'
import { Link, withRouter } from 'react-router-dom'
import './menu.css'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class Menu extends React.Component {
  constructor () {
    super()
    this.state = {
      open: false,
      fullName: ''
    }
  }

  // componentDidMount () {
  //   fetch('https://cryptic-retreat-15738.herokuapp.com/api/v1/users')
  //     .then(response => response.json())
  //     .then(data => {
  //       // console.log(data)
  //       this.setState({
  //         users: data.data
  //       })

  //       const token = localStorage.getItem('token')
  //       var base64Url = token.split('.')[1]
  //       var base64 = base64Url.replace('-', '+').replace('_', '/')
  //       const t = JSON.parse(window.atob(base64))
  //       // console.log(t.email)
  //       const currentUser = data.data.filter(user => {
  //         if (user.email === t.email) {
  //           this.setState({ user: user, fullName: user.fullName })
  //           return user
  //         }
  //       })
  //     })
  // }

  toggleDrawer = () => {
    this.setState({
      open: !this.state.open
    })
  }
  handleLogout = () => {
    const { history } = this.props

    localStorage.removeItem('token')
    history.push('/')
  }

  render () {
    const AppBarStyles = {
      flex: 1
    }

    const ListItemTextStyle = {
      width: 200
    }

    return (
      <AppBar className='menu-top' position='static'>
        <Toolbar>
          <IconButton
            onClick={this.toggleDrawer}
            color='inherit'
            aria-label='Menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography style={AppBarStyles} variant='h6' color='inherit'>
            <div className='flex'>
              <Link to='/'>
                <img src={Logo} className='NavMenu' alt='logo' />
              </Link>
              <div className='titleMenu'>Money Home</div>
            </div>
          </Typography>

          {!isLoggedIn() && (
            <Link className='NavMenu' to='/login'>
              <i className='userIcon material-icons'>account_circle</i>
            </Link>
          )}
          {isLoggedIn() && (
            <div className='MenuFlex'>
              <span className='logoup MenuFlex' onClick={this.handleLogout}>
                <div className='titleMenu'>Welcome {this.state.fullName}</div>
                <div>
                  <i className='material-icons'>exit_to_app</i>
                </div>
              </span>
            </div>
          )}
        </Toolbar>
        <Drawer open={this.state.open} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role='button'
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <List>
              <ListItem>
                <ListItemText style={ListItemTextStyle} primary='Menu' />
              </ListItem>
              <ListItem button>
                <Link className='side' to='/'>
                  Home
                </Link>
              </ListItem>
              <ListItem button>
                <Link className='side' to='/update'>
                  Update Account
                </Link>
              </ListItem>
              <ListItem button>
                <Link className='side' to='/listincomes'>
                  Incomes
                </Link>
              </ListItem>
              <Divider />
              <ListItem button>
                <Link className='side' to='/listexpenses'>
                  Expenses
                </Link>
              </ListItem>
              <ListItem button>
                <Link className='side' to='/listsavings'>
                  Saving goals
                </Link>
              </ListItem>
              <ListItem button>
                <Link className='side' to='/dashboard'>
                  Dashboard
                </Link>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </AppBar>
    )
  }
}

export default withRouter(Menu)
withStyles(styles)
