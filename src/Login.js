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

        try {
            const res = await axios.post('/api/login', {
                id: this.state.id,
                password: this.state.password
            });
        } catch (e) {
            try {
                const refresh_token = cookies.get('refresh_token');
                const res = await axios.post('/api/login/refresh', {
                    refresh_token: refresh_token
                });
            } catch (e) {

            }
        }
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