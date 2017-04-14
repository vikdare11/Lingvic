import React from "react"

export default class WordSets extends React.Component{
    render() {
        return <div className="css-table">
        {this.props.sets.length > 0
          ?  <table>
                <tbody>
                <tr>
                    <th>№</th>
                    <th>Названия</th>
                    <th>Слова</th>
                </tr>
                {this.props.sets.map((set, index) =>
                  <tr key={index} className="css-tableRow">
                    <td>{set.id}</td>
                    <td>{set.name}</td>
                    <td>{set.wordSet.map((word, wordIndex) => (
                      <span key={wordIndex}>{word.word.concat(wordIndex == set.wordSet.length - 1 ? "" : ", ")}</span>
                    ))}</td>
                  </tr>
                )}
                </tbody>
              </table>
          : null}
        </div>
    }
}
