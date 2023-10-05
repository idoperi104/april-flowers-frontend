import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProducts } from "../store/actions/product.actions"

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
      <h1>product Index</h1>
      <pre>{JSON.stringify(products, null,2)}</pre>
    </section>
  )
}
