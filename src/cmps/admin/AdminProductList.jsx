import { memo } from "react"
import { AdminProductPreview } from "./AdminProductPreview"

function _AdminProductList({ products, onRemoveProduct, onUpdateProductKeyVal }) {
  return (
    <ul className="admin-product-list">
      {products.map((product) => (
        <AdminProductPreview
          key={product._id}
          product={product}
          onRemoveProduct={onRemoveProduct}
          onUpdateProductKeyVal={onUpdateProductKeyVal}
        />
      ))}
    </ul>
  )
}

export const AdminProductList = memo(_AdminProductList)
