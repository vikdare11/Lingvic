import React from "react"

export default class Student extends React.Component{
    render() {
        return (
            <tr className="css-tableRow">
                <td>{this.props.student.user_id}</td>
                <td>{this.props.student.fullName}</td>
                <td>{this.props.student.groupNumber}</td>
                <td>{this.props.student.educationInfo}</td>
            </tr>
        )
    }
}
