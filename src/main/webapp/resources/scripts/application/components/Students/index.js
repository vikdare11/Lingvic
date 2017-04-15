import React from "react"
import Student from "./student"
import AddEntity from "../AddEntity"

export default class Students extends React.Component{
    constructor() {
      super();
      this.state = { isPopupOpened: false }
    }

    handlePopupOpen() {
      this.setState({ isPopupOpened: true })
    }

    handlePopupClose(type, info) {
      this.setState({ isPopupOpened: false })
      this.props.onAddNewStudent(info);
    }
    render() {
        const role = this.props.user.role[0].name
        return <div><div className="css-table">
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
            : null}</div>
            {role == "admin"
              ? <button className="css-button teacher" onClick={this.handlePopupOpen.bind(this)}>+ Студент</button>
              : null}
            {this.state.isPopupOpened && role == "admin"
              ? <AddEntity type={"student"}
                           onPopupClose={this.handlePopupClose.bind(this)} />
              : null}
        </div>
    }
}
