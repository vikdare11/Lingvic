import React from "react";
import {isEmptyObject} from '../../utils'
import {isNullOrUndefined} from '../../utils'

export default class DetailedView extends React.Component{
  constructor(props) {
    super(props);
    const student = this.getStudent(props.students, props.studentId),
          sets = this.getSets(student);
    this.state = {
      student: student,
      selectValue: isEmptyObject(sets.restSets) ? "" : sets.restSets[0].set.name,
      completedSets: sets.completedSets,
      setsToChallenge: sets.setsToChallenge,
      restSets: sets.restSets
    }
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
    if (isEmptyObject(student.studentWordSets))
      return { completedSets: [], setsToChallenge: [], restSets: [] };
    let completedSets = [], setsToChallenge = [], restSets = [];
    student.studentWordSets.forEach((set, index) => {
      if (set.isChallenged == 2) completedSets.push(set);
      if (set.isChallenged == 1) setsToChallenge.push(set);
      if (set.isChallenged == 0) restSets.push(set);
    });
    return { completedSets: completedSets, setsToChallenge: setsToChallenge, restSets: restSets }
  }

  assignSetToStudent() {
    console.log(this.state.selectValue);
  }

  setSelectValue(e) {
    this.setState({ selectValue: e.target.value });
  }

  render() {
      const student = this.state.student;
      return <div>
        <button className="css-button" onClick={this.props.onCloseDetailedView}>Назад к списку</button>
        <div className="css-label-main">Карточка студента</div>
        <div><span className="css-label">Номер группы: </span><span>{student.groupNumber}</span></div>
        <div><span className="css-label">Имя: </span><span>{student.fullName}</span></div>
        <div><span className="css-label">Дополнительная информация: </span><span>{student.educationInfo}</span></div>
        {isEmptyObject(this.state.completedSets)
          ? null
          : <div className="css-sets">
              <span className="css-label-main">Пройденные наборы: </span>
              {this.state.completedSets.map((set, index) => ( <div key={index}>
                <div><span className="css-label">Название: </span><span>{set.set.name}</span></div>
                <div><span className="css-label">Дата выполнения: </span><span>{set.challengeDate}</span></div></div>
              ))}
            </div>}
        {isEmptyObject(this.state.setsToChallenge)
          ? null
          : <div className="css-sets">
              <span className="css-label-main">Наборы, которые необходимо пройти: </span>
              {this.state.setsToChallenge.map((set, index) => (
                <div key={index}><span className="css-label">Название: </span><span>{set.set.name}</span></div>
              ))}
          </div>}
        {isEmptyObject(this.state.restSets)
          ? null
          : <div className="css-sets">
              <span className="css-label-main">Назначить набор, который необходимо пройти: </span>
              <select ref="setSelect"
                      className="css-select"
                      value={this.state.selectValue}
                      onChange={this.setSelectValue.bind(this)}>
                {this.state.restSets.map((set, index) => (
                  <option key={index}>{set.set.name}</option>
                ))}
              </select>
              <button className="css-button" onClick={this.assignSetToStudent.bind(this)}>Назначить</button>
          </div>}
      </div>
  }
}
