import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  loadOrders,
  removeOrder,
  updateOrderKeyVal,
} from "../../store/actions/order.actions"
import { AdminOrderList } from "../../cmps/admin/AdminOrderList"

export function AdminOrderIndex() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)

  const dispatch = useDispatch()

  const onRemoveOrder = useCallback(async (orderId) => {
    try {
      dispatch(removeOrder(orderId))
    } catch (error) {
      console.log("error: ", error)
    }
  }, [])

  async function onUpdateOrderKeyVal(order, key, val) {
    try {
      dispatch(updateOrderKeyVal(order, key, val))
    } catch (error) {
      console.log("error:", error)
    }
  }

  useEffect(() => {
    dispatch(loadOrders())
    return () => {}
  }, [])

  if (!orders) return <div>Loading...</div>
  return (
    <section className="admin-order-index">
      <div className="admin-order-table">
        <div className="table-header">
          <h3 className="item">פרטי ההזמנה</h3>
          <h3 className="item">פרטי המקבל</h3>
          <h3 className="item">פרטי המזמין</h3>
          <h3 className="item">שולם?</h3>
          <h3 className="item">נשלח?</h3>
          <h3 className="item">מידע נוסף</h3>
        </div>

        <AdminOrderList
          orders={orders}
          onUpdateOrderKeyVal={onUpdateOrderKeyVal}
          onRemoveOrder={onRemoveOrder}
        />
      </div>
    </section>
  )
}
