import React from "react";
import axios from "axios";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pwd: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const res = await axios.post('/api/login', {
            id: this.state.id,
            password: this.state.password
        });
        console.log(res.data);
        cookies.set('access_token', res.data.access_token, {
            path: '/',
            maxAge: 36000
        });
        cookies.set('refresh_token', res.data.refresh_token, {
            path: '/',
            maxAge: 36000 * 24 * 14
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    ID
                    <input type="text" name="id" value={this.state.id || ''} onChange={this.handleChange} />
                </label>
                <label>
                    PASSWORD
                    <input type="text" name="password" value={this.state.password || ''} onChange={this.handleChange} />
                </label>
                <input type='submit' value='제출' />
            </form>
        )
    }
}

export default LoginForm;