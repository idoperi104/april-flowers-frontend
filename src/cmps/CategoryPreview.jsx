import { NavLink } from "react-router-dom"

export function CategoryPreview({ category }) {
    function getStyle(){
        return {
            backgroundImage: `url("https://cdn.shopify.com/s/files/1/0384/6721/files/orange_card.jpg?v=1694220856&width=1800&height=2250&crop=center")`
        }
    }

  return (
    <NavLink className="category-preview" to={category._id} style={getStyle()}>
      <h2 className="name">{category.name}</h2>
      <div className="cover"></div>
    </NavLink>
  )
}
