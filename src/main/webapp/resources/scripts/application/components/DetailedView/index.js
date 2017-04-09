import React from "react";
import {isEmptyObject} from '../../utils'

export default class DetailedView extends React.Component{
  constructor() {
    super();
    this.state = { student: [] }
  }

  getStudent(students, studentId) {
    if (isEmptyObject(students)) return;
    var student = [];
    students.forEach((localStudent, index) => {
      if (localStudent.user_id == studentId) {
        student = localStudent;
        return;
      }
    });
    return student;
  }

  render() {
      const student = this.getStudent(this.props.students, this.props.studentId);
      console.log(student);
      return <div>
        <button className="css-button" onClick={this.props.onCloseDetailedView}>Назад к списку</button>
        <div className="css-label-main">Карточка студента</div>
        <div><span className="css-label">Номер группы: </span><span>{student.groupNumber}</span></div>
        <div><span className="css-label">Имя: </span><span>{student.fullName}</span></div>
        <div><span className="css-label">Дополнительная информация: </span><span>{student.educationInfo}</span></div>
      </div>
  }
}
