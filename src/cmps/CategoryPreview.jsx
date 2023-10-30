import { NavLink } from "react-router-dom"

export function CategoryPreview({ category }) {
    function getStyle(){
        return {
            backgroundImage: `url("${category.imgUrl}")`
        }
    }

  return (
    <NavLink className="category-preview" to={`/collection/${category.name}`} style={getStyle()}>
      <div className="cover"></div>
      <h2 className="name">{category.name}</h2>
    </NavLink>
  )
}
