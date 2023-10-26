import { memo } from "react"
import { CategoryPreview } from "./CategoryPreview.jsx"

function _CategoryList({ categories }) {
  return (
    <nav className="category-list">
      {categories.map((category) => (
        <CategoryPreview key={category._id} category={category} />
      ))}
    </nav>
  )
}

export const CategoryList = memo(_CategoryList)
