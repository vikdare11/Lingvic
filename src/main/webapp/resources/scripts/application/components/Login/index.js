import React from "react"
import ReactDOM from 'react-dom'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: "", isValid: false };
  }

  handleLoginClick() {
    const login = ReactDOM.findDOMNode(this.refs.login).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    if (this.validateData(login, password)) {
      this.props.onClick(login, password);
    }
  }

  setValidation(message, isValid) {
    this.setState({ error: message, isValid: isValid });
  }

  validateData(login, password) {
    let isValid = true;
    this.setState({ error: "", isValid: true });
    if (!login && !password) {
        this.setState({ error: "Введите имя пользователя и пароль", isValid: false });
        isValid = false;
    }
    if (!login && password) {
        this.setState({ error: "Введите имя пользователя", isValid: false });
        isValid = false;
    }
    if (login && !password) {
        this.setState({ error: "Введите пароль", isValid: false });
        isValid = false;
    }
    return isValid;
  }

  render() {
    return <div className="css-login">
      <label><b>Имя пользователя</b></label>
      <input ref="login" className="css-loginInput" type="text" placeholder="Введите имя пользователя" name="uname" />
      <label><b>Пароль</b></label>
      <input ref="password" className="css-loginInput" type="password" placeholder="Введите пароль" name="psw" />
      <button className="css-loginButton" onClick={this.handleLoginClick.bind(this)}>Вход</button>
      <span className="css-validation">{this.state.error}</span>
    </div>
  }
}
