import React from "react"
import AddEntity from "./addEntity"

export default class WordSets extends React.Component{
    constructor() {
      super();
      this.state = ({ isPopupOpened: false, popupType: "", setId: null });
    }

    handlePopupOpen(isWord, setId) {
      this.setState({ isPopupOpened: true, popupType: isWord ? "word" : "set", setId: setId })
    }

    handlePopupClose(type, info) {
      this.setState({ isPopupOpened: false, popupType: "" })
      console.log(type, info);
    }

    render() {
        return <div><div className="css-table">
        {this.props.sets.length > 0
          ?  <table>
                <tbody>
                <tr>
                    <th>№</th>
                    <th>Названия</th>
                    <th>Слова</th>
                    <th></th>
                </tr>
                {this.props.sets.map((set, index) =>
                  <tr key={index} className="css-tableRow">
                    <td>{index+1}</td>
                    <td>{set.name}</td>
                    <td>{set.wordSet.map((word, wordIndex) => (
                      <span key={wordIndex}>{word.word.concat(wordIndex == set.wordSet.length - 1 ? "" : ", ")}</span>
                    ))}</td>
                    <td><button className="css-button" onClick={this.handlePopupOpen.bind(this, true, set.id)}>+ Слово</button></td>
                  </tr>
                )}
                </tbody>
              </table>
          : null}
        </div>
        <button className="css-button" onClick={this.handlePopupOpen.bind(this, false)}>+ Набор</button>
        {this.state.isPopupOpened
          ? <AddEntity type={this.state.popupType}
                       onPopupClose={this.handlePopupClose.bind(this)}
                       setId={this.state.setId} />
          : null}
        </div>
    }
}
