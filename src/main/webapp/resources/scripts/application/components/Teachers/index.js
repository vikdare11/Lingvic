import React from "react"
import AddEntity from "../AddEntity"

export default class Teachers extends React.Component{
    constructor() {
      super();
      this.state = { isPopupOpened: false }
    }

    handlePopupOpen() {
      this.setState({ isPopupOpened: true })
    }

    handlePopupClose(type, info) {
      this.setState({ isPopupOpened: false })
      this.props.onAddNewTeacher(info);
    }

    render() {
        return <div><div className="css-table">
          {this.props.teachers.length > 0
            ?  <table>
                  <tbody>
                  <tr>
                      <th>№</th>
                      <th>Имя пользователя</th>
                      <th>ФИО</th>
                      <th>Информация</th>
                  </tr>
                  {this.props.teachers.map((teacher, index) =>
                    <tr key={index} className="css-tableRow">
                      <td>{index+1}</td>
                      <td>{teacher.user.login}</td>
                      <td>{teacher.fullName}</td>
                      <td>{teacher.educationInfo}</td>
                    </tr>
                  )}
                  </tbody>
                </table>
            : null}</div>
            <button className="css-button teacher" onClick={this.handlePopupOpen.bind(this)}>+ Преподаватель</button>
            {this.state.isPopupOpened
              ? <AddEntity type={"teacher"}
                           onPopupClose={this.handlePopupClose.bind(this)} />
              : null}
        </div>
    }
}
