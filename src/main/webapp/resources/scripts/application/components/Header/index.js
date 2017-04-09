import React from "react"

export default class Header extends React.Component{
    render() {
      return <div className={`css-siteHeader ${this.props.isMenuOpened ? "menuOpened" : ""}`}>
        <div className="fa fa-bars css-menuButton" onClick={this.props.onToggleMenu}></div>
        <div className="css-logo">Lingvic</div>
        <button className="css-logoutButton">Выйти</button>
      </div>
    }
}
