'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import client from './client'
import Students from './components/Students'
import Menu from './components/Menu'
import Header from './components/Header'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { menuId: 0, isMenuOpened: false, students: [] };
    }

    componentDidMount() {
        client({method: 'GET', path: '/student/all'}).done(response => {
            this.setState({students: response.entity});
        });
    }

    handleOnMenuClick(item) {
        this.setState({ menuId: item.Id })
    }

    handleToggleMenu() {
        this.setState({ isMenuOpened: !this.state.isMenuOpened })
    }

    render() {
        return <div className="css-site">
          <Header onToggleMenu={this.handleToggleMenu.bind(this)}
                  isMenuOpened={this.state.isMenuOpened}/>
          {this.state.isMenuOpened
            ? <Menu onClick={this.handleOnMenuClick.bind(this)}
                  activeId={this.state.menuId}/>
            : null}
          <div className={`css-siteBody ${this.state.isMenuOpened ? "menuOpened" : ""}`}>
            {this.state.menuId == 0
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
