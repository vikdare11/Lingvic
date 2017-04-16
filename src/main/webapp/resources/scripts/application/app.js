'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import md5 from 'md5'
import client from './client'

import Students from './components/Students'
import Teachers from './components/Teachers'
import Menu from './components/Menu'
import Header from './components/Header'
import Login from './components/Login'
import DetailedView from './components/DetailedView'
import Quiz from './components/Quiz'
import WordSets from './components/WordSets'

import {isEmptyObject, isNullOrUndefined} from './utils'
import {getMenuItems} from './utils/menu'
import {getWordSetsByStudentsList} from './utils/sets'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          menuItem: [],
          menuItems: [],
          isMenuOpened: true,
          students: [],
          currentUser: [],
          currentStudentId: -1,
          isChallengeBegun: false,
          setToChallenge: null,
          teachers: []
        };
    }

    componentDidMount() {
        client({method: 'GET', path: '/student/all'}).done(response => {
            this.setState({ students: response.entity });
        });

        client({method: 'GET', path: '/teacher/all'}).done(response => {
            this.setState({ teachers: response.entity });
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

    handleOnStudentClick(studentId) {
      this.setState({ currentStudentId: studentId });
    }

    closeDetailedView() {
      this.setState({ currentStudentId: -1 })
    }

    getAllWordSets() {
      return getWordSetsByStudentsList(this.state.students);
    }

    handleAssignSet(setId, studentId, isChallenged) {
      if (isNullOrUndefined(setId) || isNullOrUndefined(studentId) || isNullOrUndefined(isChallenged)) return;
      var xhr = new XMLHttpRequest(),
          me = this;
      xhr.open('POST', '/student/assign_set');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          if (!isEmptyObject(data))
            me.setState({ students: data });
        }
        if (xhr.status === 404) {
        }
      };
      xhr.send(JSON.stringify({ setId: setId, studentId: studentId, isChallenged: isChallenged }));
    }

    sendResult(result, setId) {
      this.handleAssignSet(setId, this.state.currentUser.id, result.isSuccessful ? 2 : 1)
    }

    handleStartChallenge(set) {
      this.setState({ isChallengeBegun: true, setToChallenge: set });
    }

    handlePopupClose() {
      this.setState({ isChallengeBegun: false, setToChallenge: null });
    }

    handleAddTeacher(info) {
      if (isNullOrUndefined(info)) return;
      var xhr = new XMLHttpRequest(),
          me = this;
      xhr.open('POST', '/teacher/add');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          if (!isEmptyObject(data))
            me.setState({ teachers: data });
        }
        if (xhr.status === 404) {
        }
      };
      xhr.send(JSON.stringify({ fullName: info.name,
                                educationInfo: info.info,
                                user: { login: info.login, password: md5(info.password), role: [ { id: 2 } ] } }));
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
                ? this.state.currentStudentId < 0
                  ? <Students students={this.state.students}
                              onStudentClick={this.handleOnStudentClick.bind(this)}
                              user={this.state.currentUser}/>
                  : <DetailedView studentId={this.state.currentStudentId}
                                  students={this.state.students}
                                  onCloseDetailedView={this.closeDetailedView.bind(this)}
                                  onAssignSet={this.handleAssignSet.bind(this)}/>
                : null}
              {this.state.menuItem.Name == "profile"
                ? <DetailedView studentId={this.state.currentUser.id}
                                students={this.state.students}
                                onStartChallenge={this.handleStartChallenge.bind(this)}  />
                : null}
              {this.state.menuItem.Name == "words"
                ? <WordSets sets={this.getAllWordSets()} />
                : null}
              {this.state.menuItem.Name == "teachers"
                ? <Teachers teachers={this.state.teachers}
                            onAddNewTeacher={this.handleAddTeacher.bind(this)}/>
                : null}
            </div>
            {this.state.isChallengeBegun
              ? <Quiz set={this.state.setToChallenge}
                      onPopupClose={this.handlePopupClose.bind(this)}
                      onFinishQuiz={this.sendResult.bind(this)}/>
              : null}
          </div>
    }
}

ReactDOM.render(
<App />,
    document.getElementById('css-site-wrapper')
)
