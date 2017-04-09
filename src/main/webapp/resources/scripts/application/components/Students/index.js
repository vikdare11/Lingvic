import React from "react"
import Student from "./student"

export default class Students extends React.Component{
    render() {
        let students = this.props.students.map((student, index) =>
            <Student key={index} student={student}/>
        );
        return <div className="css-table">
          {students.length > 0
            ?  <table>
                  <tbody>
                  <tr>
                      <th>№</th>
                      <th>Имя</th>
                      <th>Номер группы</th>
                      <th>Информация</th>
                  </tr>
                  {students}
                  </tbody>
                </table>
            : null}
        </div>
    }
}
