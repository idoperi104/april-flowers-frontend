import { useParams } from "react-router-dom"
import { ProductIndex } from "./ProductIndex"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { setFilterBy } from "../store/actions/product.actions"
import { productService } from "../services/product.service"

export function CategoryPage() {
  const [category, setCategory] = useState(null)

  const categories = useSelector(
    (storeState) => storeState.categoryModule.categories
  )

  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    loadCategory()
  }, [categories, params.name])

  async function loadCategory() {
    const categoryName = params.name
    if (categoryName && categories.length) {
      try {
        const category = categories?.find(
          (category) => category.name === categoryName
        )
        setCategory(category)
        dispatch(setFilterBy({ category: category.name }))
      } catch (error) {
        console.log("error:", error)
      }
    }
  }

  function getStyle() {
    return {
      backgroundImage: `url("${category.themeImgUrl}")`,
    }
  }

  return category ? (
    <section className="category-page main-layout">
      <div className="theme-header full" style={getStyle()}>
        <div className="cover"></div>
        <h2 className="title">{category.name}</h2>
      </div>
      <ProductIndex />
    </section>
  ) : (
    <div>Loading...</div>
  )
}
