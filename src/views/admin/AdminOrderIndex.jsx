import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  loadOrders,
  removeOrder,
  setOrderFilterBy,
  updateOrderKeyVal,
} from "../../store/actions/order.actions"
import { AdminOrderList } from "../../cmps/admin/AdminOrderList"
import { AdminOrderFilter } from "../../cmps/admin/AdminOrderFilter"
import { utilService } from "../../services/util.service"
import {
  SOCKET_EMIT_SET_TOPIC,
  SOCKET_EVENT_ADD_ORDER,
  socketService,
} from "../../services/socket.service"

export function AdminOrderIndex() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const filterBy = useSelector(
    (storeState) => storeState.orderModule.orderFilterBy
  )

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
    socketService.emit(SOCKET_EMIT_SET_TOPIC, "admin-orders")
    socketService.on(SOCKET_EVENT_ADD_ORDER, onAddOrder)

    return () => {
      socketService.off(SOCKET_EVENT_ADD_ORDER)
    }
  }, [])

  function onAddOrder() {
    dispatch(loadOrders())
  }

  const onChangeFilter = utilService.debounce((filterBy) => {
    dispatch(setOrderFilterBy(filterBy))
    dispatch(loadOrders())
  })

  if (!orders) return <div>Loading...</div>
  return (
    <section className="admin-order-index">
      <AdminOrderFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />

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
