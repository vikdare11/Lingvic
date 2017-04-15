import React from "react";
import {isEmptyObject, isNullOrUndefined} from '../../utils'

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

  componentWillReceiveProps(nextProps) {
    const student = this.getStudent(nextProps.students, nextProps.studentId),
          sets = this.getSets(student);
    this.setState({
      student: student,
      selectValue: isEmptyObject(sets.restSets) ? "" : sets.restSets[0].set.name,
      completedSets: sets.completedSets,
      setsToChallenge: sets.setsToChallenge,
      restSets: sets.restSets
    });
  }

  getStudent(students, studentId) {
    if (isEmptyObject(students)) return;
    let student = [];
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
    this.props.onAssignSet(this.getSetId(), this.state.student.user_id, 1);
  }

  setSelectValue(e) {
    this.setState({ selectValue: e.target.value });
  }

  getSetId() {
    if (isEmptyObject(this.state.restSets)) return;
    let setId;
    this.state.restSets.forEach((set, index) => {
      if (set.set.name == this.state.selectValue) {
        setId = set.set.id;
        return;
      }
    });
    return setId;
  }

  render() {
      const student = this.state.student;
      return <div>
        {isNullOrUndefined(this.props.onCloseDetailedView)
          ? null
          : <button className="css-button" onClick={this.props.onCloseDetailedView}>Назад к списку</button>}
        <div className="css-label-main">Карточка студента</div>
        <div><span className="css-label">Номер группы: </span><span>{student.groupNumber}</span></div>
        <div><span className="css-label">Имя: </span><span>{student.fullName}</span></div>
        <div><span className="css-label">Дополнительная информация: </span><span>{student.educationInfo}</span></div>
        {isEmptyObject(this.state.completedSets)
          ? null
          : <div className="css-sets">
              <span className="css-label-main">Пройденные наборы: </span>
              <table className="css-table-mini">
              <tbody>
                <tr>
                  <th>№</th>
                  <th>Название</th>
                  <th>Дата выполнения</th>
                </tr>
                {this.state.completedSets.map((set, index) => (
                  <tr key={index} className="css-tableRow">
                    <td>{index+1}</td>
                    <td>{set.set.name}</td>
                    <td>{set.challengeDate}</td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>}
        {isEmptyObject(this.state.setsToChallenge)
          ? null
          : <div className="css-sets">
              <span className="css-label-main">Наборы, которые необходимо пройти: </span>
              <table className="css-table-mini">
              <tbody>
                <tr>
                  <th>№</th>
                  <th>Название</th>
                  <th></th>
                </tr>
                {this.state.setsToChallenge.map((set, index) => (
                  <tr key={index} className="css-tableRow">
                    <td>{index+1}</td>
                    <td>{set.set.name}</td>
                    <td>{isNullOrUndefined(this.props.onStartChallenge)
                      ? null
                      : <button className="css-button" onClick={this.props.onStartChallenge.bind(this, set.set)}>Начать</button>}</td>
                  </tr>
                ))}
              </tbody>
              </table>
          </div>}
        {isEmptyObject(this.state.restSets) || isNullOrUndefined(this.props.onAssignSet)
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
