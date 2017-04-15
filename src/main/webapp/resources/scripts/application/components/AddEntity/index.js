import React from "react"
import ReactDOM from 'react-dom'

export default class AddEntity extends React.Component{
    handleAddEntity(type) {
      let info = [], me = this;
      switch (type) {
        case "set":
          info = { name: ReactDOM.findDOMNode(me.refs.name).value }
          break;
        case "word":
          info = { name: ReactDOM.findDOMNode(me.refs.name).value,
                   description: ReactDOM.findDOMNode(me.refs.description).value,
                   url: ReactDOM.findDOMNode(me.refs.pictureUrl).value,
                   setId: this.props.setId }
          break;
        case "teacher":
          info = { login: ReactDOM.findDOMNode(me.refs.name).value,
                   password: ReactDOM.findDOMNode(me.refs.password).value,
                   name: ReactDOM.findDOMNode(me.refs.fio).value,
                   info: ReactDOM.findDOMNode(me.refs.info).value }
          break;
        case "student":
          info = { login: ReactDOM.findDOMNode(me.refs.name).value,
                   password: ReactDOM.findDOMNode(me.refs.password).value,
                   cardNumber: ReactDOM.findDOMNode(me.refs.card).value,
                   name: ReactDOM.findDOMNode(me.refs.fio).value,
                   info: ReactDOM.findDOMNode(me.refs.info).value }
          break;
        default:
          break;
      }
      this.props.onPopupClose(type, info);
    }

    render() {
        return <div>
        <div className="css-popup addEntity">
            <div className={`css-popup-content ${this.props.type}`}>
                <i className="fa fa-window-close-o" aria-hidden="true" onClick={this.props.onPopupClose.bind(this)}></i>
                <div className="css-set-label">
                  <span className="css-label">Добавить </span>
                  <span className="css-label">{this.props.type}</span>
                </div>
                {this.props.type == "word"
                  ? <div>
                      <div className="css-answerBlock">
                        <span className="css-label">Слово </span>
                        <input ref="name" type="text" className="css-answer-input" />
                      </div>
                      <div className="css-answerBlock">
                        <span className="css-label">Описание </span>
                        <textarea ref="description" className="css-answer-textarea"></textarea>
                      </div>
                      <div className="css-answerBlock">
                        <span className="css-label">Картинка </span>
                        <input ref="file" type="file" className="css-answer-file" accept="image/*" />
                        <input ref="pictureUrl" type="text" className="css-answer-input url" placeholder="Или введите url картинки" />
                      </div>
                    </div>
                  : null}
                {this.props.type == "set"
                  ? <div>
                      <div className="css-answerBlock">
                        <span className="css-label">Название </span>
                        <input ref="name" type="text" className="css-answer-input" />
                      </div>
                    </div>
                  : null}
                {this.props.type == "teacher"
                  ? <div>
                      <div className="css-answerBlock">
                        <span className="css-label">Имя пользователя</span>
                        <input ref="name" type="text" className="css-answer-input" />
                      </div>
                      <div className="css-answerBlock">
                        <span className="css-label">Пароль</span>
                        <input ref="password" type="text" className="css-answer-input" />
                      </div>
                      <div className="css-answerBlock">
                        <span className="css-label">ФИО</span>
                        <input ref="fio" type="text" className="css-answer-input" />
                      </div>
                      <div className="css-answerBlock">
                        <span className="css-label">Информация</span>
                        <textarea ref="info" className="css-answer-textarea"></textarea>
                      </div>
                    </div>
                  : null}
                {this.props.type == "student"
                  ? <div>
                      <div className="css-answerBlock">
                        <span className="css-label">Имя пользователя</span>
                        <input ref="name" type="text" className="css-answer-input" />
                      </div>
                      <div className="css-answerBlock">
                        <span className="css-label">Пароль</span>
                        <input ref="password" type="text" className="css-answer-input" />
                      </div>
                      <div className="css-answerBlock">
                        <span className="css-label">Номер студ. билета</span>
                        <input ref="card" type="text" className="css-answer-input" />
                      </div>
                      <div className="css-answerBlock">
                        <span className="css-label">ФИО</span>
                        <input ref="fio" type="text" className="css-answer-input" />
                      </div>
                      <div className="css-answerBlock">
                        <span className="css-label">Информация</span>
                        <textarea ref="info" className="css-answer-textarea"></textarea>
                      </div>
                    </div>
                  : null}
                <button className="css-button add" onClick={this.handleAddEntity.bind(this, this.props.type)}>Добавить</button>
            </div>
        </div>
        </div>
    }
}
