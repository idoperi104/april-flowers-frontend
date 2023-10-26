import { useDispatch, useSelector } from "react-redux"
import { CategoryList } from "./CategoryList"
import { loadCategories } from "../store/actions/category.actions"
import { useEffect } from "react"

export function CategoryIndex() {
  const categories = useSelector(
    (storeState) => storeState.categoryModule.categories
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCategories())
    return () => {}
    // eslint-disable-next-line
  }, [])

  return categories ? (
    <section className="category-index">
      <CategoryList categories={categories} />
    </section>
  ) : (
    <div>loading...</div>
  )
}
