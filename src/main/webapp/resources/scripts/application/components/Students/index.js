import React from "react"
import Student from "./student"

export default class Students extends React.Component{
    render() {
        return <div className="css-table">
          {this.props.students.length > 0
            ?  <table>
                  <tbody>
                  <tr>
                      <th>№</th>
                      <th>Имя</th>
                      <th>Номер группы</th>
                      <th>Информация</th>
                  </tr>
                  {this.props.students.map((student, index) =>
                      <Student key={index} student={student} onClick={this.props.onStudentClick.bind(this)}/>
                  )}
                  </tbody>
                </table>
            : null}
        </div>
    }
}
