import { useEffect } from "react"
import { ProductIndex } from "../views/ProductIndex"
import { useDispatch } from "react-redux"
import { productService } from "../services/product.service.local"
import { setFilterBy } from "../store/actions/product.actions"

export function BestSellers() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFilterBy({ sort: "salesAmount", amount: 8 }))
    return () => {
      dispatch(setFilterBy(productService.getEmptyFilterBy()))
    }
  }, [])

  return (
    <section className="best-sellers">
      <h2 className="title">הנמכרים ביותר</h2>
      <ProductIndex />
    </section>
  )
}
