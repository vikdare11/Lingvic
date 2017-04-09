import React from "react"

export default class Menu extends React.Component{
    render() {
      return <div className="css-siteMenu">
        {this.props.items.map((element, index) => (
            <div key={index}
                className={"css-siteMenu-item" + (element.Id == this.props.activeId ? " active" : "")}
                onClick={this.props.onClick.bind(this, element)}>
                    <i className={`fa fa-${element.faClass} css-siteMenu-item-icon`} aria-hidden="true"></i>
                    <span className="css-siteMenu-item-label">{element.Label}</span>
            </div>
        ))}
      </div>
    }
}
