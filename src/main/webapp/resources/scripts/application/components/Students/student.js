import React from "react"

export default class Student extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.student.fullName}</td>
                <td>{this.props.student.groupNumber}</td>
            </tr>
        )
    }
}
