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
                   setId: this.props.setId }
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
                      </div>
                    </div>
                  : <div>
                      <div className="css-answerBlock">
                        <span className="css-label">Название </span>
                        <input ref="name" type="text" className="css-answer-input" />
                      </div>
                    </div>}
                <button className="css-button add" onClick={this.handleAddEntity.bind(this, this.props.type)}>Добавить</button>
            </div>
        </div>
        </div>
    }
}
