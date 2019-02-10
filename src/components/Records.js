import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



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

const formStyles = {
    width: 400,
    margin: '50px auto',
};


class Records extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false
        };
    }

    handleChange = () => {
        this.setState({
            open: !this.state.open
        });
    };
    render() {

        return (

            <div style={formStyles}>
                <form onSubmit={this.login}>
                    <TextField
                        required
                        name="email"
                        label="Email"
                        fullWidth
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        name="password"
                        type="password"
                        label="Password"
                        fullWidth
                        onChange={this.handleChange}
                    />
                    <Button type='submit' variant='contained'>Login</Button>
                </form>
            </div>

        );
    }
}

Records.propTypes = {
    classes: PropTypes.object.isRequired,
};




export default withStyles(styles)(Records);


