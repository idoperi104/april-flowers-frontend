import { useDispatch, useSelector } from "react-redux"
import {
  loadCategories,
  removeCategory,
  setCategoryFilterBy,
} from "../../store/actions/category.actions"
import { useCallback, useEffect } from "react"
import { AdminCategoryList } from "../../cmps/admin/AdminCategoryList.jsx"
import { Link, Outlet } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { AdminCategoryFilter } from "../../cmps/admin/AdminCategoryFilter"
import { categoryService } from "../../services/category.service"

export function AdminCategoryIndex() {
  const categories = useSelector(
    (storeState) => storeState.categoryModule.categories
  )
  // console.log("categories: ", categories)
  const categoryFilterBy = useSelector(
    (storeState) => storeState.categoryModule.categoryFilterBy
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(setCategoryFilterBy(categoryService.getEmptyFilterBy()))
    }
  }, [])

  const onRemoveCategory = useCallback(async (categoryId) => {
    try {
      dispatch(removeCategory(categoryId))
    } catch (error) {
      console.log("error: ", error)
    }
  }, [])

  const onChangeFilter = (categoryFilterBy) => {
    dispatch(setCategoryFilterBy(categoryFilterBy))
    dispatch(loadCategories())
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

      <AdminCategoryFilter
        categoryFilterBy={categoryFilterBy}
        onChangeFilter={onChangeFilter}
      />

      <AdminCategoryList
        categories={categories}
        onRemoveCategory={onRemoveCategory}
      />
    </section>
  )
}
