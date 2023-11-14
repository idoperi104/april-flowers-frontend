import { ProductIndex } from "../views/ProductIndex"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { productService } from "../services/product.service"
import { setFilterBy } from "../store/actions/product.actions"

export function ProductIndexWrapper({title = "", filterBy = {}, size=""}) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFilterBy({...productService.getEmptyFilterBy(), ...filterBy}))
    return () => {
      dispatch(setFilterBy(productService.getEmptyFilterBy()))
    }
  }, [])

  return (
    <section className="product-index-wrapper">
      <h2 className="title">{title}</h2>
      <ProductIndex className={size} />
    </section>
  )
}
