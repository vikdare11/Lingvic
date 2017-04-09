import React from "react"

export default class Menu extends React.Component{
    render() {
      const items = [
          {
            Id: 0,
            Label: "Студенты",
            faClass: "users"
          },
          {
            Id: 1,
            Label: "Наборы слов",
            faClass: "book"
          },
          {
            Id: 2,
            Label: "Мой профиль",
            faClass: "id-card-o"
          }
      ];
      return <div className="css-siteMenu">
        {items.map((element, index) => (
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
