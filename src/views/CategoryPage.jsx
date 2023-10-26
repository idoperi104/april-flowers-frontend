import { useParams } from "react-router-dom"
import { ProductIndex } from "./ProductIndex"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { categoryService } from "../services/category.service.local"
import { setFilterBy } from "../store/actions/product.actions"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"
import { productService } from "../services/product.service.local"

export function CategoryPage() {
  const [category, setCategory] = useState(null)

  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    loadCategory()

    return () => {
      dispatch(setFilterBy(productService.getEmptyFilterBy()))
    }
  }, [])

  useEffectUpdate(() => {
    dispatch(setFilterBy({ category: category.name }))
  }, [category])

  async function loadCategory() {
    const categoryId = params.id
    if (categoryId) {
      try {
        const category = await categoryService.getById(categoryId)
        setCategory(category)
      } catch (error) {
        console.log("error:", error)
      }
    }
  }

  return category ? (
    <section className="category-page main-layout">
      <h2 className="title">{category.name}</h2>
      <ProductIndex />
    </section>
  ) : (
    <div>Loading...</div>
  )
}
