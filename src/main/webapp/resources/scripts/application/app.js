'use strict';

const React = require('react');
const ReactDOM = require('react-dom')
const client = require('./client');

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
            <div>{this.state.students.map((student, index) => ( <div key={index}>{student.fullName}</div> ))}</div>
        )
    }
}

ReactDOM.render(
<App />,
    document.getElementById('react')
)