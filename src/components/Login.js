import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './login.css'
import isLoggedIn from "../utils/isLoggedIn";




class Login extends React.Component {

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

        fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: e.target.username.value,
                password: e.target.password.value,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (typeof data.token !== "undefined") {
                    localStorage.setItem("token", data.token);
                    const url = window.decodeURIComponent(this.props.location.search);
                    console.log(url)
                    if (url !== '') {
                        this.props.history.push("/" + url.split("/")[1] || "/");

                    } else {
                        this.props.history.push("/");
                    }
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
                <div className='thislogin'>
                    <div class="container" id="registration-form">
                        <div class="image"></div>
                        <div class="frm">
                            <h1>Log In</h1>
                            <form onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <TextField
                                        required
                                        name="username"
                                        label="Email"
                                        fullWidth
                                    // onChange={this.handleChange}
                                    />
                                </div>
                                <div class="form-group">
                                    <TextField
                                        required
                                        name="password"
                                        type="password"
                                        label="Password"
                                        fullWidth
                                    // onChange={this.handleChange}
                                    />
                                </div>
                                {this.state.error.status && <p>{this.state.error.message}</p>}
                                <div class="form-group">
                                    <Button type='submit' value="Login" variant='contained' onClick={this.handleLogout}>Login</Button>
                                </div>
                            </form>
                        </div>
                    </div>




                </div>

            </React.Fragment>



        );
    }
}






export default (Login);


