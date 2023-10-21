import { useDispatch, useSelector } from "react-redux"
import {
  loadCategories,
  removeCategory,
  updateCategoryKeyVal,
} from "../../store/actions/category.actions"
import { useCallback, useEffect } from "react"
import { AdminCategoryList } from "../../cmps/admin/AdminCategoryList.jsx"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link, Outlet } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export function AdminCategoryIndex() {
  const categories = useSelector(
    (storeState) => storeState.categoryModule.categories
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCategories())

    return () => {}
  }, [])

  const onRemoveCategory = useCallback(async (categoryId) => {
    try {
      dispatch(removeCategory(categoryId))
    } catch (error) {
      console.log("error: ", error)
    }
  }, [])

  async function onUpdateCategoryKeyVal(category, key, val) {
    try {
      dispatch(updateCategoryKeyVal(category, key, val))
    } catch (error) {
      console.log("error:", error)
    }
  }

  if (!categories) return <div>Loading...</div>
  return (
    <section className="admin-category-index">
      <Link className="link-add" to="edit">
        <button className="btn-add">
          <div className="icon">
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <span>הוספת קטגוריה חדשה</span>
        </button>
      </Link>

      <Outlet />

      <h2 className="title">רשימת קטגוריות:</h2>

      <AdminCategoryList
        categories={categories}
        onUpdateCategoryKeyVal={onUpdateCategoryKeyVal}
        onRemoveCategory={onRemoveCategory}
      />
    </section>
  )
}
