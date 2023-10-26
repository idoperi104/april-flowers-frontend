import { memo } from "react"
import { ProductPreview } from "./ProductPreview"

function _ProductList({ products, onAddToCart }) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductPreview key={product._id} product={product} onAddToCart={onAddToCart} />
      ))}
    </ul>
  )
}

export const ProductList = memo(_ProductList)
