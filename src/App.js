import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./Login";
import axios from "axios";
import React from "react";


class HomeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    async componentDidMount() {
        try {
            const res = await axios.get('/api');
            this.setState({
                id: res.data.id
            })
        } catch (e) {
            try {
                const res = await axios.get('/api/login/refresh');
                const res1 = await axios.get('/api');
                this.setState({
                    id: res1.data.id
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    render() {
        const id = this.state.id;
        let auth;
        if (id === '') auth = <a href='/login'>로그인</a>
        else auth = id;
        return (
            <h1>{auth}</h1>
        )
    }
}

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
