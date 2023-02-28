import React, {useState} from "react";
import axios from "axios";

function Login () {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await axios.post('/api/login', {
            id: id,
            password: password
        });

        if (res.data.access_token === 'pwd_false') {
            alert('비밀번호를 확인하세요');
            document.location = '/login';
        } else if (res.data.access_token === 'id_false') {
            alert('아이디를 확인하세요');
            document.location = '/login';
        } else if (res.data.access_token === 'false') {
            alert('모든 정보를 입력하세요');
            document.location = '/login';
        } else {
            document.location = '/main';
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case 'id': setId(value); break;
            default: setPassword(value);
        }
    }

    return (
        <div style={{position: "absolute"}}>
            <div id="login_Logo" ></div>
            <form onSubmit={handleSubmit}>
                <label >
                    <input id="login_id" type="text" name="id" value={id || ''} onChange={handleChange} placeholder="ID" />
                </label>
                <label >
                    <input id="login_pw" type="text" name="password" value={password || ''} onChange={handleChange} placeholder="PW" />
                </label>
                <input  id="login_btn"type='submit' value='로그인' />
            </form>
        </div>
    )
}

export default Login;