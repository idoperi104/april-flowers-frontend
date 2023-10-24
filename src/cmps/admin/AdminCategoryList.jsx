import { memo } from "react"
import { AdminCategoryPreview } from "./AdminCategoryPreview.jsx"

function _AdminCategoryList({ categories, onRemoveCategory }) {
  return (
    <ul className="admin-category-list">
      {categories.map((category) => (
        <AdminCategoryPreview
          key={category._id}
          category={category}
          onRemoveCategory={onRemoveCategory}
        />
      ))}
    </ul>
  )
}

export const AdminCategoryList = memo(_AdminCategoryList)
