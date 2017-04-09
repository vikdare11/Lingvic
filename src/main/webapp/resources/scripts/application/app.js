'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import client from './client'
import Students from './components/Students'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { students: [] };
    }

    componentDidMount() {
        client({method: 'GET', path: '/student/all'}).done(response => {
            this.setState({students: response.entity});
        });
    }

    render() {
        return (
            <Students students={this.state.students}/>
        )
    }
}

ReactDOM.render(
<App />,
    document.getElementById('react')
)
