import React from "react"
import Student from "./student"

export default class Students extends React.Component{
    render() {
        const role = this.props.user.role[0].name
        return <div className="css-table">
          {this.props.students.length > 0
            ?  <table>
                  <tbody>
                  <tr>
                      <th>№</th>
                      {role == "admin"
                        ? <th>Номер студ. билета</th>
                        : null}
                      {role == "admin"
                        ? <th>Имя пользователя</th>
                        : null}
                      <th>ФИО</th>
                      <th>Номер группы</th>
                      <th>Информация</th>
                  </tr>
                  {this.props.students.map((student, index) =>
                      <Student key={index} student={student} role={role} onClick={this.props.onStudentClick.bind(this)}/>
                  )}
                  </tbody>
                </table>
            : null}
        </div>
    }
}
