'use strict';

const React = require('react')
const ReactDOM = require('react-dom')
const client = require('./client')
const Students = require('./components/Students')

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
            <Students students={this.state.students} />
        )
    }
}

ReactDOM.render(
<App />,
    document.getElementById('react')
)