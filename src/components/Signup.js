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



class Signup extends React.Component {

    state = {
        error: {
            status: false,
            message: ""
        }
    }
    handleLogIn = () => {
        const { history } = this.props;

        localStorage.removeItem("token");
        history.push("/");
    }

    onSubmit = (e) => {
        e.preventDefault();

        const API_URL = "https://secure-thicket-75424.herokuapp.com/api/v1/"

        fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: e.target.username.value,
                password: e.target.password.value,
                phoneNumber: e.target.password.value

            })
        })
            .then(response => response.json())
            .then(data => {
                if (typeof data.token !== "undefined") {
                    localStorage.setItem("token", data.token);
                    const url = window.decodeURIComponent(this.props.location.search);
                    this.props.history.push("/" + url.split("/")[1] || "/");
                } else {
                    this.setState({
                        error: {
                            status: true,
                            message: data.message
                        }
                    })
                }
            })
            .catch(e => alert(e));
    }
    render() {

        return (
            <React.Fragment>
                <div className='thisSignup'>
                    <div style={formStyles}>
                        Sign Up
                        <form onSubmit={this.onSubmit}>
                            <TextField
                                required
                                name="username"
                                label="Email"
                                fullWidth
                            // onChange={this.handleChange}
                            />
                            <TextField
                                required
                                name="number"
                                type="number"
                                label="Number"
                                fullWidth
                            // onChange={this.handleChange}
                            />

                            <TextField
                                required
                                name="password"
                                type="password"
                                label="Password"
                                fullWidth
                            // onChange={this.handleChange}
                            />
                            {this.state.error.status && <p>{this.state.error.message}</p>}

                            <Button type='submit' value="Login" variant='contained' onClick={this.handleLogout}>Login</Button>
                        </form>
                    </div>
                </div>



            </React.Fragment>



        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};




export default withStyles(styles)(Signup);


