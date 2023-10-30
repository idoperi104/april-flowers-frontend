import { useEffect, useState } from "react"
import { productService } from "../services/product.service.local"
import { ProductList } from "./ProductList"
import { useDispatch } from "react-redux"
import { addCartItem, toggleIsOpen } from "../store/actions/cart.actions"

export function ProductIndexFromService({
  title = "",
  filterBy = {},
  size = "",
}) {
  const [products, setProducts] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    filterBy = { ...productService.getEmptyFilterBy, ...filterBy }
    const data = await productService.query(filterBy)
    setProducts(data)
  }

  function onAddToCart(ev, product) {
    ev.stopPropagation()
    dispatch(addCartItem(product))
    dispatch(toggleIsOpen())
  }

  if (!products) return <div>Loading...</div>
  return (
    <section className="product-index-from-service">
      <h2 className="title">{title}</h2>
      <ProductList
        size={size}
        products={products}
        onAddToCart={onAddToCart}
      />
    </section>
  )
}
