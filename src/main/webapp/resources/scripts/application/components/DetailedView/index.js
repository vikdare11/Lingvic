import React from "react";
import {isEmptyObject} from '../../utils'
import {isNullOrUndefined} from '../../utils'

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

  getSets(student) {
    if (isEmptyObject(student.studentWordSets)) return;
    let completedSets = [], setsToChallenge = [];
    student.studentWordSets.forEach((set, index) => {
      if (set.isChallenged == 2) completedSets.push(set);
      if (set.isChallenged == 1) setsToChallenge.push(set);
    });
    return { completedSets: completedSets, setsToChallenge: setsToChallenge }
  }

  render() {
      const student = this.getStudent(this.props.students, this.props.studentId),
            sets = this.getSets(student);
      return <div>
        <button className="css-button" onClick={this.props.onCloseDetailedView}>Назад к списку</button>
        <div className="css-label-main">Карточка студента</div>
        <div><span className="css-label">Номер группы: </span><span>{student.groupNumber}</span></div>
        <div><span className="css-label">Имя: </span><span>{student.fullName}</span></div>
        <div><span className="css-label">Дополнительная информация: </span><span>{student.educationInfo}</span></div>
        {isNullOrUndefined(sets) || isEmptyObject(sets.completedSets)
          ? null
          : <div className="css-sets">
              <span className="css-label-main">Пройденные наборы: </span>
              {sets.completedSets.map((set, index) => ( <div key={index}>
                <div><span className="css-label">Название: </span><span>{set.set.name}</span></div>
                <div><span className="css-label">Дата выполнения: </span><span>{set.challengeDate}</span></div></div>
              ))}
            </div>}
        {isNullOrUndefined(sets) || isEmptyObject(sets.setsToChallenge)
          ? null
          : <div className="css-sets">
              <span className="css-label-main">Наборы, которые необходимо пройти: </span>
              {sets.setsToChallenge.map((set, index) => (
                <div key={index}><span className="css-label">Название: </span><span>{set.set.name}</span></div>
              ))}
          </div>}
      </div>
  }
}
