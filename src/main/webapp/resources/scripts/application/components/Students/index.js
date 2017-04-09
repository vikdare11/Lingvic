import React from "react"
import Student from "./student"

export default class Students extends React.Component{
    render() {
        let students = this.props.students.map((student, index) =>
            <Student key={index} student={student}/>
        );
        return (
          students.length > 0
            ?  <table>
                  <tbody>
                  <tr>
                      <th>Full Name</th>
                      <th>Group Number</th>
                  </tr>
                  {students}
                  </tbody>
                </table>
            : null
        )
    }
}
