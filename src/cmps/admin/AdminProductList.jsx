import { memo } from "react"
import { AdminProductPreview } from "./AdminProductPreview"

function _AdminProductList({ products, onRemoveProduct }) {
  return (
    <ul className="admin-product-list">
      {products.map((product) => (
        <AdminProductPreview
          key={product._id}
          product={product}
          onRemoveProduct={onRemoveProduct}
        />
      ))}
    </ul>
  )
}

export const AdminProductList = memo(_AdminProductList)
