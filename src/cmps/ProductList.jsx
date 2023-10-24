import { memo } from "react"
import { ProductPreview } from "./ProductPreview"

function _ProductList({ products }) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductPreview key={product._id} product={product} />
      ))}
    </ul>
  )
}

export const ProductList = memo(_ProductList)
