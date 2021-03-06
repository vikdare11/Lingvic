import React from "react"

export default class Student extends React.Component{
    render() {
        return <tr className="css-tableRow" onClick={this.props.onClick.bind(this, this.props.student.user_id)}>
                <td>{this.props.student.user_id}</td>
                {this.props.role == "admin"
                  ? <td>{this.props.student.studentCard.cardNumber}</td>
                  : null}
                {this.props.role == "admin"
                  ? <td>{this.props.student.user.login}</td>
                  : null}
                <td>{this.props.student.fullName}</td>
                <td>{this.props.student.groupNumber}</td>
                <td>{this.props.student.educationInfo}</td>
            </tr>
    }
}
