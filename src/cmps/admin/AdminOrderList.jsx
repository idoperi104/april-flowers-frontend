import { memo } from "react"
import { AdminOrderPreview } from "./AdminOrderPreview"

function _AdminOrderList({ orders, onRemoveOrder, onUpdateOrderKeyVal }) {
  return (
    <ul className="admin-order-list">
      {orders.map((order) => (
        <AdminOrderPreview
          key={order._id}
          order={order}
          onRemoveOrder={onRemoveOrder}
          onUpdateOrderKeyVal={onUpdateOrderKeyVal}
        />
      ))}
    </ul>
  )
}

export const AdminOrderList = memo(_AdminOrderList)
