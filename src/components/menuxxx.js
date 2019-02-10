import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link, withRouter } from 'react-router-dom'



const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


class Menu extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false
        };
    }

    toggleDrawer = () => {
        this.setState({
            open: !this.state.open
        });
    };
    handleLogout = () => {
        const { history } = this.props;

        localStorage.removeItem("token");
        history.push("/");
    }

    render() {
        const AppBarStyles = {
            flex: 1
        };

        const ListItemTextStyle = {
            width: 200
        }

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={this.toggleDrawer} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography style={AppBarStyles} variant="h6" color="inherit">
                        <Link className='NavMenu' to='/'>Books</Link >

                    </Typography>

                    <Link className='NavMenu' to='/signup'>Sign Up</Link >
                    <Link className='NavMenu' to='/login'>Log In</Link >
                    <button className='myButton ' onClick={this.handleLogout}>Logout</button>


                </Toolbar>
                <Drawer open={this.state.open} onClose={this.toggleDrawer}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                    >
                        <List>
                            <ListItem>
                                <ListItemText style={ListItemTextStyle} primary='Features' />
                            </ListItem>
                            <ListItem button>
                                <Link className='side' to="/">Home</Link>
                            </ListItem>
                            <ListItem button>
                                <Link className='side' to="/books">Books</Link>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <Link className='side' to="/loans">Loans</Link>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </AppBar >

        );
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};




export default withRouter(Menu); withStyles(styles);
