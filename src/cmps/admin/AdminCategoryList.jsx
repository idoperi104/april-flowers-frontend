import { memo } from "react"
import { AdminCategoryPreview } from "./AdminCategoryPreview.jsx"

function _AdminCategoryList({ categories, onRemoveCategory, onUpdateCategoryKeyVal }) {
  return (
    <ul className="admin-category-list">
      {categories.map((category) => (
        <AdminCategoryPreview
          key={category._id}
          category={category}
          onRemoveCategory={onRemoveCategory}
          onUpdateCategoryKeyVal={onUpdateCategoryKeyVal}
        />
      ))}
    </ul>
  )
}

export const AdminCategoryList = memo(_AdminCategoryList)
