import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProducts } from "../store/actions/product.actions"
import { ProductList } from "../cmps/ProductList"
import {
  addCartItem,
  toggleIsOpen,
} from "../store/actions/cart.actions"
import {useEffectUpdate} from "../customHooks/useEffectUpdate"

export function 
ProductIndex() {
  const products = useSelector(
    (storeState) => storeState.productModule.products
  )

  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadProducts())
  }, [])

  useEffectUpdate(() => {
    setIsLoading(false)
  }, [products])
  

  function onAddToCart(ev, product) {
    ev.stopPropagation()
    dispatch(addCartItem(product))
    dispatch(toggleIsOpen())
  }

  if (!products || isLoading) return <div>Loading...</div>
  
  return (
    <section className="product-index">
      <ProductList products={products} onAddToCart={onAddToCart} />
    </section>
  )
}
