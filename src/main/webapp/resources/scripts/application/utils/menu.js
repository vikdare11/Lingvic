
export function getMenuItems(role) {
  let items = [];
  switch(role) {
    case "student":
        items = [
            {
              Id: 0,
              Name: "profile",
              Label: "Мой профиль",
              faClass: "id-card-o"
            }
        ]
        break;
    case "teacher":
        items = [
            {
              Id: 0,
              Name: "students",
              Label: "Студенты",
              faClass: "users"
            },
            {
              Id: 1,
              Name: "words",
              Label: "Наборы слов",
              faClass: "book"
            }
        ]
        break;
    case "admin":
      items = [
          {
            Id: 0,
            Name: "students",
            Label: "Студенты",
            faClass: "users"
          },
          {
            Id: 1,
            Name: "teachers",
            Label: "Преподаватели",
            faClass: "suitcase"
          }
      ]
      break;
    default:
      break;
  }
	return items;
}
