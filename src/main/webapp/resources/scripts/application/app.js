'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import client from './client'
import Students from './components/Students'
import Menu from './components/Menu'
import Header from './components/Header'
import Login from './components/Login'
import {isEmptyObject} from './utils'
import {getMenuItems} from './utils/menu'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { menuItem: [], menuItems: [], isMenuOpened: false, students: [], currentUser: [] };
    }

    componentDidMount() {
        client({method: 'GET', path: '/student/all'}).done(response => {
            this.setState({students: response.entity});
        });
    }

    handleOnMenuClick(item) {
        this.setState({ menuItem: item })
    }

    handleToggleMenu() {
        this.setState({ isMenuOpened: !this.state.isMenuOpened })
    }

    handleLoginClick(login, password) {
      var xhr = new XMLHttpRequest(),
          me = this;
      xhr.open('POST', '/auth');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          if (isEmptyObject(data))
            me.setState({ currentUser: [], menuItems: [] });
          else {
            const menuItems = getMenuItems(data.role[0].name);
            me.setState({ currentUser: data, menuItems: menuItems, menuItem: menuItems[0] });
          }
        }
        if (xhr.status === 404) {
          me.refs.login.setValidation("Пользователя с введёнными данными не существует");
        }
      };
      xhr.send(JSON.stringify({ login: login, password: password }));
    }

    handleLogoutClick() {
      this.setState({ currentUser: [] });
    }

    render() {
        return isEmptyObject(this.state.currentUser)
          ? <Login ref="login" onClick={this.handleLoginClick.bind(this)}/>
          : <div className="css-site">
            <Header onToggleMenu={this.handleToggleMenu.bind(this)}
                    onLogoutClick={this.handleLogoutClick.bind(this)}
                    isMenuOpened={this.state.isMenuOpened}/>
            {this.state.isMenuOpened
              ? <Menu onClick={this.handleOnMenuClick.bind(this)}
                    activeId={this.state.menuItem.Id}
                    items={this.state.menuItems}/>
              : null}
            <div className={`css-siteBody ${this.state.isMenuOpened ? "menuOpened" : ""}`}>
              {this.state.menuItem.Name == "students"
                ? <Students students={this.state.students}/>
                : null}
            </div>
          </div>
    }
}

ReactDOM.render(
<App />,
    document.getElementById('css-site-wrapper')
)
