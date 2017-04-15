import React from "react"

export default class Teachers extends React.Component{
    render() {
        return <div className="css-table">
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
            : null}
        </div>
    }
}
