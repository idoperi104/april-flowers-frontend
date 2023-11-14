import { useDispatch, useSelector } from "react-redux"
import {
  loadProducts,
  removeProduct,
  updateProductKeyVal,
} from "../../store/actions/product.actions"
import { useCallback, useEffect } from "react"
import { AdminProductList } from "../../cmps/admin/AdminProductList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { productService } from "../../services/product.service"
import { setFilterBy } from "../../store/actions/product.actions"
import { AdminProductFilter } from "../../cmps/admin/AdminProductFilter"
import { loadCategories } from "../../store/actions/category.actions"
import { utilService } from "../../services/util.service"

export function AdminProductIndex() {
  const products = useSelector(
    (storeState) => storeState.productModule.products
  )
  const filterBy = useSelector(
    (storeState) => storeState.productModule.filterBy
  )

  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(loadProducts())
    dispatch(
      setFilterBy({
        ...productService.getEmptyFilterBy(),
        category: "זרי פרחים",
      })
    )
    dispatch(loadCategories())

    return () => {}
  }, [])

  const onRemoveProduct = useCallback(async (productId) => {
    try {
      dispatch(removeProduct(productId))
    } catch (error) {
      console.log("error: ", error)
    }
  }, [])

  async function onUpdateProductKeyVal(product, key, val) {
    try {
      dispatch(updateProductKeyVal(product, key, val))
    } catch (error) {
      console.log("error:", error)
    }
  }

  const onChangeFilter = utilService.debounce((newFilterBy) => {
    if (JSON.stringify(newFilterBy) === JSON.stringify(filterBy)) return
    dispatch(setFilterBy(newFilterBy))
    dispatch(loadProducts())
  })

  if (!products) return <div>Loading...</div>
  return (
    <section className="admin-product-index">
      <Link className="link-add" to="edit">
        <button className="btn-add">
          <div className="icon">
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <span>הוספת מוצר חדש</span>
        </button>
      </Link>

      <AdminProductFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />

      <div className="admin-product-table">
        <div className="table-header">
          <FontAwesomeIcon className="item" icon={faImage} />
          <h3 className="item">שם המוצר</h3>
          <h3 className="item">מלאי</h3>
          <h3 className="item">מחיר</h3>
          <h3 className="item">קטגוריה</h3>
          <h3 className="item">פעולות</h3>
        </div>

        <AdminProductList
          products={products}
          onUpdateProductKeyVal={onUpdateProductKeyVal}
          onRemoveProduct={onRemoveProduct}
        />
      </div>
    </section>
  )
}
