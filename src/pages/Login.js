import React from "react";
import axios from "axios";

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
      console.log(res.data);
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
        document.location = '/';
      }
    } catch (e) {
      alert('잠시 후 다시 시도해주세요');
      document.location = '/login';
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
