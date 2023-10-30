import { memo } from "react"
import { ProductPreview } from "./ProductPreview"

function _ProductList({ products, onAddToCart, size="" }) {
  return (
    <ul className={`product-list ${size}`}>
      {products.map((product) => (
        <ProductPreview key={product._id} product={product} onAddToCart={onAddToCart} size={size} />
      ))}
    </ul>
  )
}

export const ProductList = memo(_ProductList)
