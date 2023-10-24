import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProducts } from "../store/actions/product.actions"
import { ProductList } from "../cmps/ProductList"

export function ProductIndex() {
  const products = useSelector(
    (storeState) => storeState.productModule.products
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadProducts())

    return () => {}
  }, [])

  if (!products) return <div>Loading...</div>
  return (
    <section className="product-index">

      <ProductList products={products} />

    </section>
  )
}
