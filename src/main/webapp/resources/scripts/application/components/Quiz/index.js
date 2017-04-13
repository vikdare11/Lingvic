import React from "react"
import ReactDOM from 'react-dom'
import cloneDeep from 'lodash/cloneDeep'

import {isNullOrUndefined} from '../../utils'

export default class Quiz extends React.Component{
    constructor(props) {
      super(props);
      this.state = { currentQuestion: 0,
                     maxQuestionId: props.set.wordSet.length - 1,
                     answers: [],
                     value: "",
                     result: { isSuccessful: true, message: "Passed! :)" },
                     isFinished: false
                   }
    }

    handleNextClick() {
      const value = this.state.value;
      var answers = cloneDeep(this.state.answers);
      answers.push(value);
      this.setState({ answers, value: "" });
      if (this.state.currentQuestion == this.state.maxQuestionId) {
        const result = this.checkAnswers(answers);
        this.setState({ isFinished: true });
        this.props.onFinishQuiz(result, this.props.set.id);
      } else {
        this.setState({ currentQuestion: this.state.currentQuestion + 1 });
      }
    }

    checkAnswers(answers) {
      if (isNullOrUndefined(answers)) return;
      var result = this.state.result;
      this.props.set.wordSet.forEach((word, index) => {
        if (word.word.trim().toLowerCase() !== answers[index].trim().toLowerCase()) {
          this.setState({ result: { isSuccessful: false, message: "Failed! :(" } });
          result = { isSuccessful: false, message: "Failed! :(" }
        }
      });
      return result;
    }

    handlePreviousClick() {
      const previousQuestion = this.state.currentQuestion - 1;
      this.setState({ currentQuestion: previousQuestion, value: this.state.answers[previousQuestion] });
    }

    handleChange(e) {
      this.setState({ value: e.target.value });
    }

    render() {
      const currentQuestion = this.state.currentQuestion,
            question = this.props.set.wordSet[currentQuestion];
      return <div>
          <div className="css-popup">
              <div className="css-popup-content">
                  <i className="fa fa-window-close-o" aria-hidden="true" onClick={this.props.onPopupClose.bind(this)}></i>
                  <div className="css-set-label">
                    <span className="css-label">Name: </span>
                    {this.props.set.name}
                  </div>
                  <br/>
                  {this.state.isFinished
                    ? <div>
                        <span className="css-label">{this.state.result.message}</span>
                        <button className="css-button close" onClick={this.props.onPopupClose.bind(this)}>Close</button>
                    </div>
                    : <div>
                    <div>
                      <div className="css-label">Enter the word according to the following description: </div>
                      <div className="css-word-text">{question.description}</div>
                      <img className="css-image" src={question.imageLink}/>
                    </div>
                    <br/>
                    <input ref="answer"
                          className="css-answer"
                          type="text"
                          onChange={this.handleChange.bind(this)}
                          value={this.state.value} />
                    { currentQuestion == 0
                      ? null
                      : <button className="css-button previous" onClick={this.handlePreviousClick.bind(this)}>Previous</button> }
                    <button className="css-button next" onClick={this.handleNextClick.bind(this)}>{currentQuestion == this.state.maxQuestionId
                      ? "Finish"
                      : "Next"}</button>
                    </div>}
              </div>
          </div>
        </div>
    }
}
